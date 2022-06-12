import { HomeComponent } from './home/home.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
const routes: Routes = [
  // { path: "**", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "favourite", component: FavouriteComponent },
  { path: "detail", component: DetailComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
