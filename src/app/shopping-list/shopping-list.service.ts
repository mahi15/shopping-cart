import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  listSelected = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('apple' , 5),
    new Ingredient('Tomatoes', 10),

  ];
  getIngredient() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
     this.ingredients.push(ingredient);
     this.listSelected.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
  // for (let ingredient of ingredients) {
  //   this.addIngredient(ingredient);
  // }
    this.ingredients.push(...ingredients);
    this.listSelected.emit(this.ingredients.slice());
  }
}
