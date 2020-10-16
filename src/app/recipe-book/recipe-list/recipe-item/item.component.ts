import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'recipe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() recipe: RecipeModel;
  @Input() index: number; //passes in index of recipe array item to make dynamic parameters available here
  
  ngOnInit(): void {

  }

}
