import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UrlComponent } from './url/url.component';

const appRoutes: Routes = [
  {
    path: '',
    component: UrlComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
