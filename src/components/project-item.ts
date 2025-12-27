import { Component } from "../components/base-component.js";
import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { autobind } from "../decorators/autobind.js";

  //Project item class
  //render each project item with title, people and description from project class
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    //getter for rendering specific text based on number of people
    get persons() {
      if (this.project.people === 1) {
        return '1 person';
      } else {
        return `${this.project.people} people`;
      };
    };

    constructor(hostId: string, project: Project) {
      super('single-project', hostId, false, project.id);
      this.project = project;

      this.configure();
      this.renderContent();
    };

    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';

    };

    dragEndHandler(_: DragEvent) {
      console.log('Drag End');
    };

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }