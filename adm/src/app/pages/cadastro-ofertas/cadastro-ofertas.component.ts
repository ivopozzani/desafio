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

  constructor(private cadastroservice: CadastroService) {}

  ngOnInit() {}

  cadastroForm = new FormGroup({
    id: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ]),
    titulo: new FormControl(null, Validators.required),
    preco: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+\.[0-9][0-9]$/),
      biggerThan('0.00')
    ]),
    precoDesconto: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+\.[0-9][0-9]$/),
      biggerThan('0.00'),
      isSmaller('preco')
    ])
  })

  onSubmit() {
    console.log(this.cadastroForm)
    //this.cadastroservice.dataSource2.push(this.cadastroForm.value)
    //this.cadastroForm.reset()
  }

  get editaOferta() {
    return this.cadastroservice.getOferta()
  }
}

// Função que valida o preço maior que zero
export function biggerThan(preco: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (parseFloat(control.value) <= parseFloat(preco)) {
      return { biggerThan: { value: control.value } }
    } else {
      return null
    }
  }
}

// Função que valida o preçoDesconto menor que o preço normal
export function isSmaller(preco: string) {
  const validator = (formControl: FormControl) => {
    if (preco == null) {
      throw new Error('É necessário informar o preço')
    }

    if (!formControl.root || !(<FormGroup>formControl.root).controls) {
      return null
    }

    const field = (<FormGroup>formControl.root).get(preco)

    if (!field) {
      throw new Error('É necessário informar um campo de formulário válido')
    }

    if (parseFloat(field.value) <= parseFloat(formControl.value)) {
      return { isSmaller: preco }
    }

    return null
  }
  return validator
}
