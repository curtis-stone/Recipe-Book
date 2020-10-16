import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipebookService } from '../recipebook.service'
import { RecipeModel } from '../recipe.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipebookService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params) => {
        this.id = +params['id'] // retrieves the id dynamically
        this.editMode = params['id'] != null //checks if we are in edit mode or new mode. returns false if id is undefined
        console.log(this.editMode)
        this.initForm() // placed here to be called on every page reload
      })
  }

  onSubmit() {
    // const newRecipe = new RecipeModel(this.recipeForm.value['name'], 
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'])
      // ^ can be sub'd for recipeForm.value b/c of the model and form having same names for items!
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value) 
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
   this.router.navigate(['../'], {relativeTo: this.route}) // rel to active route
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({ // FormGroup because each ingredient has 2 values (name & amount)
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, 
          [Validators.required, 
          Validators.pattern(/^[1-9]+[0+9]*$/) 
        ])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, 
                [Validators.required, 
                Validators.pattern(/^[1-9]+[0+9]*$/) ])
            })
          )
        }
      }
      
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required), // recipe name is deafult
      'imagePath': new FormControl(recipeImagePath), // Validators.required was removed
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    })
  }



  get ingredientControls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  
}
