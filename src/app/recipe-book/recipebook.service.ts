import { Injectable, OnInit} from '@angular/core';
import { Subject } from 'rxjs';

import { RecipeModel } from './recipe.model'
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shoppinglist.service'


@Injectable()

export class RecipebookService {

  recipesChanged = new Subject<RecipeModel[]>();

  // private recipes: RecipeModel[] = [
  //   new RecipeModel('Test Recipe',
  //   'Simply a Test', 
  //   'https://www.publicdomainpictures.net/pictures/270000/velka/pizza-1532881335pCX.jpg',
  //   [
  //   new IngredientModel('pizza dough', 1), 
  //   new IngredientModel('sauce', 1), 
  //   new IngredientModel('cheese', 1) ]
  //   ),
  //   new RecipeModel('Test Recipe 2', 
  //   'Simply a Test', 
  //   'https://www.thespruceeats.com/thmb/2znZg8eP5kfOJuuwBKAK7-JlyHQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/jamaican-beef-patties-recipe-2137762-Hero-5bcf7fd046e0fb00260b6a18.jpg',
  //   [
  //     new IngredientModel('dough', 1),
  //     new IngredientModel('ground beef', 1),
  //     new IngredientModel('sauce', 1)
  //   ]
  //   )
  // ]

  private recipes: RecipeModel[] = [];
  
  setRecipes(recipe: RecipeModel[]) {
    this.recipes = recipe
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  ingredientsToShoppingList(ingredients: IngredientModel[]) {
    this.slService.addIngredientsFromRecipes(ingredients)
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
  
  constructor(private slService: ShoppinglistService) { }

  ngOnInit() { }
}
