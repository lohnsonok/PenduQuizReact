import React from 'react';
import './Party.css';

const Party = ({ party, classParty }) => (
    <div className={`${classParty}`} >
        {party === 'chargement' ? '' : <span>Vous avez {party}
        </span>}
    </div>
)

export default Party