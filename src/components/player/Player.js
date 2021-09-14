import React from 'react';
import './Player.css';
import { useForm } from './../form/Form-context';
import Block from './../../assets/block.png';

function Player(props) {
    const name = props.name;
    const index = props.index;
    const { cards } = useForm();

    return (
        <div className="container-game">
            <div className="container-player">
                <h4 className="name-title">{name}</h4>
            </div>

            <h3 className="name-title">Cartas Opcionadas</h3>
            <div className="contente-optional">
                <div className="content-card" key="optional-1">
                    <img className="card-image" src={Block} />
                </div>
                <div className="content-card" key="optional-2">
                    <img className="card-image" src={Block} />
                </div>
            </div>

            <div className="container-cards">
                <h3 className="name-title">Cartas Obtenidas</h3>
                {
                    cards.map((card, i) => {
                        const cardPlayer = card['cards'][index];
                        return (
                            <div className="content-card" key={i}>
                                <img className="card-image" src={cardPlayer.image} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Player;