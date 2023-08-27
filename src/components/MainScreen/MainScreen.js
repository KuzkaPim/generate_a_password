import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './MainScreen.scss';

const MainScreen = ({setPassword, password, showModal, setShowModal, onSavePassword, showSuccessfullyModal, setShowSuccessfullyModal}) => {
    const [passwordLength, setPasswordLength] = useState('');
    const [lettersUppercase, setLettersUppercase] = useState(false);
    const [lettersLowercase, setLettersLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [specialSymbol, setSpecialSymbol] = useState(false);
    const [specialWord, setSpecialWord] = useState('');
    const [areaOfUse, setAreaOfUse] = useState('');
    const [passwordEnter, setPasswordEnter] = useState(false);

    const checkPasswordLength = (e) => {
        if (Number(e.target.value)) {
            setPasswordLength(e.target.value);
        } else if (e.target.value === '') {
            setPasswordLength('');
        }
    }

    const checkWordLength = (e) => {
        if (e.target.value.length <= 15) {
            setSpecialWord(e.target.value);
        }
    }

    const generate = () => {
        if (passwordLength && passwordLength > 3 && passwordLength < 41 && (lettersLowercase || lettersUppercase || numbers || specialSymbol)) {

            const up = lettersUppercase ? ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] : [];
            const lo = lettersLowercase ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] : [];
            const nu = numbers ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [];
            const sp = specialSymbol ? ['@', '-', '_', '=', '!', '+', '&', '$', '#', '%', '*', '/', ':'] : [];

            const lettersAndNumbers = [...up, ...lo, ...nu, ...sp];
    
            let password = '';

            for (let i = 0; i < passwordLength; i++) {
                const indexArray = Math.floor(Math.random() * lettersAndNumbers.length);
                password += lettersAndNumbers[indexArray];
            }

            if (specialWord && specialWord.length <= passwordLength) {
                password = password.slice(specialWord.length);
                const indexPassword = Math.floor(Math.random() * password.length);
                const firstPart = password.slice(0, indexPassword);
                const secondPart = password.slice(indexPassword);
                password = firstPart + specialWord + secondPart;
            }

            setPassword(password);
            setPasswordEnter(true);

        } else {

            setPassword('ERROR');
            setPasswordEnter(false);

        }
    }

    const onSave = () => {
        if (passwordEnter) {
            onSavePassword(password, areaOfUse);
            setAreaOfUse('');
            setPassword('GENERATE A NEW PASSWORD');
            setPasswordEnter(false);
            setShowSuccessfullyModal(true);
        }
    }

    const duration = 300;

    return (
        <CSSTransition
            in={showModal === 'generate'}
            timeout={duration}
            classNames="main-screen"
            mountOnEnter
            unmountOnExit
        >
            <div className="main-screen__container">
                <div className='main-screen'>
                    <div onClick={() => setShowModal('')} className="main-screen__close">
                        <span></span>
                        <span></span>
                    </div>
                    <h1 className="main-screen__password">{password}</h1>
                    <input 
                        onChange={e => checkPasswordLength(e)} 
                        value={passwordLength} 
                        type="text" 
                        className={`main-screen__input ${passwordLength ? 'active' : ''}`} 
                        placeholder='LENGTH FROM 4 TO 40'/>
                    <div 
                        onClick={() => setLettersUppercase(lettersUppercase => !lettersUppercase)}
                        className={`main-screen__setting ${lettersUppercase ? 'active' : ''}`}>A</div>
                    <div 
                        onClick={() => setLettersLowercase(lettersLowercase => !lettersLowercase)}
                        className={`main-screen__setting ${lettersLowercase ? 'active' : ''}`}>a</div>
                    <div 
                        onClick={() => setNumbers(numbers => !numbers)}
                        className={`main-screen__setting ${numbers ? 'active' : ''}`}>7</div>
                    <div 
                        onClick={() => setSpecialSymbol(specialSymbol => !specialSymbol)}
                        className={`main-screen__setting ${specialSymbol ? 'active' : ''}`}>@</div>
                    <input 
                        onChange={e => checkWordLength(e)}
                        value={specialWord}
                        type="text" 
                        placeholder='WORD'
                        className={`main-screen__word ${specialWord ? 'active': ''}`} />
                    <button 
                        onClick={generate}
                        className="main-screen__button">
                            GENERATE A PASSWORD
                    </button>
                    <input 
                        onChange={e => setAreaOfUse(e.target.value)} 
                        value={areaOfUse} 
                        type="text" 
                        className={`main-screen__area-of-use ${areaOfUse ? 'active' : ''}`} 
                        placeholder='AREA OF USE'/>
                    <button 
                        onClick={showSuccessfullyModal ? null : onSave}
                        disabled={showSuccessfullyModal}
                        className="main-screen__save">
                            SAVE
                    </button>
                </div>
            </div>
        </CSSTransition>
    )
}

export default MainScreen;