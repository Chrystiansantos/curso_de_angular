import { PipeTransform, Pipe } from '@angular/core'

//preciso decora-la para o module saber que e um pipe e o nome seria o nome que irei usar
@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    transform(texto: string, truncarEm:number, iniciarEm:number): string {
        if (texto.length > truncarEm) {
            return texto.substr(iniciarEm, truncarEm) + '...';
        }
        return texto;
    }
}