import React, { useState, useMemo } from 'react';

const FormContext = React.createContext();

export function FormProvider(props) {

    const [userGameOne, setUserGameOne] = useState();
    const [userGameTwo, setUserGameTwo] = useState();

    const [formValid, setFormValid] = useState(false);
    const [formTouched, setFormTouched] = useState(false);

    const [isLoadingData, setIsLoadinData] = useState(false);
    const [idGame, setIdGame] = useState(undefined);

    const [cards, setCards] = useState([]);

    const play = (history) => {
        if (userGameOne && userGameTwo) {
            setFormValid(true);
            setFormTouched(true);
            setIsLoadinData(true);

            fetch('http://deckofcardsapi.com/api/deck/new/')
                .then((data) => data.json())
                .then((data) => {
                    setIsLoadinData(false);
                    setIdGame(data);
                    return fetch(`http://deckofcardsapi.com/api/deck/${data['deck_id']}/draw/?count=2`);
                })
                .then((data) => data.json())
                .then((card) => {
                    setCards([...cards, card]);
                    history.push('/game');
                });

            return;
        }

        setFormValid(false);
        setFormTouched(true);
    };

    const value = useMemo(() => {
        return ({
            userGameOne,
            userGameTwo,
            setUserGameOne,
            setUserGameTwo,
            formValid,
            formTouched,
            isLoadingData,
            idGame,
            cards,
            setCards,
            play
        });
    }, [userGameOne, userGameTwo, formValid, formTouched, isLoadingData, idGame, cards]);

    return <FormContext.Provider value={value} {...props} />
}

export function useForm() {
    const context = React.useContext(FormContext);
    if (!context) {
        throw new Error('Context Form no found.');
    }
    return context;
}