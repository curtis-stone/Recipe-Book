import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RecipeModel } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service'
import { RecipebookService } from './recipebook.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<RecipeModel[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipeBookService: RecipebookService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeBookService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes
    }
  }
}
