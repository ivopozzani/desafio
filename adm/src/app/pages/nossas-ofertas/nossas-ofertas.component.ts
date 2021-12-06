import { DataSource } from '@angular/cdk/collections'
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
  dataSource: {}[] = []

  constructor(public cadastroservice: CadastroService) {}

  ngOnInit(): void {
    this.dataSource = JSON.parse(
      window.localStorage.getItem('ofertas-game-tracker')
    )
  }

  editaOferta(oferta: Oferta): void {
    this.cadastroservice.getEditaOferta(oferta)
  }

  addOferta() {
    this.cadastroservice.clearForm()
  }
}
