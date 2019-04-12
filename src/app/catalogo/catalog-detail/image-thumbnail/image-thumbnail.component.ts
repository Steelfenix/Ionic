import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { Image } from 'src/app/types';

@Component({
  selector: 'app-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent implements OnInit, OnChanges {
  @Input()
  img: Image;

  @Output()
  deleteImg = new EventEmitter<Image>();

  show = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.show =
      changes.img.currentValue === null ||
      changes.img.currentValue === undefined
        ? false
        : true;
    console.log(changes.img.currentValue);
    console.log(this.show);
  }

  deleteImage() {
    this.deleteImg.emit(this.img);
  }
}
