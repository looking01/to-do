import { IViewItem, IViewItemConstructor } from './Item';
import { IToDoModel } from '../types';
import { IForm, IFormConstructor } from './Form';
import { IPage } from './Page';

export class ItemPresenter {
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;

  constructor(
    protected model: IToDoModel,
    protected formConstructor: IFormConstructor,
    protected viewPageContainer: IPage,
    protected viewItemConstructor: IViewItemConstructor,

  ) {
    this.itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
    this.formTemplate = document.querySelector('#todo-form-template') as HTMLTemplateElement;
  }

  init() {
    this.todoForm = new this.formConstructor(this.formTemplate);
    this.todoForm.setHandler(this.handleSubmitForm.bind(this));
    this.viewPageContainer.formContainer = this.todoForm.render();
  }

  handleSubmitForm(data:string) {
    this.model.addItem(data);
    this.renderView();
    this.todoForm.clearValue();
  }

  handleCopyItem(item: IViewItem) {
    const copiedItem = this.model.getItem(item.id);
    this.model.addItem(copiedItem.name);
    this.renderView();
  }

  handleDeleteItem(item: IViewItem) {
    this.model.removeItem(item.id);
    this.renderView();
  }

  renderView() {
    const itemList = this.model.items.map((item) => {
      const todoItem = new this.viewItemConstructor(this.itemTemplate);
      todoItem.setCopyHandler(this.handleCopyItem.bind(this))
      todoItem.setDeleteHandler(this.handleDeleteItem.bind(this))
      const itemElement = todoItem.render(item);
      return itemElement;
    }).reverse();

    this.viewPageContainer.todoContainer = itemList;
  }
}