import {dirname} from "path"
import {fileURLToPath} from "url"
import fs from "fs"
import http, { IncomingMessage, OutgoingMessage } from "http"
import https from "https"
import * as rollup from 'rollup'

import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import path from 'path'

export function dateStringify(date) {
    if (!(date instanceof Date)) date = new Date(date)
    return date.toISOString().split('.')[0] + '+0000'
}

export const root = dirname(dirname(fileURLToPath(import.meta.url)))

export const production = !process.env.DEBUG;

function optionFile(source) {
	const dir = path.dirname(path.dirname(source))
	const ext = path.extname(source)
	const base = path.basename(source)
	const name = base.substring(0, base.length - ext.length)
	return {
		input: source,
		css: path.normalize(dir + '/' + name + '.css'),
		output: path.normalize(dir + '/' + name + '.js'),
	}
}

function optionRoll(file) {
	return {
		input: {
			input: root + '/' + file.input,
			plugins: [
				svelte({
					compilerOptions: {
						// enable run-time checks when not in production
						dev: !production
					}
				}),
				// we'll extract any component CSS out into
				// a separate file - better for performance
				css({ output: path.basename(file.css) }),
		
				// If you have external dependencies installed from
				// npm, you'll most likely need these plugins. In
				// some cases you'll need additional configuration -
				// consult the documentation for details:
				// https://github.com/rollup/plugins/tree/master/packages/commonjs
				resolve({
					browser: true,
					dedupe: ['svelte']
				}),
				commonjs(),
				// If we're building for production (npm run build
				// instead of npm run dev), minify
				production && terser()
			],
			watch: {
				clearScreen: false,
                skipWrite: true,
			}
		},
		output: {
			output: {
				sourcemap: true,
				format: 'iife',
				name: 'app',
				file: root + '/' + file.output,
			},
			plugins: [
				// If we're building for production (npm run build
				// instead of npm run dev), minify
				production && terser()
			],
		}
	}
}

export const memory = new Map()

function outputBuild(file, output) {
    for(const o of output.output) {
        console.log(new Date(), "INFO", file.input, "=>", o.isEntry ? file.output : file.css)
        if (!production) memory.set(o.isEntry ? '/' + file.output : '/' + file.css, {mtime: new Date(), data: o.code || o.source})
    }
}

export async function build(files) {
	files.forEach(async (file) => {
		file = optionFile(file)
		const option = optionRoll(file)
        if (production) {
            const bundle = await rollup.rollup(option.input)
            const output = await bundle.write(option.output)
            outputBuild(file, output)
        }
        else {
            option.input.output = option.output.output
            rollup.watch(option.input).on('event', async (event) => {
                if (event.code === 'BUNDLE_END') {
                    if (!event.result) return
                    const output = await event.result.generate(option.output)
                    outputBuild(file, output)
                    event.result.close()
                }
                else if (event.code == 'ERROR') {
                    console.error(event.error)
                }
            })
			
		} 
	})
}


function modifiedSince(req) {
    const raw = req.headers["if-modified-since"]
    return raw ? new Date(raw) : null
}
/**
 * 提供静态文件访问（调试模式从内存加载 rollup 资源）
 * @param {IncomingMessage} req 
 * @param {OutgoingMessage} rsp 
 * @param {string} path 
 * @param {number} maxAge 
 * @returns 
 */
export function serveFile(req, rsp, path, maxAge) {
    const since = modifiedSince(req)
    if (!production && memory.has(path)) {
        const file = memory.get(path)
        if (!since || parseInt(file.mtime.getTime()/1000) > parseInt(since.getTime()/1000)) {
            rsp.setHeader('Cache-Control', 'max-age=' + (maxAge || 3) + ', must-revalidate')
            rsp.setHeader('Last-Modified', file.mtime.toUTCString())
            rsp.end(file.data)
            return
        }
        rsp.statusCode = 304
        rsp.end()
        return
    }
    fs.stat(root + path, (error, stat) => {
        if (error) {
            rsp.statusCode = 404
            rsp.end()
            return
        }
        if (stat.isDirectory()) {
            serveFile(req, rsp, path + "/main.html", maxAge)
            return
        }
        if (!since || parseInt(stat.mtime.getTime()/1000) > parseInt(since.getTime()/1000)) {
            rsp.setHeader('Cache-Control', 'max-age=' + (maxAge || 3) + ', must-revalidate')
            rsp.setHeader('Last-Modified', stat.mtime.toUTCString())
            fs.createReadStream(root + path).pipe(rsp)
            return
        }
        rsp.statusCode = 304
        rsp.end()
    })
}
/**
 * 向其他后端转接请求
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} rsp 
 * @param {URL} url 
 * @param {Object} headers 
 */
export function serveExec(req, rsp, url, headers) {
    const creq = url.protocol == 'http:' ? http.request(url) : https.request(url)
    creq.method = req.method
    if (req.headers['content-type']) headers["Content-Type"] = req.headers['content-type']
    if (req.headers['content-length']) headers["Content-Length"] = req.headers['content-length']
    if (headers) for (let field in headers) creq.setHeader(field, headers[field])
    rsp.on('close', () => {
        if (rsp.writableFinished) return
        console.error(new Date(), 'WARN', req.method, req.url, '/', 499, 'abort')
        creq.destroy()
        rsp.end()
    })
    req.pipe(creq)
    creq.on('finish', () => {
        // console.log(creq)
    }).on('error', (error) => {
        rsp.write('{"error":"' + error + '"}')
    }).on('response', (crsp) => {
        rsp.statusCode = crsp.statusCode
        rsp.statusMessage = crsp.statusMessage
        if (crsp.headers['content-type']) rsp.setHeader('Content-Type', crsp.headers['content-type'])
        crsp.pipe(rsp).on('finish', () => {
            console.log(new Date(), 'INFO', req.method, req.url, '/', crsp.statusCode, crsp.statusMessage)
        })
    })
}
