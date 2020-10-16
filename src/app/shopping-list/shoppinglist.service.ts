import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';

import { IngredientModel } from '../shared/ingredient.model'

@Injectable({
  providedIn: 'root'
})
export class ShoppinglistService {

  ingredientsChanged = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>()

  private ingredients: IngredientModel[] = [
    new IngredientModel('apples', 10),
    new IngredientModel('pepperoni', 15),
  ]

  getIngredients() {
    return this.ingredients.slice();
  } // returns a copy of original array

  getIngredient(index: number) {
    return this.ingredients[index]
  }
  
  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  addIngredientsFromRecipes(ingredients: IngredientModel[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // } but this emits a lot of unnecsesary events
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice()) //emit the updated ingredient
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  constructor() { }
}
