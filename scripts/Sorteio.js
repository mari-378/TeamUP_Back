class SorteioTimes {
    constructor(atletas) {
        this.atletas = atletas;
    }
sortear(numTime, numJogadoresPorTime){
        if(!this.atletas || this.atletas.length === 0) {
            console.log("Nenhum atleta cadastrado!");
            return[];
        }
        if(isNaN(numTimes) || isNaN(numJogadoresPorTime)){
            console.log("Invalido!");
            return [];
        }
}

}