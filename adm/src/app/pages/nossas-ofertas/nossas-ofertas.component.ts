import { Component, OnInit } from '@angular/core'
import { Oferta } from 'src/app/oferta'
import { CadastroService } from '../cadastro-ofertas/cadastro.service'

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})
export class NossasOfertasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto']
  dataSource: Oferta[] = []

  constructor(private cadastroservice: CadastroService) {}

  ngOnInit(): void {
    this.cadastroservice.dataSource2 = JSON.parse(
      window.localStorage.getItem('ofertas-game-tracker')
    )
  }

  get dataSource2() {
    return this.cadastroservice.getDataSource()
  }

  novaOferta(oferta: Oferta) {
    this.dataSource.push(oferta)
  }

  editaOferta(oferta: Oferta) {
    this.cadastroservice.getEditaOferta(oferta)
  }

  addOferta() {
    this.cadastroservice.clearForm()
  }
}
