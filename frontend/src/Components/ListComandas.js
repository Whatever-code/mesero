import React, { Component } from 'react';
import config from '../config';
import Axios from 'axios';

export default class ListComandas extends Component {
    //Ver todos los pedidos (card)
    //            card-header = numero de mesa
    //            card body = pedidos

    URL = config.BACKEND + '/comanda'

    state = {
        comandas: [],
    }

    componentDidMount() {
        this.getPedidos();
    }

    getPedidos = async () => {
        const res = await Axios.get(this.URL);
        this.setState({ comandas: res.data });
    }

    delete = async (id) => {
        const res = await Axios.delete(this.URL + '/' + id);
        alert(res.data);
        this.getPedidos();
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    {this.state.comandas.map(comanda =>
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row justify-content-between">
                                        <h4>Mesa: {comanda.mesa}</h4>
                                        <button className="btn btn-success" onClick={() => this.delete(comanda._id)}>Lista</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul>
                                        {comanda.pedidos.map(pedido =>
                                            <li><span>{pedido.tipo} {pedido.nombre}: {pedido.cantidad}</span></li>
                                        )}
                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <h5 className="float-right">Total: {comanda.total}</h5>
                                </div>
                            </div>
                            <hr className="my-4"></hr>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
