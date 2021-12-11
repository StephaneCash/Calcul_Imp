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
    const [data, setData] = useState([]);

    let tab = {};

    let navigate = useNavigate();

    function verif() {
        if (d === '0') {
            alert('La distance ne peut être nulle')
            return false;
        }
    }

    if (zl > 0 && zl < 166.808) {
        tab.zl = zl;
        console.log("Data : ", tab);

        axios.post(`http://localhost:8000/api/donnees/`, tab).then(res => {
            navigate('/');
        }).catch(rej => {
            console.log(rej)
        })
    } else if (zl > 166.808) {
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
                            }).catch(rej=>{
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
        let zlf = d * zlca;
        setZl(zlf);
    }

    const resetTout = () => {
        setZl('');
        setZd('')
        setDj('')
        setId('')
        setUd('')
        setD("")
        setZlca("")
    }

    let zdk = 166.808;

    function zlSup() {
        if (zl > zdk) {
            return (<p className='alert alert-danger'>
                Attention ! Fonctionnement anormal car {zl} est supérieur à {zdk}
            </p>)
        } else if (zl > 0 && zl < zdk) {
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
        let zdf = ud / id;
        setZd(zdf);
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
                <div className="col-md-10" style={{ marginTop: '50px', width: '82.5%' }}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Calcul de l'impédance de Ligne</h5>
                        </div>
                        <div className="card-body">
                            {
                                zd > 0 ? (<>

                                </>) : (<>
                                    <div className="form-group">
                                        <label>Veuillez entrer la valeur de l'impédance caractéristique en Ohms (ZLca) </label>
                                        <input type="number" className="form-control mt-1" onChange={(e) => setZlca(e.target.value)}
                                            value={zlca} placeholder="Impédance caractéristique" />
                                    </div>
                                    <div className="form-grou mt-3">
                                        <label>Veuillez entrer la valeur de la distance   (d) </label>
                                        <input type="number" className="form-control mt-1" onChange={(e) => setD(e.target.value)} value={d} placeholder="Impédance caractéristique" />
                                    </div>
                                </>)
                            }

                            <p className="mt-3">
                                {
                                    zl > 166.808 ? (<p>
                                        La valeur de l'impédance de Ligne (ZL) vaut : <strong> {zl}  Ohms</strong>
                                    </p>) : ''
                                }

                                {
                                    zlSup()
                                }
                            </p>

                            {
                                zl > 166.808 ? (<>
                                    <div className="form-group">
                                        <label>Veuillez entrer la valeur du courant de défaut (Id)</label>
                                        <input type="number" onChange={(e) => setId(e.target.value)} className="form-control mt-1"
                                            placeholder="La valeur de In (Courant de défaut)" value={id} />
                                        {
                                            zd > 0 ? (<>
                                                {
                                                    id > 312 && id < 1040 ? (<p style={{ color: "red" }}>
                                                        Il s'agit de surcharge comme cause principale car {id} est sup à 312 A
                                                    </p>) : ""
                                                }
                                                {
                                                    id > 1040 ? (<p style={{ color: "red" }}>
                                                        Il s'agit de court-circuit comme cause principale car {id} est sup à 1040 A
                                                    </p>) : ""
                                                }
                                            </>) : ""
                                        }

                                    </div>
                                    <div className="form-group mt-2">
                                        <label>Veuillez entrer la valeur de tension de défaut (Ud) </label>
                                        <input type="number" onChange={(e) => setUd(e.target.value)} value={ud}
                                            className="form-control mt-1" placeholder="La valeur de Ud (Tension de défaut)" />
                                    </div>
                                    <p className="mt-2">
                                        {
                                            zd > 0 ? (<>
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
                            zl > 166.808 ? (<>
                                {
                                    zd > 0 ? (<>
                                        <div className="card-footer">
                                            <button onClick={Calculdj} className="btn btn-success" style={{ float: "right" }}>Afficher la distance dj</button>
                                            <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>

                                            <button className="btn btn-success" style={{ marginLeft: '10px' }} onClick={calculZd}>Calculer Zd</button>

                                        </div>
                                    </>) : (<>
                                        <div className="card-footer">
                                            <button className="btn btn-success" style={{ float: "right" }} onClick={calculZd}>Calculer Zd</button>
                                        </div>
                                    </>)
                                }
                            </>) : (<>
                                {
                                    zlca > 0 && d !== "" ? (<>
                                        <div className="card-footer">
                                            <button onClick={Calcul} className="btn btn-success" style={{ float: "right" }}>Calculer ZL</button>
                                            <button onClick={resetTout} className="btn btn-dark ">Réinitialiser</button>
                                        </div>
                                    </>) : ""
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