import { style } from "@angular/animations";
import { Directive, HostBinding, HostListener, OnInit, output } from "@angular/core";

@Directive({
    selector: '[appUploadImage]',
    standalone: true,
})
export class UploadImageDirective implements OnInit {

    @HostBinding('style.background-color') hostBackgroundColor!: string;
    @HostListener('dragover', ["$event"]) dragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.imageDragOver.emit();
    }
    @HostListener('dragleave', ["$event"]) dragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.imageDragLeave.emit();
    }
    @HostListener('drop', ["$event"]) drop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
    imageDragOver = output();
    imageDragLeave = output();

    ngOnInit(): void {
        // this.hostBackgroundColor = DropColor.BEFORE_DROP;
    }
}

// enum DropColor {
//     BEFORE_DROP = '#80808017',
//     DURING_DROP = 'grey',
//     AFTER_DROP = '#80808017'
// }