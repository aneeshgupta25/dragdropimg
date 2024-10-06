import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
    selector: '[preventDrag]',
    standalone: true
})
export class PreventDragDirective {
    elementRef = inject(ElementRef);

    constructor() {
        this.elementRef.nativeElement.addEventListener('dragover', (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
        }, false);
        this.elementRef.nativeElement.addEventListener('dragleave', (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
        }, false);
    }
}