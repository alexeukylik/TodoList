class Service {
    constructor() {
        this.idServer = null;
    };

    
    get(widgetId) {
        // debugger;
        fetch(`https://repetitora.net/api/JS/Tasks?widgetId=${widgetId}&page=1&count=10`, {
            method: 'get',
            mode: 'cors',

        })           
            .then(data => data.json())
            .then((data) => {
                console.log(data);
                this.idServer = data.map((item) => {
                    return item;
                })
            })
            .then(()=>{
                console.log(this.idServer); 
            })
            .then(() => {
                this.pushAddServerCallback(this.idServer);
            });
    };


    post(widgetId, title) {
        const data = new URLSearchParams()

        data.append('widgetId', widgetId);
        data.append('title', title);

        return fetch('https://repetitora.net/api/JS/Tasks', {
            method: 'post',
            body: data,
            // headers: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'accept': 'application/json'},
            mode: 'cors',
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data);
                return data;
            })        
    };

    put(widgetId, taskId, title, done) {
        const data = new URLSearchParams();
        
        data.append('widgetId', widgetId);
        data.append('taskId', taskId);
        data.append('title', title);
        data.append('done', done)

       return fetch('https://repetitora.net/api/JS/Tasks', {
            method: 'put', 
            body: data,
            mode: 'cors',
        })
        .then((res)=>{
            res;
        })
        .then((data)=>{
            console.log(data);
            return data;
        })
    };

    delete(widgetId, taskId) {
        // debugger;
        const data = new URLSearchParams()

        data.append('widgetId', widgetId);
        data.append('taskId', taskId);

        return fetch('https://repetitora.net/api/JS/Tasks', {
            method: 'delete',
            body: data,
            mode: 'cors',

        })
            .then((result) => {
                return result.json()
            })
            .then((data) => {
                console.log(data);
                return data;
            })       
    };

    // $.ajax({
    //     type: 'get',
    //     url: 'https://repetitora.net/api/JS/Images',
    //     data: {
    //         page: 1,
    //         count: 10
    //     },
    //     success: (data)=> {
    //         return console.log(data);
    //     }
    // })

};

