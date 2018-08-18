class Task {
    constructor(name, id, isDone) {
        this.name = name;
        this.isDone = isDone;
        this.div = '';
        // this._onTaskDeleted = null; 
        this.checked1 = null;
        this._items_left = null;
        this._allTasks = null;
        this.id = id;
    }

    render() {
        // debugger;
        if (this.div) {
            return this.div;
        } else {
            this.div = document.createElement('div');
            this.div.setAttribute('class', 'border')
            this.div.innerHTML = `
                <label class="label">
                    <input class="checked" type="checkbox" ${ this.isDone ? "checked" : ""} /> 
                    <span>${this.name}</span>
                </label>
                <span class="del" data-role="delete">x</span>
            `;

            // creat and listener checkbox
            this.checked1 = this.div.querySelector('.checked');
            this.checked1.addEventListener('change', this._selected.bind(this)); // selected Task 

            // creat span delete task and listener 'x'
            const deleteButton = this.div.querySelector('[data-role="delete"]');
            deleteButton.addEventListener('click', this._onDelete.bind(this)); //call

            this.div.addEventListener('dblclick', this.fun.bind(this));

            // add class If input checked
            if (this.isDone) {
                this.div.classList.add('check-change');
            }

            return this.div;
        }
    };

    fun() {
        console.log('start');
    }

    _selected() {
        if (this.checked1.checked) {
            this.div.classList.add('check-change');
            this.isDone = true;
        } else {
            this.div.classList.remove('check-change');
            this.isDone = false;
        }
        // callback
        this._startPut(this);
        this._items_left(this);
    };

    _onDelete() {
        this._onTaskDeletedchild(this);
    };
};