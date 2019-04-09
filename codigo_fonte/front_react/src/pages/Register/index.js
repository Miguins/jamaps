import React, { Component } from 'react'
import Axios from 'axios'
import auth from '../../config/auth/index'

export default class Register extends Component {

    _login = (e) => {
        this.props.history.push("/")
    }

    _register = async (e) => {
        e.preventDefault()

        console.log(this.refs.checkbox.checked)

        if (this.refs.checkbox.checked === true) {
            try {
                // const response = await Axios.get('http://localhost:8080/api/logins', {
                //     email: this.refs.user.value,
                //     password: this.refs.senha.value
                // })

                const response = await Axios.post('http://localhost:3001/auth/register', {
                    username: this.refs.user.value,
                    password: this.refs.senha.value
                })

                // console.log(response.data.code)

                console.log(response)

                if (response.status === 201) {
                    console.log(this)
                    auth.login(() => {
                        this.props.history.push("/")
                    })

                }

            } catch (e) {
                console.log(e)
            }
        }

    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-11 col-md-11 col-lg-11 mx-auto">
                            <div className="card card-signin my-5 col-sm-7 mx-auto">
                                <div className="card-body align-items-center">

                                    <h2 className="text-monospace text-center" style={{ padding: 30, paddingTop: 20 }}>Registrar</h2>

                                    <form className="form-signin col-sm">
                                        <div className="form-label-group">
                                            <input type="text" ref="user" id="validationTooltipUsername" className="form-control" placeholder="Username" required autoFocus />
                                            <label htmlFor="validationTooltipUsername">Username</label>
                                            <div className="invalid-tooltip">
                                                Please choose a unique and valid username.
                                            </div>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" ref="senha" id="inputPassword" className="form-control" placeholder="Senha" required />
                                            <label htmlFor="inputPassword">Senha</label>
                                        </div>

                                        <div className="custom-control text-center custom-checkbox mb-3">
                                            <input type="checkbox" ref="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Declaro que li os termos de uso e os aceito</label>
                                        </div>

                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" onClick={(e) => this._register(e)}>Registrar</button>

                                        <button type="button" className="btn btn-link btn-cadastro text-uppercase" onClick={(e) => this._login(e)}>Já tenho conta. Quero entrar</button>

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