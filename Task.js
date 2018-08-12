class Task {
    constructor(name, id, isDone) {
        this.name = name;
        this.isDone = isDone;
        this.label = '';
        // this._onTaskDeleted = null; 
        this.checked1 = null;
        this._items_left = null;
        this._allTasks = null;
        this.id = id;
    }

    render() {
        // debugger;
        if (this.label) {
            return this.label;
        } else {
            this.label = document.createElement('label');
            this.label.innerHTML = `
            <div class="border">
                <input class="checked" type="checkbox" ${ this.isDone ? "checked" : ""} /> 
                <span>${this.name}</span>
            <span class="del" data-role="delete">x</span>
            </div>`;

            // creat and listener checkbox
            this.checked1 = this.label.querySelector('.checked');
            this.checked1.addEventListener('change', this._selected.bind(this)); // selected Task 

            // crear span delete task and listener 'x'
            const deleteButton = this.label.querySelector('[data-role="delete"]');
            deleteButton.addEventListener('click', this._onDelete.bind(this)); //call

            // add class If input checked
            if (this.isDone) {
                this.label.classList.add('check-change');
            }

            return this.label;
        }
    };

    _selected() {
        if (this.checked1.checked) {
            this.label.classList.add('check-change');
            this.isDone = true;
        } else {
            this.label.classList.remove('check-change');
            this.isDone = false;
        }
        // callback
        this._startPut(this);
        this._items_left(this);
    };

    _onDelete() {
        this._onTaskDeleted1(this);
    };
};