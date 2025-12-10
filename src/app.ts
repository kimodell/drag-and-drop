//autobind decorator
//ensures this always refers to the correct class instance
function autobind(
  _: any, 
  _2: string, 
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

//ProjectInput class
class ProjectInput {

  //Reference to HTML elements required
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    //Grab template and div from DOM
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //Clone template content
    const importedNode = document.importNode(this.templateElement.content, true);
    //Extract form element from template
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input'; //Use css style 'user-input'

    // Grab references to the individual input fields inside the form
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    //Initate event listener
    this.configure();

    //Insert form into host element
    this.attach();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }
  //Connect submit event to submitHandler method
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  //Add the form to the DOM at the beginning of the host element
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();