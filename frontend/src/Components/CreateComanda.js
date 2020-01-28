import React, { Component } from 'react';
import config from '../config';
import Axios from 'axios';

export default class CreateComanda extends Component {
    //Con un formulario agrego el pedio a la lista y que la lista 
    //           contenga un boton submit para enviar todo los pedidos como un array

    URL = config.BACKEND + '/comanda';
    URL_INI = config.BACKEND + '/comanda/add';

    state = {
        cantidad: '',
        nombre: '',
        tipo: '',
        mesa: '',
        detalle: '',

        pedidos: [],
        platos: [],
        selectPlatos: [],
        platoSelected: [],
        tipos: [],
    }

    componentDidMount() {
        this.getPlatos();
    }

    clearForm = () => {
        this.setState({
            cantidad: '',
            nombre: '',
            detalle: ''
        });
    }

    getPlatos = async () => {
        const res = await Axios.get(this.URL_INI);

        this.setState({
            platos: res.data.platos,
            tipos: res.data.tipos,
        });
    }

    loadSelect = (e) => {
        const platosSelected = this.state.platos.filter(
            plato => plato.tipo === e.target.value
        );

        this.setState({
            selectPlatos: platosSelected,
            [e.target.name]: e.target.value
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = () => {
        if (this.state.cantidad === '') {
            alert('Debe completar todos los campos.');
        }else{
            var pedidosProv = this.state.pedidos;

            pedidosProv.push({
                tipo: this.state.tipo,
                nombre: this.state.nombre,
                cantidad: this.state.cantidad,
                detalle: this.state.detalle
            });

            this.setState({
                pedidos: pedidosProv
            })

            this.clearForm();
        }
    }

    delete = async (nombre) => {
        var pedidosProv = this.state.pedidos.filter(pedido => pedido.nombre != nombre);

        this.setState({
            pedidos: pedidosProv
        })
    }

    finish = async () => {

        if (this.state.mesa === '') {
            await Axios.post(this.URL, {
                mesa: this.state.mesa,
                pedidos: this.state.pedidos
            });
        }else{
            alert('Ingrese un numero de mesa.');
        }

        window.location.href = '/comanda';
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="form-group col-12">
                        <input type="number" name="mesa" id="mesa" className="form-control" placeholder="Mesa" onChange={this.onChange} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-4 col-sm-12">
                        <div className="card mb-5">
                            <div className="card-header">Tomar Pedido</div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="tipo">Tipo</label>
                                        <select name="tipo" id="tipo" onChange={this.loadSelect} className="form-control">
                                            <option value="">Elige...</option>
                                            {this.state.tipos.map(tipo =>
                                                <option key={tipo} value={tipo}>{tipo}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Plato</label>
                                        <select name="nombre" id="nombre" onChange={this.onChange} className="form-control">
                                            <option value="">Elige...</option>
                                            {this.state.selectPlatos.map(plato =>
                                                <option key={plato._id} value={plato.nombre}>{plato.nombre}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cantidad">Cantidad</label>
                                        <input
                                            type="number"
                                            name="cantidad"
                                            id="cantidad"
                                            min="0"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.cantidad}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="detalle">Detalle</label>
                                        <textarea
                                            name="detalle"
                                            id="detalle"
                                            rows="5"
                                            placeholder="Detalle"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.detalle}>
                                        </textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit}>Agregar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-12">
                        <div id="tablaPedido">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipo</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Options</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.pedidos.map(pedido =>
                                        <tr>
                                            <td>{pedido.tipo}</td>
                                            <td>{pedido.nombre}</td>
                                            <td>{pedido.cantidad}</td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => this.edit(pedido.nombre)}>E</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="btn btn-primary float-right mt-5" onClick={this.finish}>Terminar Pedido</button>
                    </div>
                </div>
            </div>
        )
    }
}
