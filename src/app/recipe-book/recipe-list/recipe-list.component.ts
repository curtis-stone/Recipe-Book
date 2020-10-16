import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { RecipeModel } from '../recipe.model';
import { RecipebookService } from '../recipebook.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipes: RecipeModel[];
  subscription: Subscription;

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  constructor(private recipebookService: RecipebookService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipebookService.getRecipes()
    this.subscription = this.recipebookService.recipesChanged.subscribe(
      (recipes: RecipeModel[]) => {
        this.recipes = recipes
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
