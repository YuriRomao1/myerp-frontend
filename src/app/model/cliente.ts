export interface Cliente {
  id?: any;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  perfis: string[];
  dataCriacao: any;
}
  export interface ClienteResponse{
    cliente: Cliente[];
}
