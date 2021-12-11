import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Accueil from '../view/Accueil';
import Calcul from '../view/Calcul';
import Data from '../view/Data';

const RoutesComponent = () =>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/graphique" element={<Calcul />} />
                <Route path="/data" element={<Data />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesComponent;