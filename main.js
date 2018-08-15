const serviceDal = new Service();  //create DALL
const todoList = new TodoList(serviceDal);
todoList.render();

