import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { IngredientModel } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service'


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[]
  private subscription: Subscription;

  constructor(private slService: ShoppinglistService) { 
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe((ingredients: IngredientModel[]) => {
      this.ingredients = ingredients
    }); // ingredients from service = ingredients from here

  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index) // passes on index # so we can listen to it elsewhere
  } //edit component

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
