///<reference path="base-component.ts"/>
///<reference path="../decorators/autobind.ts"/>
///<reference path="../state/project-state.ts"/>
///<reference path="../models/drag-drop.ts"/> 
///<reference path="../models/project.ts"/>

namespace App {
  //ProjectList Class
  //render list of projects 
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    //utilize droppable css class to render where the droppable area is located
    @autobind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.add('droppable');
      }
    };

    @autobind
    dropHander(event: DragEvent) {
      const prjId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        prjId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    };

    //remove css droppable class after drop event
    @autobind
    dragLeaveHander(_: DragEvent) {
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.remove('droppable');
    };

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHander);
      this.element.addEventListener('drop', this.dropHander);


      //Filter project by status, add to correct assignedProjects array based on status
      projectState.addListener((projects: Project[]) => {
        const releventProjects = projects.filter(prj => {
          if (this.type === 'active') {
            return prj.status === ProjectStatus.Active;
          }
          return prj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = releventProjects;
        this.renderProjects();
      });
    };

    //update id and text content inside cloned template
    //create unique id for each ul element and assign it to the ul inside the project list
    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'; //set heading based ont project type
    }

    //render projects 
    //loop through assigned projects and add each as an <li>
    private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = '';   //clear existing list items and re-render
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
      }
    }
  }
}