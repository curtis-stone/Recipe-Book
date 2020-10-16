import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IngredientModel } from '../../shared/ingredient.model'
import {ShoppinglistService } from '../shoppinglist.service'



@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true}) slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientModel;

  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new IngredientModel(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
    this.slService.addIngredient(newIngredient) // service used (slService)
    }
    this.editMode = false;
    form.reset()
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
  constructor(private slService: ShoppinglistService) { } // service injection

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
