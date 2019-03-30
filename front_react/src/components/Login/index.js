import React, { Component } from 'react'
import './index.css'
import Image from '../../images/JamapsLOGO-01.png'

export default class Login extends Component {

    render() {

        return (
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-sm-11 col-md-11 col-lg-11 mx-auto">
                            <div class="card card-signin my-5">
                                <div class="card-body row align-items-center">

                                    <div className="div-logo-jamaps col-sm">
                                        <img src={Image} class="img-fluid" />
                                    </div>

                                    <form class="form-signin col-sm">
                                        <div class="form-label-group">
                                            <input type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus />
                                            <label for="inputEmail">Email</label>
                                        </div>

                                        <div class="form-label-group">
                                            <input type="password" id="inputPassword" class="form-control" placeholder="Senha" required />
                                            <label for="inputPassword">Senha</label>
                                        </div>

                                        <div class="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                            <label class="custom-control-label" for="customCheck1">Lembrar senha</label>
                                        </div>
                                        <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Entrar</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        )

    }

}
