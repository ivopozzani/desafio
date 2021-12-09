import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Oferta } from 'src/app/oferta'
import { CadastroService } from '../cadastro-ofertas/cadastro.service'

@Component({
  selector: 'app-nossas-ofertas',
  templateUrl: './nossas-ofertas.component.html',
  styleUrls: ['./nossas-ofertas.component.scss']
})
export class NossasOfertasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'preco', 'precoDesconto']

  constructor(
    private cadastroservice: CadastroService,
    private router: Router
  ) {}

  ngOnInit() {}

  get dataSource() {
    return this.cadastroservice.getDataSource()
  }

  editaOferta(oferta: Oferta) {
    this.cadastroservice.atualiza = true
    this.cadastroservice.oferta = oferta
    this.router.navigate(['/cadastroofertas'])
  }

  addOferta() {
    this.cadastroservice.atualiza = false
    this.router.navigate(["/cadastroofertas"])
  }
}
