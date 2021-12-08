import { Injectable } from '@angular/core'
import { Oferta } from 'src/app/oferta'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  oferta: Oferta = null
  dataSource: Oferta[] = []

  constructor() {
    this.dataSource = JSON.parse(
      window.localStorage.getItem('ofertas-game-tracker')
    )
  }

  getEditaOferta(oferta: Oferta): void {
    this.oferta = oferta
  }

  getOferta() {
    return this.oferta
  }

  getDataSource() {
    return this.dataSource
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
