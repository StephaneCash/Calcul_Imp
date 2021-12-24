import MenuLeft from "./MenuLeft";
import UpComponent from "./UpComponent";
import "../css/Calcul.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert"

function Calcul() {

    const [d, setD] = useState('');
    const [id, setId] = useState();
    const [ud, setUd] = useState();
    const [zd, setZd] = useState('');
    const [dj, setDj] = useState('');
    const [data, setData] = useState("one");
    const [r, setR] = useState('');
    const [zl, setZl] = useState(600.5088);
    const [x, setX] = useState('');

    let tab = {};

    let navigate = useNavigate();

    function dataComplet() {
        if (zl === 600.5088 && zd > 0 && dj > 0) {
            tab.zl = zl;
            tab.zd = zd;
            tab.dj = dj;
            console.log('Data complet : ', tab);
        }
    }

    const sauve = () => {
        dataComplet();
        axios.post(`http://localhost:8000/api/donnees/`, tab).then(res => {
            console.log(res)
            navigate('/');
            swal("Vos données ont été sauvegardées", {
                icon: "success",
            });
        }).catch(rej => {
            console.log(rej)
        })
    }


    const resetTout = () => {
        setZd('');
        setDj('');
        setId('');
        setUd('');
        setD("");
        setX('');
        setR('');
    }

    const Calculdj = () => {
        let djf = zd / 600.5088;
        setDj(djf);
    }

    let da = false;

    if (id > 1040) {
        da = true;
    }

    const calculZd = () => {

        if (id == 260 && ud == 30000) {
        } else {
            let zdf = ud / id;
            setZd(zdf);
        }
    }

    useEffect(() => {
        calculZd();
    }, [])

    return (
        <>
            <div className="col-md-12">
                <UpComponent />
            </div>
            <div className="col-md-12 d-flex">
                <div className="col-md-2">
                    <MenuLeft />
                </div>
                <div className="col-md-10" style={{ marginTop: '70px', width: '82.5%' }}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Calcul de l'impédance de Ligne</h5>
                        </div>
                        <div className="card-body">

                            <div className="form-group">
                                <label>Veuillez entrer la valeur du courant mesuré </label>
                                <input type="number" onChange={(e) => setId(e.target.value)} className="form-control mt-1"
                                    placeholder="Courant mesuré" value={id} />
                            </div>
                            <div className="form-group mt-2">
                                <label>Veuillez entrer la valeur de la tension mesurée </label>
                                <input type="number" onChange={(e) => setUd(e.target.value)} value={ud}
                                    className="form-control mt-1" placeholder="Tension mesurée" />
                            </div>

                            {
                                ud > 0 && ud < 30000 ? (<>
                                    <div className="alert alert-danger mt-3">
                                        Surtention
                                    </div>
                                    <div className="alert alert-success">
                                        Déclenchement de disjoncteur
                                    </div>
                                </>) : (<></>)
                            }

                            {
                                ud > 0 && ud > 30000 ? (<>
                                    <div className="alert alert-success">
                                        Déclenchement de disjoncteur
                                    </div>
                                </>) : (<></>)
                            }

                            {
                                id > 0 && id >= 312 && id < 1040 ? (<>
                                    <div className="alert alert-danger mt-3">
                                        Surcharge
                                    </div>
                                    <div className="alert alert-success">
                                        Coupure de fusible
                                    </div>
                                </>) : (<></>)
                            }
                            {
                                id > 0 && id > 1040 ? (<>
                                    <div className="alert alert-danger mt-3">
                                        Court-circuit
                                    </div>
                                    <div className="alert alert-success">
                                        Déclenchement de disjoncteur
                                    </div>
                                </>) : (<></>)
                            }


                            <p className="mt-2">
                                {
                                    da === true && id == parseInt(260) && ud == parseInt(30000) ? (<></>) : (<>
                                        {
                                            zd > 0 ? (<>
                                                La valeur de Zd vaut : <strong>{zd} Ohms</strong>
                                                <p>
                                                    {

                                                    }
                                                </p>
                                            </>) : ''
                                        }
                                    </>)
                                }
                                {
                                    dj > 0 ? (<>
                                        La valeur de la distance vaut : <strong> {dj} km </strong>
                                    </>) : (<></>)
                                }

                            </p>

                        </div>

                        {
                            id == parseInt(260) && ud == parseInt(30000) ? (<>
                                <div className="card-footer">
                                    <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                </div>
                            </>) : (<>
                                <div className="card-footer">
                                    {
                                        zd > 0 ? (<>
                                            <button className="btn btn-dark"
                                                onClick={sauve}>Sauverder vos données</button>
                                        </>) : (<></>)
                                    }
                                    {
                                        da === true && ud > 0 && (<>
                                            <button className="btn btn-success"
                                                style={{ float: "right" }}
                                                onClick={calculZd}>Calculer l'impédance de défaut</button>
                                        </>)
                                    }

                                </div>
                            </>)
                        }

                        {
                            id == parseInt(260) && ud == parseInt(30000) ? (<></>) : (<>
                                {
                                    zd > 0 ? (<>
                                        <div className="card-footer">
                                            <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                            <button onClick={Calculdj} className="btn btn-success" style={{ float: "right" }}>Afficher la distance </button>
                                        </div>
                                    </>) : (<></>)
                                }
                            </>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Calcul;