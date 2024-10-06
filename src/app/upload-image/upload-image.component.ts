import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadImageDirective } from './upload.image.directive';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, UploadImageDirective],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent implements AfterViewInit {

  imageDropCardVisible: boolean = false;
  @ViewChild('visible') visibleEl!: ElementRef;
  @ViewChild('invisible') inVisibleEl!: ElementRef;

  ngAfterViewInit(): void {
    this.inVisibleEl!.nativeElement.style.display = "none";
    this.visibleEl!.nativeElement.style.display = "block";
  }

  ngOnInit() {
  }

  onImageDragOver() {
    this.inVisibleEl.nativeElement.style.display = "block";
    this.visibleEl.nativeElement.style.display = "none";
  }

  onImageDragLeave() {
    this.inVisibleEl.nativeElement.style.display = "none";
    this.visibleEl.nativeElement.style.display = "block";
  }

}
