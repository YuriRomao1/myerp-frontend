export interface Despesa {
  id?:               any;
  descricao:      string;
  valor:          number;
  dataVencimento: string;
  status:         string;
}

export interface DespesaResponse{
  tecnico: Despesa[];
}
