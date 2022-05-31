var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function a(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e){t.appendChild(e)}function c(t,e,n){t.insertBefore(e,n||null)}function s(t){t.parentNode.removeChild(t)}function i(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function g(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function d(){return u(" ")}function f(t,e,n,a){return t.addEventListener(e,n,a),()=>t.removeEventListener(e,n,a)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function h(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function p(t,e,n){t.classList[n?"add":"remove"](e)}let b;function y(t){b=t}const $=[],v=[],x=[],_=[],k=Promise.resolve();let T=!1;function w(t){x.push(t)}const D=new Set;let S=0;function E(){const t=b;do{for(;S<$.length;){const t=$[S];S++,y(t),M(t.$$)}for(y(null),$.length=0,S=0;v.length;)v.pop()();for(let t=0;t<x.length;t+=1){const e=x[t];D.has(e)||(D.add(e),e())}x.length=0}while($.length);for(;_.length;)_.pop()();T=!1,D.clear(),y(t)}function M(t){if(null!==t.fragment){t.update(),a(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(w)}}const C=new Set;function F(t,e){-1===t.$$.dirty[0]&&($.push(t),T||(T=!0,k.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(r,l,c,i,g,u,d,f=[-1]){const m=b;y(r);const h=r.$$={fragment:null,ctx:null,props:u,update:t,not_equal:g,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(m?m.$$.context:[])),callbacks:n(),dirty:f,skip_bound:!1,root:l.target||m.$$.root};d&&d(h.root);let p=!1;if(h.ctx=c?c(r,l.props||{},((t,e,...n)=>{const a=n.length?n[0]:e;return h.ctx&&g(h.ctx[t],h.ctx[t]=a)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](a),p&&F(r,t)),e})):[],h.update(),p=!0,a(h.before_update),h.fragment=!!i&&i(h.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);h.fragment&&h.fragment.l(t),t.forEach(s)}else h.fragment&&h.fragment.c();l.intro&&($=r.$$.fragment)&&$.i&&(C.delete($),$.i(undefined)),function(t,n,r,l){const{fragment:c,on_mount:s,on_destroy:i,after_update:g}=t.$$;c&&c.m(n,r),l||w((()=>{const n=s.map(e).filter(o);i?i.push(...n):a(n),t.$$.on_mount=[]})),g.forEach(w)}(r,l.target,l.anchor,l.customElement),E()}var $;y(m)}function N(t,e,n){const a=t.slice();return a[15]=e[n],a[17]=n,a}function O(t,e,n){const a=t.slice();return a[18]=e[n],a[20]=n,a}function Y(t,e,n){const a=t.slice();return a[18]=e[n],a[17]=n,a}function A(t,e,n){const a=t.slice();return a[15]=e[n],a}function j(e){let n,a,o=e[15]+"";return{c(){n=g("div"),a=u(o),m(n,"class","weekday text-center svelte-r04xxy")},m(t,e){c(t,n,e),l(n,a)},p:t,d(t){t&&s(n)}}}function L(e){let n,a,o,r=e[18].name+"";return{c(){n=g("option"),a=u(r),n.__value=o=e[17],n.value=n.__value},m(t,e){c(t,n,e),l(n,a)},p:t,d(t){t&&s(n)}}}function J(t){let e,n,a,o,r,i,p=t[18].name+"";return{c(){e=g("span"),n=u(p),a=d(),m(e,"class",o="badge p-2 mt-2 me-2 "+t[18].type+" svelte-r04xxy")},m(o,s){c(o,e,s),l(e,n),l(e,a),r||(i=f(e,"dblclick",t[8].bind(this,t[17],t[20])),r=!0)},p(a,r){t=a,1&r&&p!==(p=t[18].name+"")&&h(n,p),1&r&&o!==(o="badge p-2 mt-2 me-2 "+t[18].type+" svelte-r04xxy")&&m(e,"class",o)},d(t){t&&s(e),r=!1,i()}}}function q(t){let e,n,a,o,r,b,y,$,v,x,_,k,T,w,D,S,E,M,C=t[15].date.getDate()+"",F=t[15].task.length+"",I=t[3],N=[];for(let e=0;e<I.length;e+=1)N[e]=L(Y(t,I,e));let A=t[15].task,j=[];for(let e=0;e<A.length;e+=1)j[e]=J(O(t,A,e));return{c(){e=g("div"),n=g("div"),a=g("select"),o=g("option"),r=u(C);for(let t=0;t<N.length;t+=1)N[t].c();y=d(),$=g("label"),$.textContent="日期",v=d(),x=g("span"),_=u(F),k=d(),T=g("span"),T.textContent="已完成任务",w=d(),D=g("div");for(let t=0;t<j.length;t+=1)j[t].c();S=d(),o.selected=!0,o.__value=b=t[15].date.getDate(),o.value=o.__value,m(a,"class","form-select"),m($,"for","floatingSelectGrid"),m(T,"class","visually-hidden"),m(x,"class","position-absolute top-0 start-100 translate-middle badge rounded-pill"),p(x,"bg-success",t[15].task.length>=3),p(x,"bg-secondary",t[15].task.length<3),m(n,"class","form-floating"),m(D,"class","tasks"),m(e,"class","day svelte-r04xxy"),p(e,"top",t[17]<7),p(e,"left",t[17]%7==0),p(e,"right",t[17]%7==6),p(e,"bottom",t[17]>=t[0].length-7),p(e,"curr",t[15].date.getTime()==t[4].getTime()),p(e,"prev",t[15].date.getTime()<t[5].getTime()),p(e,"next",t[15].date.getTime()>t[6].getTime())},m(s,i){c(s,e,i),l(e,n),l(n,a),l(a,o),l(o,r);for(let t=0;t<N.length;t+=1)N[t].m(a,null);l(n,y),l(n,$),l(n,v),l(n,x),l(x,_),l(x,k),l(x,T),l(e,w),l(e,D);for(let t=0;t<j.length;t+=1)j[t].m(D,null);l(e,S),E||(M=f(a,"change",t[7].bind(this,t[17])),E=!0)},p(n,l){if(t=n,1&l&&C!==(C=t[15].date.getDate()+"")&&h(r,C),1&l&&b!==(b=t[15].date.getDate())&&(o.__value=b,o.value=o.__value),8&l){let e;for(I=t[3],e=0;e<I.length;e+=1){const n=Y(t,I,e);N[e]?N[e].p(n,l):(N[e]=L(n),N[e].c(),N[e].m(a,null))}for(;e<N.length;e+=1)N[e].d(1);N.length=I.length}if(1&l&&F!==(F=t[15].task.length+"")&&h(_,F),1&l&&p(x,"bg-success",t[15].task.length>=3),1&l&&p(x,"bg-secondary",t[15].task.length<3),257&l){let e;for(A=t[15].task,e=0;e<A.length;e+=1){const n=O(t,A,e);j[e]?j[e].p(n,l):(j[e]=J(n),j[e].c(),j[e].m(D,null))}for(;e<j.length;e+=1)j[e].d(1);j.length=A.length}1&l&&p(e,"bottom",t[17]>=t[0].length-7),17&l&&p(e,"curr",t[15].date.getTime()==t[4].getTime()),33&l&&p(e,"prev",t[15].date.getTime()<t[5].getTime()),65&l&&p(e,"next",t[15].date.getTime()>t[6].getTime())},d(t){t&&s(e),i(N,t),i(j,t),E=!1,M()}}}function B(e){let n,o,r,p,b,y,$,v,x,_,k,T,w,D,S,E,M,C,F,I,O=e[2],Y=[];for(let t=0;t<O.length;t+=1)Y[t]=j(A(e,O,t));let L=e[0],J=[];for(let t=0;t<L.length;t+=1)J[t]=q(N(e,L,t));return{c(){n=g("section"),o=g("nav"),r=g("div"),p=g("a"),p.textContent="👈",b=d(),y=g("div"),$=g("span"),$.textContent=`${e[5].getFullYear()}年${e[5].getMonth()+1}月`,v=d(),x=g("span"),_=u("共计: "),k=u(e[1]),T=u(" 项"),w=d(),D=g("a"),D.textContent="👉",S=d(),E=g("div"),M=g("div");for(let t=0;t<Y.length;t+=1)Y[t].c();C=d();for(let t=0;t<J.length;t+=1)J[t].c();m(p,"class","nav-link active"),m(p,"aria-current","page"),m(p,"href","#"),m($,"class","navbar-text text-white"),m(x,"class","badge rounded-pill bg-dark"),m(D,"class","nav-link active"),m(D,"aria-current","page"),m(D,"href","#"),m(r,"class","container-fluid"),m(o,"class","navbar navbar-expand-lg navbar-dark bg-secondary bg-gradient text-white"),m(M,"class","calendar mt-2 pb-2 svelte-r04xxy"),m(E,"class","container-fluid")},m(t,a){c(t,n,a),l(n,o),l(o,r),l(r,p),l(r,b),l(r,y),l(y,$),l(y,v),l(y,x),l(x,_),l(x,k),l(x,T),l(r,w),l(r,D),l(n,S),l(n,E),l(E,M);for(let t=0;t<Y.length;t+=1)Y[t].m(M,null);l(M,C);for(let t=0;t<J.length;t+=1)J[t].m(M,null);F||(I=[f(p,"click",e[9].bind(this,-1)),f(D,"click",e[9].bind(this,1))],F=!0)},p(t,[e]){if(2&e&&h(k,t[1]),4&e){let n;for(O=t[2],n=0;n<O.length;n+=1){const a=A(t,O,n);Y[n]?Y[n].p(a,e):(Y[n]=j(a),Y[n].c(),Y[n].m(M,C))}for(;n<Y.length;n+=1)Y[n].d(1);Y.length=O.length}if(505&e){let n;for(L=t[0],n=0;n<L.length;n+=1){const a=N(t,L,n);J[n]?J[n].p(a,e):(J[n]=q(a),J[n].c(),J[n].m(M,null))}for(;n<J.length;n+=1)J[n].d(1);J.length=L.length}},i:t,o:t,d(t){t&&s(n),i(Y,t),i(J,t),F=!1,a(I)}}}function G(t,e,n){const a=[{name:"轮滑",type:"bg-success"},{name:"锻炼",type:"bg-danger"},{name:"围棋",type:"bg-info"},{name:"阅读",type:"bg-info"},{name:"篮球",type:"bg-success"},{name:"家务",type:"bg-secondary"},{name:"写字",type:"bg-warning"},{name:"英语",type:"bg-warning"},{name:"绘画",type:"bg-success"},{name:"刷牙",type:"bg-secondary"},{name:"穿衣",type:"bg-secondary"},{name:"古诗",type:"bg-info"},{name:"乐高",type:"bg-success"},{name:"数学",type:"bg-warning"},{name:"跳绳",type:"bg-danger"}];let o=[],r=new Date;r=new Date(parseInt(localStorage.getItem("calendar:current"))||Date.now());const l=new Date,c=new Date(r.getFullYear(),r.getMonth(),1),s=new Date(r.getFullYear(),r.getMonth()+1,0);l.setHours(0,0,0,0);const i=(c.getDay()+6)%7,g=new Date(c.getTime()-864e5*i),u=new Date(g.getTime()+3024e6>s.getTime()?g.getTime()+3024e6:g.getTime()+36288e5);try{o=JSON.parse(localStorage.getItem("calendar:"+c.getFullYear()+(c.getMonth()+1).toString().padStart(2,"0")))}catch(t){o=[]}o||(o=[]);let d=0;for(let t=new Date(g.getTime());t.getTime()<u.getTime();t=new Date(t.getTime()+864e5))o[d]?o[d].date=t:o[d]={date:t,task:[]},++d;let f=0;return t.$$.update=()=>{if(1&t.$$.dirty&&localStorage.setItem("calendar:"+c.getFullYear()+(c.getMonth()+1).toString().padStart(2,"0"),JSON.stringify(o)),1024&t.$$.dirty&&localStorage.setItem("calendar:current",r.toString()),3&t.$$.dirty){n(1,f=0);for(let t of o)n(1,f+=t.task.length)}},[o,f,["一","二","三","四","五","六","日"],a,l,c,s,function(t,e){o[t].task.push(a[e.target.value]),console.log(e.target.value=o[t].date.getDate()),n(0,o)},function(t,e){o[t].task.splice(e,1),n(0,o)},function(t){n(10,r=r.setMonth(r.getMonth()+t)),setTimeout((()=>{location.reload()}),200)},r]}return new class extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(1),n.on_destroy=n.fragment=null,n.ctx=[])}(this),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),I(this,t,G,B,r,{})}}({target:document.body})}();
//# sourceMappingURL=main.js.map
