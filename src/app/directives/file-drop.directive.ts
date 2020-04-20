import { Directive, Output, EventEmitter, HostListener } from '@angular/core';


@Directive({
  selector: '[appFileDrop]'
})
export class FileDropDirective {

  @Output() fileDropped:EventEmitter<FileList> = new EventEmitter<FileList>();
  @Output() fileHovered:EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() { 
  }

  @HostListener('drop', ['$event'])
  public onDrop($event) {
    $event.preventDefault();
    const transfer = $event.dataTransfer;
    this.fileDropped.emit(transfer.files[0])
    this.fileHovered.emit(false)
  }

  @HostListener('dragover', ['$event'])
  public onDragOver($event) {
    $event.preventDefault()
    this.fileHovered.emit(true)
  }

  @HostListener('dragleave',['$event'])
  public onDragLeave($event) {
    $event.preventDefault()
    this.fileHovered.emit(false)
  }

}
