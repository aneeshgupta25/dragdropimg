import { AfterViewInit, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageFocusDialogComponent } from '../image-focus-dialog/image-focus-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UploadImageDirective } from './upload-image.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, UploadImageDirective, FormsModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css'
})
export class UploadImageComponent {

  readonly dialog = inject(MatDialog);
  dragInAction = signal(true);
  imageAdded = signal(false);

  /** File is passed to the dialog */
  file = signal<File | undefined>(undefined);
  url = signal<string>('');
  imageAddedCSSInset = signal<CSSStyleDeclaration | undefined>(undefined);

  /** FilePath is used to reset the value of input element */
  filePath = signal<string>('');

  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (!files) return;
    this.file.set(files[0]);
    this.url.set(window.URL.createObjectURL(this.file()!));
    this.openImageFocusDialog()
  }

  openImageFocusDialog() {
    const dialogRef = this.dialog.open(ImageFocusDialogComponent, {
      data: {
        file: this.file(),
        url: this.url()
      },
      minHeight: 'fit-content',
      minWidth: '50vw',
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(insetStyle => {
      this.imageAdded.set(true);
      this.imageAddedCSSInset.set(insetStyle);
    })
  }

  onDragOver() {
    this.dragInAction.set(false);
  }

  onDragLeave() {
    this.dragInAction.set(true);
  }

  onDropFile(event: { file: File, url: string }) {
    this.file.set(event.file);
    this.url.set(event.url);
    this.openImageFocusDialog();
  }

}
