import './Form.css';
import React from 'react';
import { useForm } from './Form-context';
import { withRouter, useHistory } from 'react-router';

function Form() {
    
    const history = useHistory();
    const {
        userGameOne,
        userGameTwo,
        setUserGameOne,
        setUserGameTwo,
        formValid,
        formTouched,
        play
    } = useForm();

    return (
        <div className="container-form">
            {
                (!formValid && formTouched)
                    ? <h4 className="error">Debe ingresar los nombres de los jugadores</h4>
                    : null
            }
            <div>
                <label>Jugador #1</label>
                <input name="userGameOne" type="text" value={userGameOne} onChange={e => setUserGameOne(e.target.value)} />
            </div>
            <div>
                <label>Jugador #2</label>
                <input name="userGameTwo" type="text" value={userGameTwo} onChange={e => setUserGameTwo(e.target.value)} />
            </div>

            <div className="btn-container">
                <button className="btn" onClick={play.bind(this, history)}>Ingresar</button>
            </div>
        </div>
    );
}

export default withRouter(Form);