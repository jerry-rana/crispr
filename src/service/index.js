const API_URL = 'https://wge.stemcell.sanger.ac.uk/api/';

class CrisprService{
    
    async readCrispr(data){
        return await fetch(`${API_URL}crispr_search/?species=${data.species}&exon_id%5B%5D=${data.exons}`)
        .then(res => res.json())
    }

    async readCrisprPairByExon(data){
        return await fetch(`${API_URL}crispr_by_id?id=${data.id1}&id=${data.id2}&species=${data.species}`)
        .then(res => res.json())
    }

}

export default new CrisprService();