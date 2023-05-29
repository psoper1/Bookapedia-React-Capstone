import React from 'react'
import { useGlobalState } from '../../context/GlobalState'
import { Link } from 'react-router-dom';

function Categories() {
    const [state] = useGlobalState();
    let categoriesList = state?.bisacList;
    return (
        <ul>
            {categoriesList.map(category => (<li key={category}><Link to={`${category}`}>{category}</Link></li>))}
        </ul>
    )
}

export default Categories