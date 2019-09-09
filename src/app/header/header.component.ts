import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorageService) {}
  onSaveData() {
    this.dataStorage.storeRecipes();
  }
  onFectchData() {
this.dataStorage.fetchRecipes().subscribe();
  }
}
