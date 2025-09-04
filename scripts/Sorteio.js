class SorteioTimes {
    constructor(atletas) {
        this.atletas = atletas; 
    }

    sortear(numTimes, numJogadoresPorTime) {
        if (!this.atletas || this.atletas.length === 0) {
            console.log("Nenhum atleta cadastrado!");
            return [];
        }

        if (isNaN(numTimes) || isNaN(numJogadoresPorTime)) {
            console.log("inválido");
            return [];
        }

        const atletasEmbaralhados = [...this.atletas].sort(() => Math.random() - 0.5);

       
        const times = Array.from({ length: numTimes }, () => []);

       
        let indiceTime = 0;
        for (let atleta of atletasEmbaralhados) {
            times[indiceTime].push(atleta);
            indiceTime = (indiceTime + 1) % numTimes;
        }

        for (let i = 0; i < times.length; i++) {
            if (times[i].length > numJogadoresPorTime) {
                times[i] = times[i].slice(0, numJogadoresPorTime);
            }
        }

        return times;
    }
    
    }

module.exports = SorteioTimes;
