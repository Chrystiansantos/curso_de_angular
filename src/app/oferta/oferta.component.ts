import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/ofertas.model'


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(private activatedRoute: ActivatedRoute, private ofertasService: OfertasService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((parametros: Params) => {
      //aqui ele coleta o id que vem como parametro na url
      this.ofertasService.getOfertasPorId(parametros.id).then((resp: Oferta) => {
        this.oferta = resp;
        //console.log(this.oferta)
      })
    })
  }

  ngOnDestroy() {
  }
}
