import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/ofertas.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers: [OfertasService]
})
export class RestaurantesComponent implements OnInit {

  private ofertas: Oferta[];


  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertaasPorCategoria('restaurante').then((ofertas: Oferta[]) => {
      this.ofertas = ofertas;
    }).catch((error) => {
      console.log(error);
    });
  }

}
