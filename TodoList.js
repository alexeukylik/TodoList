class TodoList {
    constructor() {
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
        this.service = new Service();  //create DALL
        this.widgetId = 333;

        // сallback on get responce
        this.service.pushAddServerCallback = this._startTaskAddServer.bind(this);
        this.service.get(this.widgetId);

    };    

    // task on server
    _startTaskAddServer(taskOutServer) {
        // debugger;
        taskOutServer.map((item)=>{
            var task = new Task(item.title, item.id, item.done);
            //task/callva = ''dfdsf
           return this._tasks.push(task); 
        })

        console.log(this._tasks);
        this._renderTasks(); 
    }

    _startTaskPutServer(task) {
        // debugger;
        this.service.put(this.widgetId, task.id, task.name, task.isDone)
        .then();
    }

    render() {
        // debugger;
        // server
        this._renderHead();
        this._items_left();
    }

    _addTask(event) {
        // debugger;
        //stoped updeat
        event.preventDefault();

        let inp = this.input.value;
        if (inp !== "") {
            this._tasks.push(new Task(inp)); // post on server
            this.service.post(this.widgetId, inp).then(()=>{
                this._renderTasks(); 
                this.input.value = null;
            });
            
        }
    };

    _onTaskDeleted(task) {
        // delete server
        this.service.delete(this.widgetId, task.id)
        .then(()=>{
            // debugger;
            let deleted = this._tasks.filter( (item)=> {
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
        <div class="head" id="head">
            <form>
            <p>What to buy</p>
            <input type="text" placeholder="wright net task" class="input" id="input"/>
            <button id="btn" class="btn">+</button>
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
        this.btn = document.querySelector("#btn");
        this.input = document.querySelector("#input");
        this.btn.addEventListener("click", this._addTask.bind(this)); // add Tasks
        this.items_left = document.querySelector(".items-left");
        this.btn.addEventListener("click", this._items_left.bind(this)); // add Tasks
        this.all = document.querySelector(".all");
        this.all.addEventListener("click", this._allTasks.bind(this));
        this.active = document.querySelector(".active");
        this.active.addEventListener("click", this._activeTasks.bind(this));
        this.completed = document.querySelector('.compled');
        this.completed.addEventListener('click', this._completedTasks.bind(this));
    };

    _renderTasks() {
        // debugger;

        this.count = 0;

        let tasksForRender = this._tasks;

        if (this.filterMode == 'active') {
            tasksForRender = tasksForRender.filter((item, i, arr) => {
                return !item.isDone;
            })
        } else if(this.filterMode == 'completed'){
            tasksForRender = tasksForRender.filter((item)=>{
                return item.isDone;
            })
        };

        this.tasksBlock.innerHTML = ""; // очистим от старого

        for (let i = 0; i < tasksForRender.length; i++) {
            let item = tasksForRender[i];

            // debugger;
            this.tasksBlock.append(item.render()); // render tasks
            // todo: move to task createion place
            item._onTaskDeleted1 = this._onTaskDeleted.bind(this); //call
            // bind on isDone task
            item._items_left = this._items_left.bind(this);
            // bind on updata task put
            item._startPut = this._startTaskPutServer.bind(this);

            
            // 
            if(!item.isDone) {
                this.count++;
            }
            
        }
        this.items_left.innerHTML = `${this.count} Items-left`;
        this.count = 0;
        var serialItems = JSON.stringify(this._tasks);
        localStorage.setItem("key", serialItems);
    }

    // isDone tasks
    _items_left() {
        this._renderTasks();
    }

    _allTasks() {
        // debugger;
        this.filterMode = 'all';
        this._renderTasks(); 
    };

    _activeTasks() {
        this.filterMode = 'active';
        this._renderTasks();
    }

    _completedTasks() {
        this.filterMode = 'completed';
        this._renderTasks();
    };    
}