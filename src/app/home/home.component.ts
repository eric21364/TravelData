import { AppService } from './../services/app.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Attraction } from '../model/attraction';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../model/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  attraction: Attraction[] = [];
  private previewWindow: Window;
  category: Observable<Category[]> = this.appService.getAttractionType();
  total = [];
  checkboxList: Attraction[] = [];
  detailData: Attraction;
  searchForm: FormGroup = new FormGroup({
    page: new FormControl(1),
    categoryIds: new FormControl(null, Validators.required),
  })
  get page() { return this.searchForm.get('page') as FormControl }
  get categoryIds() { return this.searchForm.get('categoryIds') as FormControl }

  constructor(
    private appService: AppService
  ) { }

  savelocal() {
    localStorage.setItem('favourite', JSON.stringify(this.checkboxList));
  }

  ngOnInit(): void {
    this.categoryIds.valueChanges.subscribe(x => {
      this.categoryIds.reset(x, { emitEvent: false })
      this.getAttractionData();
    })

    if (localStorage.getItem('favourite') != null) {
      this.checkboxList = JSON.parse(localStorage.getItem('favourite'))
    }

  }

  getAttractionData() {
    if (this.searchForm.invalid) {
      return
    }
    this.appService.getAttractionData(this.searchForm.value).subscribe(x => {
      this.attraction = x.data;
      this.total = Array(Math.ceil(x.total / 30)).fill(1).map((x, i) => i);
    })
  }
  pageCheck(num) {
    return (num + 1) == this.searchForm.get('page').value;
  }
  togglePage(page) {
    if (page <= 0 || page > this.total[this.total.length - 1] + 1) {
      return;
    }
    this.page.setValue(page);
    this.getAttractionData();
  }

  clickAttraction(item) {
    console.log(item)
    this.checkboxList.push(item);
  }

  detail(id) {
    this.detailData = this.attraction[this.attraction.findIndex(x => x.id == id)]
    this.openWindow();
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

  openWindow() {
    // 開啟目標視窗，如視窗未完成開啟前即執行 postMessage() 會傳送無效
    this.previewWindow = window.open('detail', '_blank');
  }

}
