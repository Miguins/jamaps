import React, { Component } from 'react'
import './index.css'
import Image from '../../images/JamapsLOGO-01.png'
import Axios from 'axios'
import auth from '../../config/auth/index'

export default class Login extends Component {

    _login = async (e) => {
        e.preventDefault()

        // console.log('cliquei')

        try {
            // const response = await Axios.get('http://localhost:8080/api/logins', {
            //     email: this.refs.user.value,
            //     password: this.refs.senha.value
            // })
            // console.log('Antes do await')
            const response = await Axios.post('http://localhost:3001/auth/login', {
                username: this.refs.user.value,
                password: this.refs.senha.value
            })

            // console.log(response.data.code)

            console.log(response)

            if (response.status === 200) {
                // console.log(this)
                auth.setToken(response.data.access_token)
                auth.login(() => {

                    this.props.history.push("/home")
                })

            }

        } catch (e) {
            console.log(e)
        }

    }

    _register = (e) => {
        this.props.history.push("/register")
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-11 col-md-11 col-lg-11 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body row align-items-center">

                                    <div className="div-logo-jamaps col-sm">
                                        <img src={Image} alt="" className="img-fluid" />
                                    </div>

                                    <form className="form-signin col-sm validation">
                                        <div className="form-label-group" >
                                            <input type="text" ref="user" id="inputEmail" className="form-control" placeholder="Username" required autoFocus />
                                            <label htmlFor="inputEmail">Username</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" ref="senha" id="inputPassword" className="form-control" placeholder="Senha" required />
                                            <label htmlFor="inputPassword">Senha</label>
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Lembrar senha</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={(e) => this._login(e)}>Entrar</button>

                                        <button type="button" className="btn btn-link btn-cadastro text-uppercase" onClick={(e) => this._register(e)}>Não possui cadastro? clique aqui</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
