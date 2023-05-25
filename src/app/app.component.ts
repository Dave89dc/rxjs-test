import { Component } from '@angular/core';
import { ConnectionService } from './services/connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-test';
  constructor(private connService: ConnectionService){

    connService.getDittoWithPromise().then(ditto => console.log('Ditto Promise', ditto));

    connService.getDittoWithObservable().subscribe({
      next: ditto => console.log('Ditto Observable', ditto),
      error: err => console.log('Error: ', err)
    });

    connService.getFirst20PokemonWithPromise()
      .then(pokemons => console.log('First 20 Pokemons with fetch: ', pokemons));

    connService.getFirst20PokemonWithObservable()
      .subscribe({
        next: pokemons => console.log('First 20 Pokemons with observable: ', pokemons),
        error: err => console.log('Error: ', err)
      });

    connService.getFirstAbilityPromise()
      .then(ability => console.log("Chiamata sequenziale all'abilità Pokemon con Promise: ", ability));

    connService.getFirstAbilityObservable()
      .subscribe({
        next: ability => console.log("Chiamata sequenziale all'abilità Pokemon con Observable: ", ability),
        error: err => console.log('Error: ', err)
      });

    connService.getAllPokemonWithPromise()
      .then(pokemons => console.log('All pokemons with fetch: ', pokemons));

      connService.getAllPokemonWithObservable()
      .subscribe({
        next: pokemons => console.log("All pokemons with observable: ", pokemons),
        error: err => console.log('Error: ', err)
      });

  }
}
