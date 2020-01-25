import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigations extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand">Pizza Ro</Link>                        
                    </div>
                </nav>
            </div>
        )
    }
}

/**
 <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                        </div>
 */