import React, {useState} from 'react'
import MenuJson from './json/cat-menu.json'
import {FaReact} from 'react-icons/fa'
import {HiMenu} from 'react-icons/hi';
import BigMenu from './components/BigMenu/BigMenu';

const App = () => {

    const [menuOpened, setMenuOpened] = useState(false);

    return <>
        <header className='row bg-primary bg-gradient text-white py-4'>
            <div className='col d-flex align-items-center'>
                <button
                    className='btn text-white m-0'
                    onClick={() => setMenuOpened(!menuOpened)}
                >
                    <HiMenu style={ { fontSize: '2em' } } />
                </button>
                <span style={ { fontSize: '1.5em', fontWeight: 'bold' } }>
                    <FaReact style={ { fontSize: '1.5em' } } /> BigMenu
                </span>
            </div>
        </header>
        <div></div>
        <BigMenu dataProvider={MenuJson.menu} isOpen={menuOpened} setIsOpen={setMenuOpened} />
    </>
}

export default App