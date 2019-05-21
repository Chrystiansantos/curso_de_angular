import { Component, OnInit } from '@angular/core';
//onde inserir as ofertas
import { OfertasService } from '../ofertas.service';
//modelo de oferta
import { Oferta } from '../shared/ofertas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //aqui dentro irei passar as classes de serviço
  providers: [OfertasService]
})

export class HomeComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) {

  }

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas();
    //trabalhando com a promessa
    //aqui declarei uma variavel com nome de ofertas tipando ela como um array de oferta
    this.ofertasService.getOfertas().then((ofertas: Oferta[]) => {
      this.ofertas = ofertas;
    }).catch((error: any) => {
      console.log(error.codigo_erro, error.mensagem_erro)
    })
  }

}
