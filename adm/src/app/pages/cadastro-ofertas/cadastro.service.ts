import { Injectable } from '@angular/core'
import { Oferta } from 'src/app/oferta'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  oferta: Oferta
  atualiza: boolean = false
  dataSource: Oferta[] = []

  constructor() {
    this.dataSource = JSON.parse(
      window.localStorage.getItem('ofertas-game-tracker')
    )
  }

  getEditaOferta(oferta: Oferta): void {
    this.oferta = oferta
  }

  getDataSource() {
    return this.dataSource
  }
}
