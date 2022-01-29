import React from 'react';

function Result(props) {
    const { word, synonyms, wordData } = props;
    const renderWordData = (data) => {
        if (data.length > 0) {
            return <div className="Result-data me-2">
                {data.map((item, index) => {
                    return <div key={index}>
                        <h6><i>{item.class}</i></h6>
                        {item.meanings.map((meaning) => {
                            return <p className='fs-6' key={meaning}>{meaning}</p>
                        })}
                    </div>
                })}
            </div>
        }
        return <div>
            Não temos nenhum resultado para "{word}".
        </div>
    };
    const renderSynonyms = (synonyms) => {
        if (synonyms.length > 0) {
            return <div className="Result-synonyms">
                <h4>Sinônimos de <i>{word}</i></h4>
                <ul>
                    {synonyms.map((synonym) => {
                        return <li key={synonym}>
                            {synonym}
                        </li>
                    })}
                </ul>
            </div>
        };
        return <div>
            Não temos sinônimos para "{word}".
        </div>
    };
    return <div>
        {!word ? null :
            <div className="Result">
                <h2>{word}</h2>
                <div className="Result-content">
                    {renderWordData(wordData)}
                    {renderSynonyms(synonyms)}
                </div>
            </div>}
    </div>;
}

export default Result;
