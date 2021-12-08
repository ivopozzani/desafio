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

  constructor(private cadastroservice: CadastroService) {}

  ngOnInit() {}

  get dataSource() {
    return this.cadastroservice.getDataSource()
  }

  editaOferta(oferta: Oferta) {
    this.cadastroservice.getEditaOferta(oferta)
  }

  addOferta() {
    this.cadastroservice.clearForm()
  }
}
