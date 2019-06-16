import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { Oferta } from '../shared/ofertas.model';
//dessa forma consigo organizar todos os scripts em um arquivo
import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(1000) // executa a operação apos 1s
      .switchMap((termo: string) => {
        if (termo.trim() === '') {
          return Observable.of<Oferta[]>([]);
        } else {
          return this.ofertasService.pesquisaOfertas(termo);
        }
      }).catch((error) => {
        console.log(error);
        return Observable.of<Oferta[]>([]);
      })
  }

  public pesquisa(termoDaBusca: string): void {
    /*  this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
     this.ofertas.subscribe((ofertas: Oferta[]) => {
       console.log(ofertas);
     }, (erro: any) => {
       console.error("Error status:", erro.status);
     },
       () => {
         console.log('Fluxo de eventos completo')
       }) */
    //--------------------------------------------------------------------
    this.subjectPesquisa.next(termoDaBusca);
  }
  public limpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }
}