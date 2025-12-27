//drag and drop interfaces
namespace App {
  export interface Draggable {
    //event listeners to start and end drag functionality
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }

  export interface DragTarget {
    //handler to ensure drag target is valid/permit drop
    dragOverHandler(event: DragEvent): void;
    //handler to handle actualy drop
    dropHander(event: DragEvent): void;
    //handler for visual feedback following drop
    dragLeaveHander(event: DragEvent): void;
  }
}
