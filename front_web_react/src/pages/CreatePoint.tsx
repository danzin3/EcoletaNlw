import React, { useEffect, useState, ChangeEvent } from 'react';
import './style.css';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import api from '../services/api';
import axios from 'axios';
import {LeafletMouseEvent} from 'leaflet';


interface Item {
    id: number,
    title: string,
    image_url: string
}

interface Uf {
    id: number,
    nome: string,
    regiao: {},
    sigla: string
}

interface City {
    nome: string
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<Uf[]>([]);
    const [cities,setCities] = useState<string[]>([]);

    const [ufChecked,setUfChecked] = useState('0');
    const [cityChecked,setCityChecked] = useState('0');
    const [posChecked,setPosChecked] = useState<[number,number]>([0,0]);

    //Pegar as Imagens da Api
    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);
    //Pegar as Uniões Federativas do IBGE
    useEffect(() =>{
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            setUfs(response.data);
        });
    }, []);

    //Pegar os municípios do estado sempre que a uf for mudada pelo usuário
    useEffect(() =>{
        if(ufChecked === '0') {
            return;
        }
        axios.get<City[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufChecked}/municipios`).then(response => {
            setCities(response.data.map(item => item.nome));
        });
    },[ufChecked]);

    function handleSelectUf(event:ChangeEvent<HTMLSelectElement>){
        setUfChecked(event.target.value);
    };

    function handleSelectCity(event:ChangeEvent<HTMLSelectElement>){
        setCityChecked(event.target.value)
    };

    function handelMapClick(event:LeafletMouseEvent){
        setPosChecked([event.latlng.lat,event.latlng.lng]);
        console.log(event.latlng);
    };
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">{/** A / é para ir para a página principal */}
                    Voltar para home
                </Link>
            </header>
            <form>
                <h1>Cadastro Do Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o Endereço no Mapa</span>
                    </legend>

                    <Map center={[-18.7732195, -42.9146789]} zoom={20} onClick={handelMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={posChecked} />
                    </Map>


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select name="uf" id="uf" value={ufChecked} onChange={handleSelectUf}>
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={cityChecked} onChange={handleSelectCity}>
                                <option value="0">Selecione uma Cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Escolha um Item de Coleta</h2>
                        <span>Selecione Um ou mais Itens Abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar Ponto de Coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;