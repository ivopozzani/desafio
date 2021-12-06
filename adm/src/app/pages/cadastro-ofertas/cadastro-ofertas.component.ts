import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { Oferta } from 'src/app/oferta'

import { CadastroService } from './cadastro.service'

@Component({
  selector: 'app-cadastro-ofertas',
  templateUrl: './cadastro-ofertas.component.html',
  styleUrls: ['./cadastro-ofertas.component.scss']
})
export class CadastroOfertasComponent implements OnInit {
  lojas = [
    { id: 1, nome: 'Epic' },
    { id: 2, nome: 'Origin' },
    { id: 3, nome: 'Steam' }
  ]

  cadastroForm = new FormGroup({
    id: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]),
    titulo: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    precoDesconto: new FormControl('', Validators.required)
  })

  constructor(private cadastroservice: CadastroService) {}

  ngOnInit(): void {}

  novaOferta() {
    this.cadastroservice.dataSource2.push(this.cadastroForm.value)
    console.log(this.cadastroservice.dataSource2)
  }

  get editaOferta() {
    return this.cadastroservice.getOferta()
  }
}
