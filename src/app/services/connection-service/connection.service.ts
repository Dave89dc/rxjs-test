import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { Pokemon, Ability } from 'src/app/model/ability';
import { BaseData } from 'src/app/model/base-data';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  readonly DITTO_URL = 'https://pokeapi.co/api/v2/pokemon/ditto';

  readonly ALL_POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {
    // this.getDittoWithPromise();
    // this.getDittoWithObservable();
  }

  // promise e observable:

  getDittoWithPromise(): /*void*/ Promise<any>/*<Pokemon>*/{

    // fetch(this.DITTO_URL)
    //   .then(resp => resp.json())
    //   .then(ditto => console.log('Ditto Promise: ', ditto)); // l'ultimo then lo gestiamo nel componente

    return fetch(this.DITTO_URL).then(resp => resp.json() /*as unknown as Pokemon*/);

  }

  getDittoWithObservable(): /*void*/ Observable<Pokemon>{

    return this.http.get<Pokemon>(this.DITTO_URL);

    // this.http.get(this.DITTO_URL)
    //   .subscribe({
    //     next: ditto => console.log('Ditto Observable', ditto),
    //     error: err => console.log('Error: ', err)
    //   });

      // oppure
      /*this.http.get(this.DITTO_URL)
          .subscribe(ditto => console.log(ditto));*/

  }

  // chiamate in parallelo con promise e observable:

  getFirst20PokemonWithPromise(): Promise<any[]>{
    const fetchArray = [];

    for (let i = 1; i < 21; i++) { // i pokemon sono 20 alla volta e partono dal numero 1
      const url = this.ALL_POKEMON_URL + '/' + i + '/';
      console.log(url);
      const request = fetch(url).then(resp => resp.json());
      fetchArray.push(request);
    }
    return Promise.all(fetchArray);
  }

  getFirst20PokemonWithObservable(): Observable<Pokemon[]>{
    const getArray = [];

    for (let i = 1; i < 21; i++) { // i pokemon sono 20 alla volta e partono dal numero 1
      const url = this.ALL_POKEMON_URL + '/' + i + '/';
      console.log(url);
      const request = fetch(url).then(resp => resp.json());
      getArray.push(request);
    }
    return forkJoin(getArray);
  }

  // chiamate in sequenza con promise e observable:

  getFirstAbilityPromise(): Promise<any>{
    return fetch(this.DITTO_URL)
      .then(resp => resp.json())
      .then(ditto => {
        const abilities = ditto.abilities;
        const firstAbilityInfo = abilities[0];
        const ability = firstAbilityInfo.ability;
        const abilityUrl = ability.url;
        return fetch(abilityUrl).then(resp => resp.json());
      })
  }

  getFirstAbilityObservable(): Observable<Ability>{
    return this.http.get<Pokemon>(this.DITTO_URL).pipe(
      switchMap((ditto) => { // lo switchMap() al posto di map() perché bisogna richiamare una funzione di get in asincrono
        const abilities = ditto.abilities;
        const firstAbilityInfo = abilities[0];
        const ability = firstAbilityInfo.ability;
        const abilityUrl = ability.url;
        return this.http.get<Ability>(abilityUrl); // ...eccola qua
      })
    )
  }

  getAllPokemonWithPromise(){
    return fetch(this.ALL_POKEMON_URL)
      .then(resp => resp.json())
      .then(pokemons => {
        const results = pokemons.results;
        const fetchArray = [];
        for (const result of results){
          const request = fetch(result.url).then(resp => resp.json());
          fetchArray.push(request);
          }
          return Promise.all(fetchArray);
      })
  }

  getAllPokemonWithObservable(): Observable<Pokemon[]>{
    return this.http.get<BaseData>(this.ALL_POKEMON_URL).pipe(
      switchMap(pokemons => {
        const results = pokemons.results;
        const getArray = [];
        for (const result of results) {
          const request = this.http.get<Pokemon>(result.url);
          getArray.push(request);
        }
        return forkJoin(getArray);
      })
    )

  }



}
