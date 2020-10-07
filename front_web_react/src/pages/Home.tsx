import React from 'react';
import logo from '../assets/logo.svg';
import './style.css';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"></img>
                </header>
                <main>
                    <h1>Seu marketplace de Coleta de Resíduos</h1>
                    <p>Ajudamos as pessoas a encontrarem pontos de coleta de forma eficiente</p>
                    <Link to="/create-point">
                        <span>
                            <FiArrowRight />
                        </span>
                        <strong>Cadastre Um Ponto De Coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;