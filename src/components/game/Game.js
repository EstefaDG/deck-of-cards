import React from 'react';
import './Game.css';
import { useForm } from './../form/Form-context';
import { withRouter, useHistory } from 'react-router';
import Player from './../player/Player';
import PlayButton from './../../assets/playpng.png'

function Game() {
    const history = useHistory();
    const { idGame, userGameOne, userGameTwo, cards, setCards } = useForm();

    if (!idGame) {
        history.push('/');
    }

    const evaluateCard = () => {
        fetch(`http://deckofcardsapi.com/api/deck/${idGame['deck_id']}/draw/?count=2`)
            .then((data) => data.json())
            .then((card) => {
                console.log(card);
                setCards([...cards, card]);
            });
    };

    return (
        <div className="content-game">
            <Player name={userGameOne} index={0} />
            <Player name={userGameTwo} index={1} />
            <div className="play-button" onClick={evaluateCard}>
                <img src={PlayButton} />
            </div>
        </div>
    );
}

export default withRouter(Game);