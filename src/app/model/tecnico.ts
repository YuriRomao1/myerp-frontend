export interface Tecnico{
    id?: any;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    perfil: string[];
    dataCriacao: any;
    acoes: string;
  }

  export interface TecnicoResponse{
    tecnico: Tecnico[];
}
