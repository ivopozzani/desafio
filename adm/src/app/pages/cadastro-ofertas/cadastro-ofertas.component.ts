import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms'
import { Router } from '@angular/router'
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

  constructor(
    private cadastroservice: CadastroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.cadastroservice.atualiza) {
      this.atualizaOferta()
    }
  }

  cadastroForm = new FormGroup({
    id: new FormControl(
      { value: null, disabled: this.cadastroservice.atualiza },
      [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        checkId(this.cadastroservice.dataSource)
      ]
    ),
    titulo: new FormControl(null, Validators.required),
    preco: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+\,[0-9][0-9]$/),
      biggerThan('0.00')
    ]),
    precoDesconto: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]+\,[0-9][0-9]$/),
      biggerThan('0.00'),
      isSmaller('preco')
    ]),
    lojaId: new FormControl(null, Validators.required),
    descricao: new FormControl(null)
  })

  onSubmit() {
    Object.keys(this.cadastroForm.controls).forEach(campo => {
      const controle = this.cadastroForm.get(campo)
      controle.markAsDirty()
    })

    if (this.cadastroservice.atualiza) {
      const indice: number = this.cadastroservice.dataSource.indexOf(this.cadastroservice.oferta)
      this.cadastroservice.dataSource = [...this.cadastroservice.dataSource.slice(0,indice), this.cadastroForm.value, ...this.cadastroservice.dataSource.slice(indice+1)]

      this.cadastroservice.dataSource[indice].id = this.cadastroservice.oferta.id
      this.cadastroForm.reset()
      window.alert('Cadastro Atualizado com Sucesso')
      this.router.navigate(['/nossasofertas'])
    } else {      
        this.cadastroservice.dataSource.push(this.cadastroForm.value)
        this.cadastroForm.reset()
        window.alert('Cadastro Realizado com Sucesso')
        this.router.navigate(['/nossasofertas'])
    }
  }

  atualizaOferta() {
    this.cadastroForm.patchValue({
        id: this.cadastroservice.oferta.id,
        titulo: this.cadastroservice.oferta.titulo,
        preco: this.cadastroservice.oferta.preco,
        precoDesconto: this.cadastroservice.oferta.precoDesconto,
        lojaId: this.cadastroservice.oferta.lojaId,
        descricao: this.cadastroservice.oferta.descricao
    })
  }
  
  get editaOferta() {
    return this.cadastroservice.atualiza
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

// Função que confere se uma ID já foi utilizada
export function checkId(dados: Oferta[]) {
  const validator = (formControl: FormControl) => {
    if (!formControl.root || !(<FormGroup>formControl.root).controls) {
      return null
    }

    const idField = (<FormGroup>formControl.root).get('id')

    if (!idField) {
      throw new Error('O campo "id" não foi encontrado')
    }

    let dataChecked = dados
      .map(valores => {
        if (valores.id === idField.value) {
          return true
        }
      })
      .filter(v => v === true)

    if (dataChecked.length > 0) {
      return { checkId: dados }
    }

    return null
  }

  return validator
}
