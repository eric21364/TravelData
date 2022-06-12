import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '../model/attraction';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  attraction: Attraction[] = [];
  checkboxList: Attraction[] = [];
  detailData: Attraction;
  favourite = [];
  private previewWindow: Window;
  constructor() { }
  saveForm: FormGroup = new FormGroup({
    changeId: new FormControl(null, Validators.required),
    changeData: new FormControl(null, Validators.required)
  })
  get changeId() { return this.saveForm.get('changeId') as FormControl }
  get changeData() { return this.saveForm.get('changeData') as FormControl }

  ngOnInit(): void {
    if (localStorage.getItem('favourite') !== null) {
      this.attraction = JSON.parse(localStorage.getItem('favourite'));

    }
  }
  removelocal() {
    this.checkboxList.forEach(x => {
      this.attraction.splice(this.attraction.findIndex(y => y.id == x), 1);
    });

    localStorage.removeItem('favourite');
    localStorage.setItem('favourite', JSON.stringify(this.attraction));
  }
  clickAttraction(item) {
    this.checkboxList.push(item.id);
  }
  change(id) {
    this.changeId.setValue(id);
    this.changeData.setValue(this.attraction[this.attraction.findIndex(y => y.id == id)].name);
  }
  save() {
    if (this.saveForm.invalid) {
      return
    }
    this.attraction[this.attraction.findIndex(y => y.id == this.saveForm.get('changeId').value)].name = this.saveForm.get('changeData').value;
    this.attraction.forEach(x => {
      this.favourite.push(x.id + ' ' + x.name);
    });
    localStorage.removeItem('favourite');
    localStorage.setItem('favourite', JSON.stringify(this.attraction));
    this.changeId.setValue(null);
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {

    // 子視窗通知準備完成
    if (event.data === 'isReady') {

      const foo = {
        type: 'preview',
        data: this.detailData
      };

      this.previewWindow.postMessage(foo, '*');
    }
  }
  detail(id) {
    this.detailData = this.attraction[this.attraction.findIndex(x => x.id == id)]
    this.openWindow();
  }

  openWindow() {
    // 開啟目標視窗，如視窗未完成開啟前即執行 postMessage() 會傳送無效
    this.previewWindow = window.open('detail', '_blank');
  }
}
