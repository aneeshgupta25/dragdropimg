import { AfterViewInit, Component, ElementRef, inject, model, output, signal, ViewChild } from '@angular/core';
import { FocusedImage, FocusPicker } from 'image-focus';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-focus-dialog',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './image-focus-dialog.component.html',
  styleUrl: './image-focus-dialog.component.css'
})
export class ImageFocusDialogComponent implements AfterViewInit {

  @ViewChild('focusPickerImg') focusPickerImg?: ElementRef<HTMLImageElement>;
  @ViewChild('imageToBeFocussedSq') imageToBeFocussedSq?: ElementRef<HTMLImageElement>;
  @ViewChild('imageToBeFocussedRec') imageToBeFocussedRec?: ElementRef<HTMLImageElement>;

  readonly data = inject<ImageFocusDialogData>(MAT_DIALOG_DATA);
  readonly image = model(this.data.file);
  readonly url = model(this.data.url);
  readonly dialogRef = inject(MatDialogRef<ImageFocusDialogComponent>)

  ngAfterViewInit(): void {
    if (!this.focusPickerImg || !this.imageToBeFocussedSq || !this.imageToBeFocussedRec) {
      return;
    }
    const imageToBeFocussedSqEl = new FocusedImage(this.imageToBeFocussedSq?.nativeElement);
    const imageToBeFocussedRecEl = new FocusedImage(this.imageToBeFocussedRec?.nativeElement);
    const focusPickerImg = new FocusPicker(this.focusPickerImg?.nativeElement, {
      onChange: focus => {
        imageToBeFocussedSqEl.setFocus(focus);
        imageToBeFocussedRecEl.setFocus(focus);
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close(this.imageToBeFocussedRec?.nativeElement.style.inset);
  }

}

export interface ImageFocusDialogData {
  file: File,
  url: string,
}