export interface IPage {
  todoContainer: HTMLElement[];
  formContainer: HTMLElement;
}

export class Page implements IPage {
  _todoContainer: HTMLElement;
  _formContainer: HTMLElement;

  constructor(protected container: HTMLElement) {
    this._todoContainer = this.container.querySelector('.todos__list');
    this._formContainer = this.container.querySelector('.todo-form-container')
  }

  set todoContainer(items: HTMLElement[]) {
    this._todoContainer.replaceChildren(...items);
  }

  set formContainer(formElement: HTMLFormElement) {
    if(formElement) {
      this._formContainer.replaceChildren(formElement);
    } else {
      this._formContainer.innerHTML = '';
    }
  }
}