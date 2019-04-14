import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [

    new Recipe( 'A test Recipe', 'This is simply a test',
     'https://www.wellplated.com/wp-content/uploads/2017/07/Chicken-and-Tomatoes-with-Capers-600x748.jpg'),
    new Recipe( 'A test Recipe', 'This is simply a test',
     'https://www.wellplated.com/wp-content/uploads/2017/07/Chicken-and-Tomatoes-with-Capers-600x748.jpg'),

  ];

  constructor() { }

  ngOnInit() {
  }

}
