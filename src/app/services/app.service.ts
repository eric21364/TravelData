import { ApiResult } from './../model/api-result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attraction } from '../model/attraction';
import { Category } from '../model/category';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient
  ) { }

  objToHttpParams(data) {
    return new HttpParams(
      {
        fromObject: data
      }
    );
  }
  getAttractionData(data) {
    let params = this.objToHttpParams(data);
    return this.httpClient.get<ApiResult<Attraction[]>>('http://smallquilt.quilt.idv.tw:3336/https://www.travel.taipei/open-api/zh-tw/Attractions/All', { params })
  }
  getAttractionType() {
    return this.httpClient.get<ApiResult<Category[]>>('http://smallquilt.quilt.idv.tw:3336/www.travel.taipei/open-api/zh-tw/Miscellaneous/Categories?type=Attractions').pipe(
      map(x => {
        let category = [];
        Object.keys(x.data).forEach(y => {
          category = category.concat(x.data[y])
        })
        return category;
      })
    )
  }
}
