import "../css/MenuLeft.css";
import { NavLink } from 'react-router-dom';

function MenuLeft() {
    return (
        <>
            <div className="vertical-menu">
                <NavLink to="/" className="">Accueil</NavLink>
                <NavLink to="/graphique">Calcul</NavLink>
                <NavLink to="/data">Data</NavLink>
            </div>
        </>
    )
}

export default MenuLeft;