import {Recipe} from './recipes.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [

    new Recipe( 'Chiken briyani',
      'Hyderabadi dum briyani',
      'http://www.ndtv.com/cooks/images/hyderabadi%20biryani%20new.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Curry', 2)
      ]),
  new Recipe( 'Big Fat Burgur',
  'I am loving it',
  'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/5/5/0/FNM' +
    '_060115-Fatbuger-Recipe_s4x3.jpg.rend.hgtvcom.826.620.suffix/1431449537270.jpeg',
    [
       new Ingredient('Meat', 2),
       new Ingredient('French Fries', 20)
    ]),

  ];
  constructor(private slService: ShoppingListService){}
  getService() {
    return this.recipes.slice();
  }
  getRecipes(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
