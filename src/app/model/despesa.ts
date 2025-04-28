export interface Despesa {
  id?:            number;
  descricao:      string;
  valor:          number;
  dataVencimento: string;
  status:         string;
}

export interface DespesaResponse{
  tecnico: Despesa[];
}
