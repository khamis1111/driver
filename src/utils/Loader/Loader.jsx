import React from 'react'
import './Loader.css'

const Loader = ({ name }) => {
    return (
        <div className="loader">
            <div data-glitch={name} className="glitch fs-1">{name}</div>
        </div>
    )
}

export default Loader
