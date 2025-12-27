namespace App {
  //Componenet Base Class
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    //Reference to HTML elements required
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string,
    ) {
      //Grab template and div from DOM
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      //Clone template content by extracting element from template ans setting type based on id
      const importedNode = document.importNode(this.templateElement.content, true);
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }

    //insert project list element at the end of the #app element
    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
}