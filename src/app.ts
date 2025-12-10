class ProjectInput {

  //Reference to HTML elements required
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    //Grab template and host div from DOM
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //Clone template content
    const importedNode = document.importNode(this.templateElement.content, true);
    //Extract form element
    this.element = importedNode.firstElementChild as HTMLFormElement;
    //Insert form into host element
    this.attach();
  }
  
  //Add the form to the DOM at the beginning of the host element
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();