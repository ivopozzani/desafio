import { Injectable } from '@angular/core'
import { Oferta } from 'src/app/oferta'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  oferta: Oferta | null = null

  getEditaOferta(oferta: Oferta): void {
    this.oferta = oferta
  }

  getOferta() {
    return this.oferta
  }

  clearForm() {
    this.oferta = {
      id: 0,
      titulo: '',
      preco: '',
      precoDesconto: ''
    }
  }
}
