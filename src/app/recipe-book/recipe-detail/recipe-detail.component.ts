import { Component, OnInit } from '@angular/core';
import { RecipeModel } from '../recipe.model';
import { RecipebookService} from '../recipebook.service'
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: RecipeModel;
  id: number;
  
  onAddToShoppingList() {
    this.recipeService.ingredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
    // more complex path: goes up 1 folder, gets id, sends to edit
    // 1st method is easier and simpler
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  
  constructor(private recipeService: RecipebookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() { 
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'] // + casts param's id string to a number to be used as an index
        //loads recipe from recipe.service
        this.recipe = this.recipeService.getRecipe(this.id) // fetches recipe
      }
    )
  }

}
