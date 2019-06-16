import { PedidoModel } from './shared/pedido.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';
import { map } from 'rxjs/operators/map';

@Injectable()
export class OrdemCompraService {

    constructor(private httpCliente: HttpClient) { }

    public efetivarCompra(pedido: PedidoModel): Observable<number> {
        let headers = new HttpHeaders({
            //Content-type => instruçao para api saber oq ha no conteudo do request
            'Content-Type': 'application/json',
        });
        let options = {
            headers
        }
        //o metodo post espera 3 parametros post(url de onde enviara os dados,body conteudo que vai ir na requisiçao,argumetos opcionais de uma requisiçao)
        return this.httpCliente.post(
            `${URL_API}pedidos`,
            //conteudo da requisiçao body, suporta apenas string entao tenho que converter para string
            JSON.stringify(pedido),
            //cabeçalho da requisiçao
            options
        ).pipe(
            //map ira recuperar o response da requisiçao vindo da api
            map((resposta: any) => {
                return resposta.id;
            })
        )
    }
}