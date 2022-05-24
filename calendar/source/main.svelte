<script>
    const weekdays = [
        "一", "二", "三", "四", "五", "六", "日",
    ]
    const activity = [
        {"name": "轮滑", "type": "bg-success"}, 
        {"name": "锻炼", "type": "bg-danger"},
        {"name": "围棋", "type": "bg-info"},
        {"name": "阅读", "type": "bg-info"},
        {"name": "篮球", "type": "bg-success"},
        {"name": "家务", "type": "bg-secondary"},
        {"name": "写字", "type": "bg-warning"},
        {"name": "英语", "type": "bg-warning"},
        {"name": "绘画", "type": "bg-success"},
        {"name": "刷牙", "type": "bg-secondary"},
        {"name": "穿衣", "type": "bg-secondary"},
        {"name": "古诗", "type": "bg-info"},
        {"name": "乐高", "type": "bg-success"},
        {"name": "数学", "type": "bg-warning"},
        {"name": "跳绳", "type": "bg-danger"},
    ]
    let calendar = []
    let current = new Date()
    current = new Date(parseInt(localStorage.getItem("calendar:current")) || Date.now())

    const today = new Date(),
        start = new Date(current.getFullYear(), current.getMonth(), 1),
        close = new Date(current.getFullYear(), current.getMonth() + 1, 0)
    today.setHours(0, 0, 0, 0)

    const prefix = (start.getDay() + 6) % 7

    const begin = new Date(start.getTime() - prefix * 86400000),
        end = new Date(begin.getTime() + 35 * 86400000 > close.getTime() ?
            begin.getTime() + 35 * 86400000 : begin.getTime() + 42 * 86400000)
    
    try {
        calendar = JSON.parse(localStorage.getItem("calendar:" + start.getFullYear() + (start.getMonth()+1).toString().padStart(2, '0')))
    } catch(e) {
        calendar = []
    }
    if (!calendar) calendar = []

    $: {
        localStorage.setItem("calendar:" + start.getFullYear() + (start.getMonth()+1).toString().padStart(2, '0'), JSON.stringify(calendar))
    }
    $: {
        localStorage.setItem("calendar:current", current.toString())
    }

    let i = 0;
    for (let date=new Date(begin.getTime());date.getTime() < end.getTime(); date = new Date(date.getTime() + 86400000)) {
        if (calendar[i]) calendar[i].date = date
        else calendar[i] = {
            date: date,
            task: [],
        }
        ++i
    }

    let calendarTask = 0
    $: {
        calendarTask = 0
        for (let item of calendar) calendarTask += item.task.length
    }

    


    function handleTaskAppend(index, e) {
        calendar[index].task.push(activity[e.target.value])
        console.log(e.target.value = calendar[index].date.getDate())
        calendar[index].task = calendar[index].task
    }

    function handleTaskRemove(index, taskIndex) {
        calendar[index].task.splice(taskIndex, 1)
        calendar[index].task = calendar[index].task
    }

    function handleMonthChange(delta) {
        current = current.setMonth(current.getMonth()+delta)
        setTimeout(()=> {
            location.reload()
        },200)
    }
</script>

<style>
    .calendar {
        display: flex;
        flex-wrap: wrap;
    }
    .calendar .weekday {
        padding: 0.5rem 1.0rem;
        background: #fafafa;
        width: 14.28571428%;
        height: 2.6rem;
    }
    .calendar .day {
        background: #fbfbfb;
        width: 14.28571428%;
        height: 12rem;
        border-top: 1px solid #bbb;
        border-left: 1px solid #bbb;
        padding: 0.2rem 0.4rem;
    }
    .calendar .day.prev {
        color: #ccc;
        background: #efefef;
    }
    .calendar .day.right {
        border-right: 1px solid #bbb;
    }
    .calendar .day.next {
        color: #ccc;
        background: #efefef;
    }
    .calendar .day.bottom {
        border-bottom: 1px solid #bbb;
    }
    .calendar .day.curr {
        background-color: #fcecfc;
    }
</style>


<section>
    <nav class="navbar navbar-expand-lg navbar-dark bg-secondary bg-gradient text-white">
        <div class="container-fluid">
                <a class="nav-link active" aria-current="page" href="#" on:click={handleMonthChange.bind(this, -1)}>👈</a>
                <div>
                    <span class="navbar-text text-white">{start.getFullYear()}年{start.getMonth() + 1}月</span>
                    <span class="badge rounded-pill bg-dark">
                        共计: {calendarTask} 项
                    </span>
                </div>

                <a class="nav-link active" aria-current="page" href="#" on:click={handleMonthChange.bind(this, +1)}>👉</a>
        </div>
    </nav>
    <div class="container-fluid">
        <div class="calendar mt-2 pb-2">
            {#each weekdays as item}
            <div class="weekday text-center">{item}</div>
            {/each}
            {#each calendar as item, index}
            <div class="day"
                class:top={index < 7} class:left={index % 7 == 0} class:right={index % 7 == 6} class:bottom={index >= calendar.length - 7}
                class:curr={item.date.getTime() == today.getTime()} class:prev={item.date.getTime() < start.getTime()} class:next={item.date.getTime() > close.getTime()}>
                <div class="form-floating">
                    <select class="form-select" on:change={handleTaskAppend.bind(this, index)}>
                        <option selected>{item.date.getDate()}</option>
                        {#each activity as task, index}
                        <option value={index}>{task.name}</option>
                        {/each}
                    </select>
                    <label for="floatingSelectGrid">日期</label>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill" class:bg-success={item.task.length >= 3} class:bg-secondary={item.task.length < 3}>
                        {item.task.length}
                        <span class="visually-hidden">已完成任务</span>
                    </span>
                </div>
                <div class="tasks">
                    {#each item.task as task, taskIndex}
                    <span class="badge p-2 mt-2 me-2 {task.type}" on:dblclick={handleTaskRemove.bind(this, index, taskIndex)}>
                        {task.name}
                    </span>
                    {/each}
                </div>
            </div>
            {/each}
        </div>
    </div>
</section>