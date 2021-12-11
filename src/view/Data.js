import MenuLeft from "./MenuLeft";
import UpComponent from "./UpComponent";
import { Line, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Data() {

    let value = [];
    let valueDate = [];
    let zd = [];
    let dj = [];


    const [data, setData] = useState([]);

    let url = "http://localhost:8000/api/donnees/";

    const fetchData = () => {
        axios.get(`${url}`).then(res => {
            let donnees = res.data;
            setData(donnees);
        }).catch(rej => {
            console.log(rej)
        })
    }

    if (data.length > 0) {
        for (const dataObj of data) {
            value.push(parseInt(dataObj.zl));
            valueDate.push(dataObj.created_at);
            zd.push(parseInt(dataObj.zd));
            dj.push(parseInt(dataObj.dj));
        }
    }
    console.log("Data pushés :", value, data)

    useEffect(() => {
        fetchData()
    }, [])

    const data2 = {
        labels: valueDate,

        datasets: [
            {

                label: 'Impédance de Ligne ',
                data: value,
                fill: false,
                backgroundColor: 'silver',
                borderColor: 'black',
                width: "23px"
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <div>
                <UpComponent />
            </div>
            <div className="col-md-12 d-flex">
                <div className="col-md-2">
                    <MenuLeft />
                </div>
                <div className="col-md-10" style={{ marginTop: '50px' }}>
                    <p>Courbe caractéristique de l'impédance de Ligne (ZL)</p>
                    <Line
                        data={data2}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}

export default Data;