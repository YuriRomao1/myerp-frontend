export interface ChamadoEmpresa {
  id?:                  any;
  dataAbertura?:      string;
  dataFechamento?:    string | null;
  dataVisita?:        string;
  prioridade:         string;
  status:             string;
  titulo:             string;
  observacoes:        string;
  tecnicoId:          any;
  empresaId:          any;
  valor:              number;
  nomeTecnico?:       string;
  nomeEmpresa?:       string;
}
