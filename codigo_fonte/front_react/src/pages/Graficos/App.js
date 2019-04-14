import React, { Component } from 'react';
import './App.css'
import axios from 'axios'
import auth from '../../config/auth/index'
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Area, Bar, Line, AreaChart } from 'recharts';

// ------- GRAFICO ---------
const dataTrending = [{
    name: "nome da rua", media: 2000, valorAtual: 1900
},
{
    name: "nome da rua", media: 2000, valorAtual: 1900
},
{
    name: "nome da rua", media: 2000, valorAtual: 1900
},
{
    name: "nome da rua", media: 2000, valorAtual: 1900
},
{
    name: "nome da rua", media: 2000, valorAtual: 1900
},
{
    name: "nome da rua", media: 2000, valorAtual: 1900
},

];

const dataSemana = [
    {
        "name": "Domingo",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Segunda",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Terça",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Quarta",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Quinta",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Sexta",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Sabado",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]


class App2 extends Component {

    state = {
        img: "",
        ruas: []
    }

    componentDidMount() {

        this.getRuas()

    }

    getRuas = async () => {


        try {
            const data = await axios.get("http://localhost:3001/gethere/cruzamentos", {
                headers: {
                    Authorization: "Bearer " + auth.isAuth()
                }
            });

            this.setState({
                ruas: data.data.data
            })

            // console.log(data.data.data);

        } catch (e) {
            console.log(e)
        }
    }

    renderItems = () => {
        if (this.state.ruas.length === 0) {

        } else {

            return this.state.ruas.map((value, index) => {
                if (index < 5) {
                    console.log('menor q 5')
                    return (
                        <p class="list-group-item list-group-item-action">{value.nomeRuaPrincipal}</p>
                    )
                }
            })

        }
    }

    render() {
        return (
            <div className="App2" >

                {/* <div style={{ flexDirection: "row", width: 500, margin: 0 }}> */}
                {/* TODO Informações principais da pagina 
                            Ex:
                            -> Movimentação da cidade
                            -> Ruas mais movimentada */}
                <div className="row">
                    {/* TODO grafico de tendencias */}

                    <AreaChart width={850} height={350} data={dataSemana}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>

                    <section className="sectionCard">
                        <div className="card cardStyle">
                            <div class="card-title" style={{ flexDirection: "row" }}>
                                <h5> Pesquisar ruas</h5>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" id="button-addon2"> <i className="search icon"></i> </button>
                                    </div>
                                </div>
                            </div>
                            <div className="list-group">
                                {this.renderItems()}
                            </div>
                        </div>
                    </section>
                </div>


                <ComposedChart className="graf-tend " width={1100} height={200} data={dataTrending}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Area type="monotone" dataKey="media" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="valorAtual" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                </ComposedChart>

                {/* </div> */}



            </div>
        );
    }
}

export default App2;