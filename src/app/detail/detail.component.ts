import { Component, HostListener, OnInit } from '@angular/core';
import { Attraction } from '../model/models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  detailData: Attraction;

  constructor() { }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent): void {
    // 僅接受自訂資料內容
    if (event.data.type === 'preview') {
      this.detailData = event.data.data;
    }
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    const w = window.opener as Window; // 目前視窗之父視窗的參考
    w.postMessage('isReady', '*'); // 通知父視窗
  }
}
