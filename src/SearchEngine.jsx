import React, { useState } from 'react';
import Result from './Result';
import axios from 'axios';

function SearchEngine() {
    const [search, setSearch] = useState('');
    const [word, setWord] = useState('');
    const [wordData, setWordData] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [wordOnAPhrase, setWordOnAPhrase] = useState([]);
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const responseWordData = await axios.get(`https://significado.herokuapp.com/${search}`);
            const responseSynonyms = await axios.get(`https://significado.herokuapp.com/synonyms/${search}`);
            const responseWordOnAPhrase = await axios.get(`https://significado.herokuapp.com/sentences/${search}`);
            setSynonyms(responseSynonyms.data);
            setWordOnAPhrase(responseWordOnAPhrase.data);
            setWordData(responseWordData.data);
            setWord(search);
        } catch (error) {
            console.log(error);
            setSynonyms([]);
            setWordData([]);
            setWordOnAPhrase([]);
            setWord(search);
        }
    }
    const handleErase = (e) => {
        e.preventDefault();
        setSearch('');
        setWord('');
        setWordData([]);
        setSynonyms([]);
        setWordOnAPhrase([]);
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };
    return <div className="SearchEngine">
        <div className="input-group mb-3">
            <input value={search} type="text" className="form-control" placeholder="Palavra" aria-label="Palavra" onChange={handleChange} onKeyDown={handleKeyPress} />
            <button className="btn btn-sm btn-outline-secondary" id="btn-pesquisar" onClick={handleSearch}>Pesquisar</button>
            <button className="btn btn-sm btn-outline-secondary" id="btn-limpar" onClick={handleErase}>Limpar</button>
        </div>
        <Result word={word} synonyms={synonyms} wordData={wordData} wordOnAPhrase={wordOnAPhrase} />
    </div>;
}

export default SearchEngine;
