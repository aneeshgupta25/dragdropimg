import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadImageDirective } from './upload.image.directive';
import { PreventDragDirective } from './prevent-drag.directive';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, UploadImageDirective, PreventDragDirective],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent implements AfterViewInit {

  imageDropCardVisible: boolean = false;
  @ViewChild('visibleOnDrag') visibleOnDrag!: ElementRef<HTMLDivElement>;
  @ViewChild('invisibleOnDrag') invisibleOnDrag!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.invisibleOnDrag!.nativeElement.style.display = "block";
    this.visibleOnDrag!.nativeElement.style.display = "none";
  }

  ngOnInit() {
  }

  onImageDragOver() {
    this.invisibleOnDrag.nativeElement.style.display = "none";
    this.visibleOnDrag.nativeElement.style.display = "block";
  }

  onImageDragLeave() {
    this.visibleOnDrag.nativeElement.style.display = "none";
    this.invisibleOnDrag.nativeElement.style.display = "block";
  }

}
