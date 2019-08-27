import {Component, OnInit, Output} from '@angular/core';
import { Recipe } from '../recipes.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private route: Router,
              private routes: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getService();
  }
  newReciipe() {
    this.route.navigate(['new'] , {relativeTo: this.routes});
  }
}
