import React from "react";
import { FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "./balanco.css"

const Balanco = () => {

    return(
        <div className="balanco-container">
            <div className="dinheiro-container">
                <h5><span><FaDollarSign /></span>2.000,00R$</h5>
            </div>
            <div className="crescente-container">
                <h5><span><FaArrowUp /></span>+1.500,00</h5>
            </div>
            <div className="decrescente-container">
                <h5><span><FaArrowDown /></span>-1.200,00</h5>
            </div>
        </div>
    );

}

export default Balanco;