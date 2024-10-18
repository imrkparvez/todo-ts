import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };

  todos.push(todo);

  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (item: Todo) => {
  const { title, isCompleted, id } = item;

  const todo = document.createElement("div");
  todo.className = "todo";

  // Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) =>
      item.id === id ? item.isCompleted = checkBox.checked : null
    );
    para.className = checkBox.checked ? "textCut" : "";
  };

  // Creating Title Section
  const para: HTMLParagraphElement = document.createElement("p");
  para.innerText = title;
  para.className = item.isCompleted ? "textCut" : "";

  // Creating Delete button
  const btn: HTMLButtonElement = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(item.id);
    renderTodo(todos);
  };

  // Appending all to Todo Item
  todo.append(checkBox, para, btn);

  todoContainer.append(todo);
};

const renderTodo = (todos: Todo[]) => {
  todoContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item);
  });
};

const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);

  todos.splice(idx, 1);
};
