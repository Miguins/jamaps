import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../config/auth/index'

export const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (auth.isAuth()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }} />
                }

            }
        } />
    )
}