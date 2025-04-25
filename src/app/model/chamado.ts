export interface Chamado {
  id?:                any;
  dataAbertura?:      string;
  dataFechamento?:    string | null;
  prioridade:         number;
  status:             number;
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
