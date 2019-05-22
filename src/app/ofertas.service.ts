import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import para utilizar o .toPromise
import 'rxjs/add/operator/toPromise';

import { URL_API } from './app.api';

import { Oferta } from './shared/ofertas.model';

@Injectable()
export class OfertasService {

    constructor(private httpCliente: HttpClient) { }

    //posso utilizar os dois modos para indicar um array de oferta Oferta[] ou Array<Oferta>


    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisição http
        //.toPromise ira converter o observable para promise, devo importar ele em cima para utiliza-lo
        //retornar um promise de Oferta[]
        return this.httpCliente.get(`${URL_API}ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => {
                return resposta;
            }).catch((error) => {
                console.log("error", error)
            });
    }
    public getOfertaasPorCategoria(categorira: string): Promise<Oferta[]> {

        return this.httpCliente.get(`${URL_API}ofertas?categoria=${categorira}`)
            .toPromise().then((resposta: any) => {
                return resposta;
            }).catch((error) => {
                console.log(error)
            });
    }
    public getOfertasPorId(id: number): Promise<Oferta> {

        return this.httpCliente.get(`${URL_API}ofertas?id=${id}`).toPromise()
            .then((resp: any) => {
                //sifth ira retornar o primeiro valor do array tirando ele do array retornando apenas o objeto
                return resp.shift();
            });
    }
    //busca como usar a oferta
    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.httpCliente.get(`${URL_API}como-usar?id=${id}`).toPromise()
            .then((resp: any) => {
                return resp[0].descricao;
            })
    }
    //busca onde a oferta se encontra
    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.httpCliente.get(`${URL_API}onde-fica?id${id}`).toPromise()
        .then((resp:any) => {
            return resp.shift().descricao;
        })
    }
}