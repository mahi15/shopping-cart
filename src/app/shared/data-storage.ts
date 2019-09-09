import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipes.model';
import {map, tap} from 'rxjs/operators';


@Injectable()
export class DataStorageService {
constructor(private http: HttpClient, private recipeService: RecipeService) {}

storeRecipes() {
  const recipes = this.recipeService.getService();
  return this.http.put('https://shopping-cart-3f532.firebaseio.com/recipes.json',
    recipes
  )
    .subscribe(response => {
      console.log(response);
    });
  }
  fetchRecipes() {
    return this.http.get<Recipe[]>('https://shopping-cart-3f532.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
      );
  }
}
