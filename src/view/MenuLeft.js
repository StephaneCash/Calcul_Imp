import "../css/MenuLeft.css";
import { NavLink } from 'react-router-dom';
import "../../node_modules/font-awesome/css/font-awesome.css";

function MenuLeft() {
    return (
        <>
            <div className="vertical-menu">
                <NavLink to="/" className=""> <i className="fa fa-home"></i> Accueil</NavLink>
                <NavLink to="/graphique"><i className="fa fa-calculator"></i> Calcul</NavLink>
                <NavLink to="/data"> <i className="fa fa-bar-chart"></i> Courbe </NavLink>
            </div>
        </>
    )
}

export default MenuLeft;