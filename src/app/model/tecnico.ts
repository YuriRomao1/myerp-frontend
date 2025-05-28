export interface Tecnico {
  id?: any;
  nome?: string;
  cpf?: string;
  telefone?: string;
  endereco?: string;
  dataNascimento?: any;
  email?: string;
  senha?: string;
  perfis: string[];
  dataCriacao?: any;
}
  export interface TecnicoResponse{
    tecnico: Tecnico[];
}
