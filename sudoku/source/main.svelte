<script>
    let quiz = [
        2, 0, 6,  0, 9, 0,  0, 0, 0,
        0, 7, 9,  8, 0, 0,  0, 6, 0,
        0, 5, 0,  0, 2, 0,  0, 0, 0,
 
        6, 0, 0,  2, 0, 0,  5, 8, 0,
        3, 0, 0,  0, 0, 0,  0, 0, 9,
        0, 8, 5,  0, 0, 1,  0, 0, 2,
         
        0, 0, 0,  0, 1, 0,  0, 2, 0,
        0, 4, 0,  0, 0, 8,  1, 7, 0,
        0, 0, 0,  0, 7, 0,  8, 0, 5,
    ]
    // let quiz = [
    //     0, 0, 0,  8, 0, 0,  0, 0, 9,
    //     0, 1, 9,  0, 0, 5,  8, 3, 0,
    //     0, 4, 3,  0, 1, 0,  0, 0, 7,

    //     4, 0, 0,  1, 5, 0,  0, 0, 3,
    //     0, 0, 2,  7, 0, 4,  0, 1, 0,
    //     0, 8, 0,  0, 9, 0,  6, 0, 0,

    //     0, 7, 0,  0, 0, 6,  3, 0, 0,
    //     0, 3, 0,  0, 7, 0,  0, 8, 0,
    //     9, 0, 4,  5, 0, 0,  0, 0, 1,
    // ]
    let path = []
    for (let i=0; i<quiz.length; ++i) {
        path[i] = 0
    }
    const choice = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const width = 100.0 / 9

    function C(x, y) {
        return quiz[I(x,y)] || path[I(x,y)] || 0
    }
    function I(x, y) {
        return y*9+x
    } 
    function X(i) {
        return i%9
    }
    function Y(i) {
        return parseInt(i/9)
    }
    function existBlock(x, y) {
        let exist = []
        const nx = parseInt(x/3), ny = parseInt(y/3);
        for (let i=nx*3; i<nx*3+3; ++i) {
            for (let j=ny*3; j<ny*3+3; ++j) {
                if (i != x || j !=y) {
                    exist.push( C(i, j) )
                }
            }
        }
        for (let i=0;i<9;++i) {
            if (i != x) {
                exist.push( C(i, y) )
            }
            if (i != y) {
                exist.push( C(x, i) )
            }
        }
        return exist.filter((e, i, s) => s.indexOf(e) == i)
    }
    async function step1_verify(x, y) {
        await new Promise((resolve) => setTimeout(resolve, 1))
        if (quiz[I(x,y)]) return true;
        for (let active = 0; active < quiz.length; ++active) {
            const i = X(active), j = Y(active), v = C(i, j)
            if (quiz[active]) continue
            const e = existBlock(i, j)
            if (e.length == 10 // 所有都被占用？
                || v != 0 && e.indexOf(v) > -1 // 当前各自内的值未被占用
            ) return false
        }
        // active = null
        return true
    }
    let index = 0
    function step2_choose() {
        if (quiz[index]) path[index] = 0
        else if (path[index]) ++path[index]
        else path[index] = 1
    }
    let input = []
    window.solve = async function solve() {
        console.log(input)
        while (index < quiz.length) {
            await new Promise((resolve) => setTimeout(resolve, 3))
            step2_choose()
            if(path[index] < 10 && await step1_verify(X(index), Y(index))) {
                ++index
                
            } else if (path[index] > 9) {
                path[index] = 0
                --index
                while (quiz[index]) --index
            } else {
                // console.log("=")
            }
        }
    }
    async function change(e) {
        quiz[ input.indexOf(e.target) ] = parseInt(e.target.value)
    }
    // solve()
</script>

<style>
    .board {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .cell {
        display: block;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        height: 0;
    }
    .cell.thick-right {
        border-right: 1px solid #aaa;
    }
    .cell.thick-bottom {
        border-bottom: 1px solid #aaa;
    }
    .cell.index {
        background-color: #dcba98;
    }
    .cell .cord {
        font-size: 8px;
    }
    .cell input {
        display: block;
        border: none;
        width: 100%;
    }
</style>

<div class="container mt-2">
    <button class="btn btn-primary" on:click={solve}>计算</button>
    <section class="board mt-2" on:change={change}>
        {#each quiz as c, i}
            <div class="cell position-relative" style="width: {width}%; padding-bottom: {width}%"
                class:index={index == i} class:thick-right={i%9==2 || i%9==5} class:thick-bottom={parseInt(i/9)==2 || parseInt(i/9)==5}>
                {#if c}<div class="position-absolute start-50 top-50 translate-middle">{c}</div>
                {:else if path[i]}<div class="position-absolute start-50 top-50 translate-middle text-danger">{path[i]}</div>
                {:else}<div class="position-absolute start-50 top-50 translate-middle"></div>{/if}
                <div class="cord text-secondary">({X(i)},{Y(i)})</div>
            </div>
        {/each}
    </section>
</div>