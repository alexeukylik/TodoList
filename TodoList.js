class TodoList {
    constructor(service, visual) {
        // debugger;
        this._tasks = []; //new Task('number1'), new Task('number2')
        this._el = null; // wrap aplication
        this.btn = null; // button for enter task
        this.input = null; // input for enter task
        this.tasksBlock = null;
        this.divWrap = null;
        this.count = 0; // counter tasks
        this.items_left = null;
        this.filterMode = null;
        this.loder = null;
        this.widgetId = 333;
        this.flag = false;
        this.service = service;  //create DALL
        this.visual = visual; //visual effect

        // сallback on get responce
        this.service.pushAddServerCallback = this._startTaskAddServer.bind(this);
        this.service.get(this.widgetId);

    };

    // task on server callback get responce
    _startTaskAddServer(taskOutServer) {
        taskOutServer.map((item) => {
            const task = new Task(item.title, item.id, item.done);
            // callback on delete task
            task._onTaskDeletedchild = this._onTaskDeleted.bind(this);
            // calback on isDone task
            task._items_left = this._items_left.bind(this);
            // calback on updata task put
            task._startPut = this._startTaskPutServer.bind(this);
            return this._tasks.push(task);
        })

        this._renderTasks();
    }

    _startTaskPutServer(task) {
        this.service.put(this.widgetId, task.id, task.name, task.isDone)
            .then();
    }

    render() {
        this._renderHead();
        this._items_left();
    };

    _addTask(event) {
        //stoped update
        event.preventDefault();
        // debugger;
        // visual effect
        this.flag = true;
        this.visual.startVisual(this.tasksBlock, this.btn, this.loder, this.input, this.flag);

        let inp = this.input.value;
        if (inp !== "") {
            // debugger;
            this.service.post(this.widgetId, inp) // post on server
                .then((data) => {
                    
                    // visual effect
                    this.visual.startVisual(this.tasksBlock, this.btn, this.loder, this.input)
                    
                    this.input.value = null
                    const task = new Task(data.task.title, data.task.id, data.task.isDone);
                    // calback on delete task
                    task._onTaskDeletedchild = this._onTaskDeleted.bind(this);
                    // calback on isDone task
                    task._items_left = this._items_left.bind(this);
                    // calback on updata task put
                    task._startPut = this._startTaskPutServer.bind(this);
                    this._tasks.push(task);
                    this._renderTasks();
                });

        }
    };

    _onTaskDeleted(task) {
        // delete server
        // debugger;
       
        this.service.delete(this.widgetId, task.id)
            .then(() => {

                let deleted = this._tasks.filter((item) => {
                    return item != task;
                });
                this._tasks = deleted;

                this._renderTasks();
            });
        // debugger;

    };

    _renderHead() {
        // this.divWrap ==null
        if (!this.divWrap) {
            this.divWrap = document.createElement("div");
            this.divWrap.setAttribute("data-wrap", "wrap1");
            this.divWrap.classList.add("wrap");
            document.body.appendChild(this.divWrap);
        }
        this._el = document.querySelector('[data-wrap="wrap1"]');
        this._el.innerHTML = `
        <p>What to buy</p>
        <div class="head" id="head">
            <form>
            <input type="text" placeholder="wright net task" class="input" id="input"/>
            <button id="btn" class="btn">+</button>
            
            <div class="windows8">
                <div class="wBall" id="wBall_1">
                    <div class="wInnerBall"></div>
                </div>
                <div class="wBall" id="wBall_2">
                    <div class="wInnerBall"></div>
                </div>
                <div class="wBall" id="wBall_3">
                    <div class="wInnerBall"></div>
                </div>
                <div class="wBall" id="wBall_4">
                    <div class="wInnerBall"></div>
                </div>
                <div class="wBall" id="wBall_5">
                    <div class="wInnerBall"></div>
                </div>
            </div>

            </form>
        </div>
        <div data-role="tasks" class="main" id="main">
        </div>
        <div class="menu-bottom">
            <span class="items-left">${this.count} Items-left</span>
            <button class="all">All</button>
            <button class="active">Active</button>
            <button class="compled">Compled</button>
        </div>`;
        this.tasksBlock = this._el.querySelector('[data-role="tasks"]');
        this.btn = document.querySelector('#btn');
        this.input = document.querySelector('#input');
        this.btn.addEventListener('click', this._addTask.bind(this)); // add Tasks
        this.items_left = document.querySelector('.items-left');
        this.btn.addEventListener('click', this._items_left.bind(this)); // add Tasks
        this.all = document.querySelector('.all');
        this.all.addEventListener('click', this._allTasks.bind(this));
        this.active = document.querySelector('.active');
        this.active.addEventListener('click', this._activeTasks.bind(this));
        this.completed = document.querySelector('.compled');
        this.completed.addEventListener('click', this._completedTasks.bind(this));
        this.loder = this._el.querySelector('.windows8');
    };

    _renderTasks() {
        // debugger;
        this.count = 0;

        let tasksForRender = this._tasks;

        if (this.filterMode == 'active') {
            tasksForRender = tasksForRender.filter((item, i, arr) => {
                return !item.isDone;
            })
        } else if (this.filterMode == 'completed') {
            tasksForRender = tasksForRender.filter((item) => {
                return item.isDone;
            })
        };

        this.tasksBlock.innerHTML = ""; // очистим от старого

        for (let i = 0; i < tasksForRender.length; i++) {
            let item = tasksForRender[i];
            this.tasksBlock.append(item.render()); // render tasks
            // todo: move to task createion place


            // 
            if (!item.isDone) {
                this.count++;
            };

        };
        this.items_left.innerHTML = `${this.count} Items-left`;
        this.count = 0;
        var serialItems = JSON.stringify(this._tasks);
        localStorage.setItem("key", serialItems);
    };

    // isDone tasks
    _items_left() {
        this._renderTasks();
    };

    _allTasks() {
        // debugger;
        this.filterMode = 'all';
        this._renderTasks();
    };

    _activeTasks() {
        this.filterMode = 'active';
        this._renderTasks();
    };

    _completedTasks() {
        this.filterMode = 'completed';
        this._renderTasks();
    };
}