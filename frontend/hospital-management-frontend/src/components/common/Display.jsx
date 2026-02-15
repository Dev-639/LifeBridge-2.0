import React from 'react';
import { useParams } from 'react-router-dom';

const Display = () => {
    let params = useParams();

    return (
        <div>
            <h2>Displaying content for: {params.topic}</h2>
        </div>
    );
};

export default Display;
