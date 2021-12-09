import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Oferta } from 'src/app/oferta'
import { CadastroService } from '../cadastro-ofertas/cadastro.service'

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})

export class NossasOfertasComponent {
  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto']

  constructor(
    private cadastroservice: CadastroService,
    private router: Router
  ) {}

  // Captura dados para popular a tabela
  get dataSource() {
    return this.cadastroservice.getDataSource()
  }

  // Ativa modo de edição de oferta e navega para cadastro
  editaOferta(oferta: Oferta) {
    this.cadastroservice.atualiza = true
    this.cadastroservice.oferta = oferta
    this.router.navigate(['/cadastroofertas'])
  }
  // Ativa modo de cadastro de oferto e navega para cadastro
  addOferta() {
    this.cadastroservice.atualiza = false
    this.router.navigate(["/cadastroofertas"])
  }
}
