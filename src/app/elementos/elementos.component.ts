import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import axios from 'axios';
import { Elemento } from '../elemento';
import { Pokemon } from '../pokemon';
import Swal from 'sweetalert2';
declare var window: any;

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent implements OnInit {
  formModal: any;
  selectedOption: string = '';
  elementos: Elemento[] = [];
  pokemon: Pokemon = {nombre:'Seleccionar pokemon',imagen1:'https://w7.pngwing.com/pngs/173/464/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png',imagen2:'https://w7.pngwing.com/pngs/173/464/png-transparent-pokemon-ball-pokeball-area-wiki-technology-thumbnail.png',url:'',tipo:['Seleccione'],tamanio:0,peso:0,habilidades:[],especie:'',experencia_base:'',
  identificador:0,devolucion:'',evolucion:'',vida:0,ataque:0,defensa:0,ataque_especial:0,defensa_especial:0,velocidad:0};
  // statts
  vidaMaxima:number = 255; //Blissey
  ataqueMaximo:number = 289//Slaking 
  defensaMaxima: number = 230; //Shuckle 
  velocidadMaxima: number = 180;//Deoxys 
  //habilidad
  habilidad:string = '';
  detalleHabilidad: string = '';
  descripcionHabilidad: string = '';
  constructor(private http : HttpClient){
     
}
 
  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
    // fetch Ajax
    Swal.fire('https://pokeapi.co/api/v2/pokemon?limit=2000');
    Swal.showLoading();
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000')
    .then(response => {
      for (let i = 0; i < response.data.results.length; i++) {
        let element = response.data.results[i];
        let data:Elemento = { nombre: element.name, url: element.url};
        this.elementos.push(data);
      }
      Swal.close();
    }).catch(error => console.error(error));
  }
  
  

  onChange() {
    let peticion = `https://pokeapi.co/api/v2/pokemon/${this.selectedOption}`;
    Swal.fire(`Espere por favor solicitud a ${peticion}`);
    Swal.showLoading();
    axios.get(peticion)
    .then(response => {
      console.log(response.data);
      this.pokemon.nombre = response.data.name;
      this.pokemon.imagen1 = response.data.sprites.front_default;
      this.pokemon.imagen2 = response.data.sprites.back_default;
      this.pokemon.url = peticion;
      // this.pokemon.tipo = response.data.name; // array
      this.pokemon.tipo = [];
      for (let i = 0; i < response.data.types.length; i++) {
        console.log(response.data.types[i]);
        let element:string = response.data.types[i].type.name;
        this.pokemon.tipo.push(element);
      }
      this.pokemon.tamanio = response.data.height;
      this.pokemon.peso = response.data.weight;
      this.pokemon.habilidades = [];
      for (let i = 0; i < response.data.abilities.length; i++) {
        let element:string = response.data.abilities[i].ability.name;
        this.pokemon.habilidades.push(element);
      }
      this.pokemon.especie = response.data.name;
      this.pokemon.experencia_base = response.data.base_experience;
      this.pokemon.identificador = response.data.id;
      this.pokemon.devolucion = response.data.name;
      this.pokemon.evolucion = response.data.base_experience;

      this.pokemon.vida = response.data.stats[0].base_stat;
      this.pokemon.ataque = response.data.stats[1].base_stat;
      this.pokemon.defensa = response.data.stats[2].base_stat;
      this.pokemon.ataque_especial = response.data.stats[3].base_stat;
      this.pokemon.defensa_especial = response.data.stats[4].base_stat;
      this.pokemon.velocidad = response.data.stats[5].base_stat;

      // console.log(this.pokemon);
      // Swal.fire('¡Bien hecho!', 'El registro se ha guardado correctamente.', 'success');
      Swal.close();
    }).catch(error => console.error(error));
  }

  solicitarHabilidadPokemon(event: any){
    this.habilidad = event.target.textContent;
    let direccion = `https://pokeapi.co/api/v2/ability/${this.habilidad}/`;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    // Agregar el padding-right al cuerpo para evitar el scroll horizontal
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    Swal.fire(`Espere por favor solicitud a ${direccion}`);
    Swal.showLoading();
    axios.get(direccion)
    .then(response => {
      Swal.close();
      document.body.style.paddingRight = originalBodyPaddingRight;
      this.formModal.show();
      this.descripcionHabilidad = response.data.effect_entries[1].effect;
      this.detalleHabilidad = response.data.effect_entries[1].short_effect;
    }).catch(error => console.error(error));
  }

}
