export interface Chamado {
  id?:                any;
  dataAbertura?:      string;
  dataFechamento?:    string | null;
  prioridade:         string;
  status:             string;
  titulo:             string;
  observacoes:        string;
  tecnico:            any;
  cliente:            any;
  nomeCliente:        string;
  nomeTecnico:        string;
  valor?:             number;
}

export interface ChamadoResponse{
  chamado: Chamado[];
}
