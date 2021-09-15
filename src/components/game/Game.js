import React from 'react';
import './Game.css';
import { useForm } from './../form/Form-context';
import { withRouter, useHistory } from 'react-router';
import Player from './../player/Player';
import PlayButton from './../../assets/playpng.png'
import ReloadButton from './../../assets/reload.png'

function Game() {
    const history = useHistory();
    const {
        idGame,
        userGameOne,
        userGameTwo,
        cards,
        setCards,
        setPlayerOneWin,
        setPlayerTwoWin,
        setExistWin,
        existWin
    } = useForm();

    if (!idGame) {
        history.push('/');
    }

    const getCards = () => {
        fetch(`http://deckofcardsapi.com/api/deck/${idGame['deck_id']}/draw/?count=2`)
            .then((data) => data.json())
            .then((card) => {
                const newCards = [...cards, card];
                setCards(newCards);

                const player1 = evalueteCard(newCards, 0);
                const player2 = evalueteCard(newCards, 1);
                if (player1 && player2) {
                    const pinta1 = evaluateTiePinta(player1, 0);
                    const pinta2 = evaluateTiePinta(player2, 0);

                    (pinta1 > pinta2)
                        ? setPlayerTwoWin(undefined)
                        : (pinta2 > pinta1)
                            ? setPlayerOneWin(undefined)
                            : finalTiebreaker(player1, player2);
                }
            });
    };

    const reloadGame = () => {
        setCards([]);
        setPlayerOneWin(undefined);
        setPlayerTwoWin(undefined);
        setExistWin(false);
        fetch(`http://deckofcardsapi.com/api/deck/${idGame['deck_id']}/draw/?count=2`)
            .then((data) => data.json())
            .then((card) => {
                setCards([card]);
            });
    };

    const finalTiebreaker = (player1, player2) => {
        const points1 = calculatePoints(player1, 0);
        const points2 = calculatePoints(player2, 1);

        (points1 > points2)
            ? setPlayerTwoWin(undefined)
            : setPlayerOneWin(undefined);
    };

    const calculatePoints = (player, indexPlayer) => {
        return player.reduce((acum, val) => {
            const cardPlayerCode = val['cards'][indexPlayer].code.substring(0, 1);
            const codeToVal = codeToValue(cardPlayerCode);
            return (acum + codeToVal);
        }, 0);
    };

    const codeToValue = (code) => {
        switch (code) {
            case '2':
                return 2;
            case '3':
                return 3;
            case '4':
                return 4;
            case '5':
                return 5;
            case '6':
                return 6;
            case '7':
                return 7;
            case '8':
                return 8;
            case '9':
                return 9;
            case '10':
                return 10;
            case 'J':
                return 11;
            case 'Q':
                return 12;
            case 'K':
                return 13;
            case 'A':
                return 14;
        }
    };

    const evaluateTiePinta = (player, indexPlayer) => {
        return player.filter((val) => {
            const cardPlayer = val['cards'][indexPlayer];
            return cardPlayer.code.substring(1) === 'D';
        }).length;
    };

    const evalueteCard = (cardsEva, indexPlayer) => {
        let win;
        cardsEva.forEach((card) => {
            const cardPlayer = card['cards'][indexPlayer];
            const equeals = cardsEva.filter((cardFilter) => {
                const valueCardFilter = cardFilter['cards'][indexPlayer].value;
                const typeCardFilter = cardFilter['cards'][indexPlayer].suit;
                return valueCardFilter === cardPlayer.value || typeCardFilter === cardPlayer.suit;
            });

            if (equeals.length > 1) {
                win = equeals;
                (indexPlayer === 0)
                    ? setPlayerOneWin(equeals)
                    : setPlayerTwoWin(equeals);

                setExistWin(true);
            }
        });

        return win;
    };

    return (
        <div className="content-game">
            <Player name={userGameOne} index={0} />
            <Player name={userGameTwo} index={1} />
            {
                (existWin)
                    ?
                    <div className="play-button" onClick={reloadGame}>
                        <img src={ReloadButton} />
                    </div>
                    : <div className="play-button" onClick={getCards}>
                        <img src={PlayButton} />
                    </div>
            }
        </div>
    );
}

export default withRouter(Game);