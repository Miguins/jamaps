import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

    render() {
        return (
            <div>
                <nav >
                    <div>
                        <Link to="/home" >Home</Link>
                        <Link to="/graficos">Graficos</Link>
                    </div>
                </nav>

                <section>
                    <div>
                        {this.props.children}
                    </div>
                </section>

            </div>
        )
    }

}

export default Sidebar