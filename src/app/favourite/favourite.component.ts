import { Component, OnInit } from '@angular/core';
import { Attraction } from '../model/attraction';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  attraction: Attraction[] = [];
  checkboxList = [];
  favoutite = [];
  constructor() { }

  ngOnInit(): void {
    localStorage.getItem('favourite').split(',').forEach(element => {
      let favourite = element.split(' ');
      this.attraction.push({ id: parseInt(favourite[0]), name: favourite[1] });
    });
    this.attraction.sort(x => x.id);
  }
  removelocal() {
    this.checkboxList.forEach(x => {
      this.attraction.splice(this.attraction.findIndex(y => y.id == x), 1);
    });
    this.attraction.forEach(x => {
      this.favoutite.push(x.id + ' ' + x.name);
    });
    localStorage.removeItem('favourite');
    localStorage.setItem('favourite', this.favoutite.join(','));
  }
  clickAttraction(item) {
    console.log(item)
    this.checkboxList.push(item.id);
  }

}
