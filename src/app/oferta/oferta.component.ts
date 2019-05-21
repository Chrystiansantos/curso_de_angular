import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {OfertasService} from '../ofertas.service';
import {Oferta} from '../shared/ofertas.model'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(private route: ActivatedRoute, private ofertasService:OfertasService) { }

  ngOnInit() {
    //aqui ele coleta o id que vem como parametro na url
    console.log(this.route.snapshot.params['id']);
    this.ofertasService.getOfertasPorId(this.route.snapshot.params['id']).then((resp:Oferta) => {
      this.oferta = resp;
    })
  }
}
