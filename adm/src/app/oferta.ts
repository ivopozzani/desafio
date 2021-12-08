export interface Oferta {
  id: number
  titulo: string
  preco: string
  precoDesconto: string
  lojaId?: number
  descricao?: string | null
}
