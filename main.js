const serviceDal = new Service();  //create DALL
const visual = new Visual();
const todoList = new TodoList(serviceDal, visual);
todoList.render();

