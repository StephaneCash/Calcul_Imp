import MenuLeft from "./MenuLeft";
import UpComponent from "./UpComponent";
import "../css/Calcul.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert"

function Calcul() {

    const [d, setD] = useState('');
    const [zl, setZl] = useState('');
    const [zlca, setZlca] = useState('');
    const [id, setId] = useState('');
    const [ud, setUd] = useState('');
    const [zd, setZd] = useState('');
    const [dj, setDj] = useState('');
    const [data, setData] = useState(true);
    const [r, setR] = useState('');
    const [x, setX] = useState('');
    const [ms, setMs] = useState('');

    let tab = {};

    let distance = 3.6;

    let navigate = useNavigate();

    let verifD = false;

    function verif() {
        if (d == distance) {
            let alertD = document.querySelector('.alertDefaut');
            alertD.innerHTML = "Valeur acceptée";
            verifD = true;
            setData(true)
            return false;
        } else {
            verifD = false;
            setMs("Valeur différente de 3.6 km")
            setData(false)
        }
    }

    const ImpedanceCa = () => {
        let zca = Math.sqrt((r * r) + x * x);
        console.log("Data zla : ", zca);
        setZlca(zca)
    }

    if (zl > 0 && zl < 166.808) {
        tab.zl = zl;
        console.log("Data : ", tab);

        axios.post(`http://localhost:8000/api/donnees/`, tab).then(res => {
            navigate('/');
        }).catch(rej => {
            console.log(rej)
        })
    } else if (zl !== 420.50984170818174) {
        tab.zl = zl;
        if (zd > 0) {
            tab.zd = zd;
            if (dj > 0) {
                tab.dj = dj;
                console.log('Data complet : ', tab);

                swal({
                    title: "Voulez-vous sauvegarder ces données ?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            axios.post(`http://localhost:8000/api/donnees/`, tab).then(res => {
                                console.log(res)
                                navigate('/');
                                swal("Vos données ont été sauvegardées", {
                                    icon: "success",
                                });
                            }).catch(rej => {
                                console.log(rej)
                            })
                        } else {
                            swal("Faites vos calculs");
                        }

                    }).catch(rej => {
                        console.log(rej)
                    })
            }
        }
    }

    const Calcul = () => {
        verif();

        if (verifD === true) {
            let zlf = d * zlca;
            setZl(zlf);
        }
    }

    const resetTout = () => {
        setZl('');
        setZd('');
        setDj('');
        setId('');
        setUd('');
        setD("");
        setZlca("");
        setX('')
        setR('')
    }

    let zdk = 420.50984170818174;

    function zlSup() {
        if (zl !== zdk && zl > 0) {
            return (<p className='alert alert-danger'>
                Attention ! Fonctionnement anormal car {zl} est différente à {zdk}
            </p>)
        } else if (zl == zdk) {
            return (<p className="alert alert-success">
                Fonctionnement normal
            </p>)
        }
    }

    const Calculdj = () => {
        let djf = zd / zl;
        setDj(djf)
    }

    const calculZd = () => {

        if (id == 260 && ud == 30000) {
        } else {
            let zdf = ud / id;
            setZd(zdf);
        }
    }

    useEffect(() => {
        Calcul()
        zlSup()
        calculZd()
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
                            {
                                zl > 0 ? (<></>) : (<>
                                    <div className="form-group">
                                        <label>Veuillez entrer la valeur de la résistance en Ohms </label>
                                        <input type="number" className="form-control mt-1" onChange={(e) => setR(e.target.value)}
                                            value={r} placeholder="La valeur de la résistance " />
                                    </div>
                                    <div className="form-grou mt-3">
                                        <label>Veuillez entrer la valeur de la réactance en Ohms </label>
                                        <input type="number" className="form-control mt-1"
                                            onChange={(e) => setX(e.target.value)} value={x} placeholder="La valeur de la réactance " />
                                    </div>
                                </>)
                            }

                            {
                                zlca > 0 ? (<>
                                    <p className='mt-3'> La valeur de l'impédance caractéristique vaut : <strong> {zlca} Ohms</strong></p>
                                    <div className="form-grou mt-3">
                                        <label>Veuillez entrer la valeur de la distance   (d) </label>
                                        <input type="number" className="form-control mt-1"
                                            onChange={(e) => setD(e.target.value)} value={d}
                                            placeholder="Entrer la distance" />
                                        <p style={{ color: 'green' }} className='alertDefaut'></p>
                                        <p style={{ color:"red"}}>{ms !== '' ? (<>
                                            {
                                                data == true  ? (<></>) : (<>{ms}</>)
                                            }</>) : (<></>)}</p>
                                    </div>
                                </>) : (<></>)
                            }

                            <p className="mt-3">
                                {
                                    zl > 0 ? (<p>
                                        La valeur de l'impédance de Ligne (ZL) vaut : <strong> {zl}  Ohms</strong>
                                    </p>) : ''
                                }

                                {
                                    zlSup()
                                }
                            </p>

                            {
                                zl !== '420.50984170818174' && zl > 0 ? (<>
                                    {
                                        (id > 0 && ud > 0) && (id == 260 && ud == 30000) ? <p className='alert alert-success ad'>Fonctionnement normal</p> : ''
                                    }

                                    {
                                        zl == '420.50984170818174' ? (<>

                                        </>) : (<>
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
                                        </>)
                                    }

                                    <p className="mt-2">
                                        {
                                            zd > 0 ? (<>
                                                <p className='alert alert-info'> Déclenchement de disjoncteur</p>
                                                La valeur de Zd vaut : <strong>{zd} Ohms</strong>
                                            </>) : ''
                                        }
                                    </p>
                                </>) : ""
                            }
                            {
                                dj > 0 ? (<>
                                    La valeur de la distance vaut : <strong> {dj} km </strong>
                                </>) : (<></>)
                            }

                        </div>
                        {
                            zl !== '420.50984170818174' && zl > 0 ? (<>
                                {
                                    zd > 0 ? (<>
                                        <div className="card-footer">
                                            <button onClick={Calculdj} className="btn btn-success" style={{ float: "right" }}>Afficher la distance </button>
                                            <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>

                                        </div>
                                    </>) : (<>
                                        {
                                            id == 260 && ud == 30000 ? (<>
                                                <div className="card-footer">
                                                    <button style={{ float: 'right' }} onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                                </div>
                                            </>) : (<>
                                                {
                                                    zl == '420.50984170818174' ? (<>
                                                        <div className="card-footer">
                                                            <button style={{ float: 'right' }} onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                                        </div>
                                                    </>) : (<>
                                                        <div className="card-footer">
                                                            <button className="btn btn-success"
                                                                style={{ float: "right" }}
                                                                onClick={calculZd}>Calculer l'impédance de défaut</button>
                                                        </div>
                                                    </>)
                                                }

                                            </>)
                                        }
                                    </>)
                                }
                            </>) : (<>
                                {
                                    zlca > 0 && d !== "" ? (<>
                                        <div className="card-footer">
                                            <button onClick={Calcul} className="btn btn-success" style={{ float: "right" }}>Calculer l'impédance de Ligne
                                            </button>
                                            <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                        </div>
                                    </>) : ""
                                }
                            </>)
                        }
                        {
                            zlca > 0 ? (<></>) : (<>
                                <div className="card-footer">
                                    <button onClick={ImpedanceCa} style={{ float: 'right' }} className="btn btn-success ">Calculer l'impédance caractéristique</button>
                                </div>
                            </>)
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
export default Calcul;