import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipewasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [

    new Recipe( 'A test Recipe', 'This is simply a test',
     'https://www.wellplated.com/wp-content/uploads/2017/07/Chicken-and-Tomatoes-with-Capers-600x748.jpg'),
    new Recipe( 'Another test Recipe', 'This is simply a test',
     'https://www.wellplated.com/wp-content/uploads/2017/07/Chicken-and-Tomatoes-with-Capers-600x748.jpg'),

  ];

  constructor() { }

  ngOnInit() {
  }
  onRecipeSelected(recipe: Recipe) {
    this.recipewasSelected.emit(recipe);

  }
}
