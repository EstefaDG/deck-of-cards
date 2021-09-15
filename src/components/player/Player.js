import React from 'react';
import './Player.css';
import { useForm } from './../form/Form-context';
import Block from './../../assets/block.png';
import Win from './../../assets/check-win.png';
import Loser from './../../assets/check_no.png';

function Player(props) {
    const name = props.name;
    const index = props.index;
    const { cards, existWin, playerOneWin, playerTwoWin } = useForm();
    const isPlayerWin = (index === 0)
        ? (playerOneWin !== undefined)
        : (playerTwoWin !== undefined);

    const getCardOptional = (optionalIndex) => {
        if (isPlayerWin) {
            return (index === 0)
                ? playerOneWin[optionalIndex]['cards'][index].image
                : playerTwoWin[optionalIndex]['cards'][index].image;
        }
        return Block;
    };

    return (
        <div className="container-game">
            <div className="container-player">
                <h4 className="name-title">
                    {name}
                    {
                        (existWin)
                            ? (
                                (isPlayerWin)
                                    ? <img src={Win} className="icon" />
                                    : <img src={Loser} className="icon" />
                            )
                            : null
                    }
                </h4>
            </div>

            <h3 className="name-title">Cartas Opcionadas</h3>
            <div className="contente-optional">
                <div className="content-card" key="optional-1">
                    <img className="card-image" src={getCardOptional(0)} />
                </div>
                <div className="content-card" key="optional-2">
                    <img className="card-image" src={getCardOptional(1)} />
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