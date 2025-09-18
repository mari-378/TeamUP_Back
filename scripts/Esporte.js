class Esporte {
    constructor(id_esporte,nome_esporte,regras,data_atualizazao) {
        this.id_esporte = id_esporte;
        this.nome_esporte = nome_esporte;
        this.regras = regras;
        this.data_atualizacao = data_atualizacao;
    }
}
volei_de_quadra = new Esporte();
volei_de_quadra.id_esporte = 'VQ';
volei_de_quadra.nome_esporte = 'Volei de Quadra'
volei_de_quadra.regras = 'Regras aqui!'
volei_de_quadra.data_atualizacao ='Janeiro de 2025';