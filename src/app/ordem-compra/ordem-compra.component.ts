import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service';
import { PedidoModel } from '../shared/pedido.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  ngOnInit() {

  }
  public dadosInvalidos: string;
  public idPedido: number;

  @ViewChild('formulario') public formulario: NgForm;

  constructor(private ordemCompra: OrdemCompraService) { }

  public confirmarCompra(): void {
    let pedido: PedidoModel = new PedidoModel(this.formulario.value.endereco,
      this.formulario.value.complemento, this.formulario.value.complemento, this.formulario.value.formaPagamento);
    if (this.formulario.valid) {
      this.ordemCompra.efetivarCompra(pedido).subscribe((idPedido: number) => {
        console.log('Pedido cadastrado com sucesso ! ID do Pedido:', idPedido);
        this.idPedido = idPedido;
      })
    } else {
      this.dadosInvalidos = 'Favor informe dos dados corretamente !'
      setTimeout(() => {
        this.dadosInvalidos = '';
      }, 5000);
    }
  }
}