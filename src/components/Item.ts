import { IItem } from "../types/index";

export interface IViewItem {
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
  setCopyHandler(handlerCopyItem: Function): void;
  setDeleteHandler(handlerDeleteItem: Function): void;
}

export interface IViewItemConstructor {
  new (template: HTMLTemplateElement) : IViewItem
}

export class Item implements IViewItem{
  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id: string;
  protected copyButton: HTMLButtonElement;
  protected deleteButton: HTMLButtonElement;
  protected handlerCopyItem: Function;
  protected handlerDeleteItem: Function;

  constructor(template: HTMLTemplateElement) {
    this.itemElement = template.content.querySelector('.todo-item').cloneNode(true) as HTMLElement;
    this.title = this.itemElement.querySelector('.todo-item__text');
    this.copyButton = this.itemElement.querySelector('.todo-item__copy');
    this.deleteButton = this.itemElement.querySelector('.todo-item__del');

  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || '';
  }

  set name(value: string) {
    this.title.textContent = value;
  }

  get name():string {
    return this.title.textContent || '';
  }

  setCopyHandler(handlerCopyItem: Function): void {
    this.handlerCopyItem = handlerCopyItem;
    this.copyButton.addEventListener('click', (evt) => {
      this.handlerCopyItem(this)
    })
  }

  setDeleteHandler(handlerDeleteItem: Function): void {
    this.handlerDeleteItem = handlerDeleteItem;
    this.deleteButton.addEventListener('click', (evt) => {
      this.handlerDeleteItem(this);
    })
  }

  render(item: IItem) {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}