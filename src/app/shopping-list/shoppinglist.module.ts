import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { IngredientsComponent } from './shopping-list-edit/ingredients/ingredients.component';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent,
    IngredientsComponent,
  ],
  imports: [
    SharedModule, 
    FormsModule,
    ShopRoutingModule
  ]
})
export class ShoppingListModule { }
