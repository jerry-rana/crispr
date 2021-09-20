import React, { useState } from 'react';
import crisprService from './service';

const Crispr = () => {
    const [category, setCategory] = useState('exon')

    return (
        <div className="container">
            <div className="row align-items-center border-bottom pb-3 mb-3">
                <div className="col-md-8">
                    <h4 className="fw-bold text-primary mb-0">Crispr search</h4>
                </div>
                <div className="col-md-4 text-end">
                    <select className="form-select form-select-sm" 
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="exon">Crispr Search by Exon</option>
                        <option value="pair-exon">Crispr Pair Search by Exon</option>
                        <option value="crispr-id">Find Crispr by ID</option>
                    </select>
                </div>
            </div>
            {category === 'exon' ?
                <CrisprByExon />
            :category === 'pair-exon' ?
                <CrisprPairByExon />
            :
            null
            }
            
        </div>
    )
}

const CrisprByExon = () => {
    const [selected, setSelected] = useState({ species: '', exons: '' });
    const [data, setData] = useState({ENSMUSE00000106755: []});

    const getCrispr = () => {
        if(selected.species === '' && selected.exons === ''){
            alert('Species & Exons are required!')
            return false;
        }

        crisprService.readCrispr(selected)
        .then(res => {
            if(`ENSMUSE00000106755` in res){
                setData(res);
            }else{
                setData({ENSMUSE00000106755: []});
            }
        })
        .catch(err =>  console.log(err))

    }

    const records = data.ENSMUSE00000106755;

    return (<>
        <div className="row border-bottom pb-3 mb-3">
            <div className="col-md-5">
                <select className="form-select form-select-sm"
                    value={selected.species}
                    onChange={e => setSelected({ ...selected, species: e.target.value })}
                >
                    <option value="">Select Species</option>
                    <option value="Human">Human</option>
                    <option value="Mouse">Mouse</option>
                </select>
            </div>
            <div className="col-md-5">
                <select className="form-select form-select-sm"
                    value={selected.exons}
                    onChange={e => setSelected({ ...selected, exons: e.target.value })}
                >
                    <option value="">Select Exons</option>
                    <option value="ENSMUSE00000106755">ENSMUSE00000106755</option>
                </select>
            </div>
            <div className="col-md-2">
                <label></label>
                <button className="btn btn-sm btn-primary w-100" onClick={() => getCrispr()}>Search</button>
            </div>
        </div>

        {records.length > 0 ?
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover small">
                    <thead>
                        <tr>
                            {Object.keys(records[0]).map((item, idx) => (
                                <th key={idx} className="text-uppercase">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item, idx) => (
                            <tr key={idx}>
                                {Object.keys(records[0]).map((val, idx) => (
                                    <td key={idx}>{item[val]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            :
            <p className="text-center">No records found!</p>
        }
    </>)
    
}

const CrisprPairByExon = () => {
    const [selected, setSelected] = useState({ species: '', id1: '', id2: '' });
    const [data, setData] = useState({1106710999: {}});

    const getCrispr = () => {
        if(selected.species === '' && selected.id1 === '' && selected.id2 === ''){
            alert('Species & Pair Ids are required!')
            return false;
        }

        crisprService.readCrisprPairByExon(selected)
        .then(res => {
            if(`1106710999` in res){
                setData(res);
            }else{
                setData({1106710999: {}});
            }
        })
        .catch(err =>  console.log(err))

    }

    const records = data['1106710999'];
console.log(selected)
    return (<>
        <div className="row border-bottom pb-3 mb-3">
            <div className="col-md-3">
                <select className="form-select form-select-sm"
                    value={selected.species}
                    onChange={e => setSelected({ ...selected, species: e.target.value })}
                >
                    <option value="">Select Species</option>
                    <option value="GRCh38">Human</option>
                    <option value="GRCm38">Mouse</option>
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-select form-select-sm"
                    value={selected.id1}
                    onChange={e => setSelected({ ...selected, id1: e.target.value })}
                >
                    <option value="">Select Pair Id</option>
                    <option value="1106710999">1106710999</option>
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-select form-select-sm"
                    value={selected.id2}
                    onChange={e => setSelected({ ...selected, id2: e.target.value })}
                >
                    <option value="">Select Pair Id</option>
                    <option value="1106711006">1106711006</option>
                </select>
            </div>
            <div className="col-md-3">
                <label></label>
                <button className="btn btn-sm btn-primary w-100" onClick={() => getCrispr()}>Search</button>
            </div>
        </div>

        {records.length > 0 ?
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover small">
                    <thead>
                        <tr>
                            {Object.keys(records[0]).map((item, idx) => (
                                <th key={idx} className="text-uppercase">{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((item, idx) => (
                            <tr key={idx}>
                                {Object.keys(records[0]).map((val, idx) => (
                                    <td key={idx}>{item[val]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            :
            <p className="text-center">No records found!</p>
        }
    </>)
    
}


export default Crispr;