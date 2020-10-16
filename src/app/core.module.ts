import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppinglistService } from './shopping-list/shoppinglist.service';
import { RecipebookService } from './recipe-book/recipebook.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ShoppinglistService, 
    RecipebookService, 
    {provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService, 
      multi: true}
    ]
})
export class CoreModule { }
