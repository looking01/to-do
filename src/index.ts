import { Page } from './components/Page';
import { ToDoModel } from './components/ToDoModel';
import "./styles/styles.css"
import { todos } from "./utils/constants";
import { Item } from "./components/Item";
import { Form } from "./components/Form";

const contentElement = document.querySelector('.content') as HTMLElement;
const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
const formTemplate = document.querySelector('#todo-form-template') as HTMLTemplateElement;

const page = new Page(contentElement);
const todoForm = new Form(formTemplate);
todoForm



function handleSubmitForm(data: string) {
  const todoItem = new Item(template);
  const itemElement = todoItem.render({id: "8", name: data});
  contentElement.prepend(itemElement);
  todoForm.clearValue();
}

todos.forEach(item => {
  const todoItem = new Item (template);
  const itemElement = todoItem.render(item);
  contentElement.prepend(itemElement);
})

const todoArray = new ToDoModel();
todoArray.items = todos;







