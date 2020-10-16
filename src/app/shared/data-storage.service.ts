import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipebookService } from '../recipe-book/recipebook.service'
import { RecipeModel } from '../recipe-book/recipe.model'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeBookService: RecipebookService,
              private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeBookService.getRecipes();
    this.http.put('https://recipebook-f84d8.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response)
    });
  }

  fetchRecipes() {
    return this.http
      .get<RecipeModel[]>(
        'https://recipebook-f84d8.firebaseio.com/recipes.json?')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => { 
            return {
              ...recipe, 
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeBookService.setRecipes(recipes);
        })
      );
  }
}
