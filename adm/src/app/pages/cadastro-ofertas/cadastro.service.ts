import { Injectable } from '@angular/core'
import { Oferta } from 'src/app/oferta'

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  oferta: Oferta = null
  dataSource2: Oferta[] = []

  getEditaOferta(oferta: Oferta): void {
    this.oferta = oferta
  }

  getOferta() {
    return this.oferta
  }

  getDataSource() {
    return this.dataSource2
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
