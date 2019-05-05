import React, { Component } from 'react'
import './index.css'
// import { GoLocation } from 'react-icons/go'
import { XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from 'recharts';
import GoogleMapReact from 'google-map-react';


// const MapMarker = ({ text }) => {
//     return (
//         <GoLocation />
//     )
// }



export default class Totem extends Component {

    state = {
        width: window.innerWidth,
        height: window.innerHeight,
        dataSemana: [
            {
                "name": "Domingo",
                "Semana Atual": 4000,
                "Semana Anterior": 2400,
                "amt": 2400
            },
            {
                "name": "Segunda",
                "Semana Atual": 3000,
                "Semana Anterior": 1398,
                "amt": 2210
            },
            {
                "name": "Terça",
                "Semana Atual": 2000,
                "Semana Anterior": 9800,
                "amt": 2290
            },
            {
                "name": "Quarta",
                "Semana Atual": 2780,
                "Semana Anterior": 3908,
                "amt": 2000
            },
            {
                "name": "Quinta",
                "Semana Atual": 1890,
                "Semana Anterior": 4800,
                "amt": 2181
            },
            {
                "name": "Sexta",
                "Semana Atual": 2390,
                "Semana Anterior": 3800,
                "amt": 2500
            },
            {
                "name": "Sabado",
                "Semana Atual": 3490,
                "Semana Anterior": 4300,
                "amt": 2100
            }
        ],
        center: {
            lat: -1.4476205,
            lng: -48.4736209,
        },
        zoom: 13,
    }

    componentDidMount() {
        // this.getRuas()
        window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        // console.log(window.innerWidth)
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    _onChange = ({ center, zoom }) => {
        this.setState({
            center: center,
            zoom: zoom,
        });
    }

    render() {
        return (
            <div className="row body">
                <div className="card-totem-style">
                    <div className="table-container">
                        <h4 className="text-center text-white">Lista de Totens</h4>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center text-white" scope="col">Nome</th>
                                    <th className="text-center text-white" scope="col">Rua</th>
                                    <th className="text-center text-white" scope="col">Tráfego</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center text-white">Totem 1</td>
                                    <td className="text-center text-white">Rua 0</td>
                                    <td className="text-center text-white">9.0</td>
                                </tr>
                                <tr>
                                    <td className="text-center text-white">Totem 1</td>
                                    <td className="text-center text-white">Rua 0</td>
                                    <td className="text-center text-white">9.0</td>
                                </tr>
                                <tr>
                                    <td className="text-center text-white"> Totem 1</td>
                                    <td className="text-center text-white">Rua 0</td>
                                    <td className="text-center text-white">9.0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="separador"></div>
                    <div>
                        <h5 className="text-center text-white">Performance</h5>
                        <AreaChart width={(this.state.width * 4.65) / 10} height={(this.state.height * 4) / 10} data={this.state.dataSemana}
                            className="chart-style"
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
                            <Area type="monotone" dataKey="Semana Atual" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="Semana Anterior" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </div>
                </div>

                <div className="details-container">
                    <h2 className="text-center header-margin">Editar</h2>
                    <form>
                        <div class="form-group">
                            <label className="form-label label-text" htmlFor="exampleInputEmail1">Nome</label>
                            <input type="text" className="form-control input-text" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nome da rua aqui" />
                        </div>
                        <div class="form-group">
                            <label className="form-label " htmlFor="exampleInputPassword1">Rua Principal</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Rua principal" />
                        </div>
                        <div class="form-group">
                            <label className="form-label" htmlFor="exampleFormControlSelect1">Ruas transversais</label>
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>Rua transversal 1</option>
                                <option>Rua transversal 2</option>
                                <option>Rua transversal 3</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Latitude</label>
                                <input type="text" className="form-control" placeholder="Latitude" />
                            </div>
                            <div className="col">
                                <label className="form-label">Longitude</label>
                                <input type="text" className="form-control" placeholder="Longitude" />
                            </div>
                        </div>
                        <div className="btn-container">
                            <button type="submit" className="btn btn-primary btn-alterar" onClick={() => null}>Alterar</button>
                            <button type="submit" className="btn btn-primary btn-adicionar" onClick={() => null}>Adicionar</button>
                        </div>
                        <div className="totem-map-container">
                            <GoogleMapReact
                                onChange={this._onChange}
                                bootstrapURLKeys={{ key: "AIzaSyC2FHGrra6HIBgfKGo7-cnsDllhkQdbEUE" }}
                                center={this.state.center}
                                zoom={this.state.zoom}>

                                {/* {this.state.markerCenter ? <MapMarker lat={this.state.markerCenter.lat} lng={this.state.markerCenter.lng} /> : null} */}

                            </GoogleMapReact>
                        </div>
                    </form>
                </div>

            </div >
        )
    }
}