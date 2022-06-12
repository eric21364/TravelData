import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Attraction } from '../model/attraction';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  attraction: Attraction[] = [];
  checkboxList = [];
  favourite = [];
  constructor() { }
  saveForm: FormGroup = new FormGroup({
    changeId: new FormControl(null, Validators.required),
    changeData: new FormControl(null, Validators.required)
  })
  get changeId() { return this.saveForm.get('changeId') as FormControl }
  get changeData() { return this.saveForm.get('changeData') as FormControl }

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
      this.favourite.push(x.id + ' ' + x.name);
    });
    localStorage.removeItem('favourite');
    localStorage.setItem('favourite', this.favourite.join(','));
  }
  clickAttraction(item) {
    console.log(item)
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
    localStorage.setItem('favourite', this.favourite.join(','));
  }
}
