import React, {useState, useContext} from 'react';
import ThemeContext from './../context/ThemeContext';

const Header = () => 
{
    //Estado - Funcion que actualizara el Estado = setiando el estado inicial
    const [darkMode, setDarkMode] = useState(false);

    const color = useContext(ThemeContext);

    const handleClick = () =>{
        setDarkMode(!darkMode);
        
    }
    return (
       <div className="Header">
            <button type="button" className="btn btn-success" onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
            {/* <button type="button" onClick={() => setDarkMode(!darkMode)}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button> */}
       </div>
    );
}

export default Header;