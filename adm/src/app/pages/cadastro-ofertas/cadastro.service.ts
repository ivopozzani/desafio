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
    // Captura dados da memória local
    this.dataSource = JSON.parse(
      window.localStorage.getItem('ofertas-game-tracker')
    )
  }

  // Atualiza variável com a oferta a ser atualizada
  getEditaOferta(oferta: Oferta): void {
    this.oferta = oferta
  }

  // Retorna dados para popular tabela com ofertas
  getDataSource() {
    return this.dataSource
  }
}
