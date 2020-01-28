import React, { Component } from 'react';
import config from '../config';
import Axios from 'axios';

export default class CreatePlato extends Component {

    URL = config.BACKEND + '/plato';

    state = {
        platos: [],
        nombre: '',
        precio: '',
        tipo: '',
    }

    clearForm = () => {
        this.setState({
            nombre: '',
            precio: '',
        })
    }

    componentDidMount() {
        this.getPlatos();
    }

    getPlatos = async () => {
        const res = await Axios.get(this.URL);
        this.setState({ platos: res.data });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();

        if (this.state.nombre === '' || this.state.precio === '' || this.state.tipo === '') {
            alert('Debe de completar todos los campos');
        }else{
            const res = await Axios.post(this.URL, {
                nombre: this.state.nombre,
                precio: this.state.precio,
                tipo: this.state.tipo
            });
    
            alert(res.data);
            
            this.clearForm();
            this.getPlatos();
        }
    }

    delete = async (id) => {
        const res = await Axios.delete(this.URL + '/' + id);
        this.getPlatos();
        alert(res.data);
    }

    edit = async (id) => {
        const res = await Axios.get(this.URL + '/' + id);

        this.setState({
            nombre: res.data.nombre,
            precio: res.data.precio,
            tipo: res.data.tipo,
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <div className="card border">
                            <div className="card-header">Agregar Plato</div>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="Tipo">Tipo</label>
                                        <select name="tipo" id="tipo" className="form-control" onChange={this.onChange} autoFocus>
                                            <option value="">Eliga una opcion ...</option>
                                            <option value="Pizza">Pizza</option>
                                            <option value="Entrada">Entrada</option>
                                            <option value="Hamburguesa">Hamburguesa</option>
                                            <option value="Empanada">Empanada</option>
                                            <option value="Milanesa">Milanesa</option>
                                            <option value="Lomo">Lomo</option>
                                            <option value="Infantil">Infantil</option>
                                            <option value="Dulce">Dulce</option>
                                            <option value="Bebida">Bebida</option>
                                            <option value="Jugo">Jugo</option>
                                            <option value="Cerveza">Cerveza</option>
                                            <option value="Trago">Trago</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            id="nombre"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.nombre}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="preico">Precio</label>
                                        <input
                                            type="number"
                                            name="precio"
                                            id="precio"
                                            min="0"
                                            className="form-control"
                                            onChange={this.onChange}
                                            value={this.state.precio}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit}>Agregar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8" id="tablaPlato">
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.platos.map(plato =>
                                    <tr key={plato._id}>
                                        <td>{plato.nombre}</td>
                                        <td>{plato.precio}</td>
                                        <td>{plato.tipo}</td>
                                        <td>
                                            <button onClick={() => this.delete(plato._id)} className="btn btn-danger">E</button>
                                            <button onClick={() => this.edit(plato._id)} className="btn btn-warning ml-1">M</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
