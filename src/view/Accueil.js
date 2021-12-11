import MenuLeft from "./MenuLeft";
import UpComponent from "./UpComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../node_modules/font-awesome/css/font-awesome.css";
import swal from "sweetalert"

function Accueil() {

    let url = "http://localhost:8000/api/donnees/";

    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get(`${url}`).then(res => {
            let donnees = res.data;
            setData(donnees);
        }).catch(rej => {
            console.log(rej)
        })
    }

    const deleteData = (e, id) => {
        e.preventDefault();
        const thisChild = e.currentTarget;
        thisChild.innerText = "Suppression";
        swal({
            title: "Etes-vous sûr?",
            text: "Une fois supprimé, vous ne pourrez plus récupérer ces données !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://localhost:8000/api/donnees/${id}`).then(res => {
                        thisChild.closest('tr').remove();
                        swal("Vos donnés ont été bien supprimées", {
                            icon: "success",
                        });
                    }).catch(rej=>{
                        console.log(rej)
                    })
                } else {
                    thisChild.innerHTML = 'Supprimer';
                    swal("Vos données ne sont pas supprimées");
                }
            });
    }

    useEffect(() => {
        fetchData()
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
                <div className="col-md-10 menu" style={{ marginTop: '50px' }}>
                    <p>
                        Données stoquées
                    </p>
                    <table className="table table-borderless table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Impédance de Ligne (ZL)</th>
                                <th>Impédance de défaut (Zd)</th>
                                <th>Distance de défaut (dj)</th>
                                <th>Date de calcul</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? (<>
                                    {
                                        data.map((val) => {
                                            return (<>
                                                <tr key={val.id}>
                                                    <td>{val.id}</td>
                                                    <td>{val.zl}</td>
                                                    <td>{Number(val.zd).toFixed(5)}</td>
                                                    <td>{Number(val.dj).toFixed(5)}</td>
                                                    <td>{val.created_at}</td>
                                                    <td>
                                                        <button type="button" className="btn btn"
                                                            style={{border:"2px solid silver"}}
                                                            onClick={(e) => deleteData(e, val.id)}>  Supprimer
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>)
                                        })
                                    }
                                </>) : (<>
                                    <tr style={{textAlign:'center', height:"45px"}}>
                                        <td colSpan='6px'>
                                            <i className="fa fa-refresh fa-spin fa-2x"></i>
                                        </td>
                                    </tr>
                                </>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Accueil;