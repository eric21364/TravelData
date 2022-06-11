import { HomeComponent } from './home/home.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  //{ path: "**", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "favourite", component: FavouriteComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
