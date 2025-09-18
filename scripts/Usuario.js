
class Usuario {
    constructor(nome, email, senha,id,status,data_criacao,data_modificacao) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.id = id;
        this.status = status;
        this.data_criacao = data_criacao;
        this.data_modificado = data_modificacao;
    }
}

class Jogador extends Usuario {
    constructor(id_posicao,id_time,confirmado_para_partida) {
        super();
        this.id_posicao = id_posicao;
        this.id_time = id_time;
        this.confirmado_para_partida = confirmado_para_partida;
    }
}

jogador1 = new Jogador()

