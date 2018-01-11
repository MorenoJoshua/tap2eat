import React, {Component} from 'react';
import TodoItem from "./components/TodoItem";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AgregarItemForma from "./components/AgregarItemForma";

const initialState = localStorage.todoListItems ? JSON.parse(localStorage.todoListItems) : {
    items: {
        inicial1: {label: "Puedes eliminarme", status: "nohecho"},
        inicial2: {label: "O marcar como echo", status: "hecho"}
    }
};

class App extends Component {
    constructor() {
        super();
        this.editarItem = this.editarItem.bind(this);
        this.marcarItemComoOk = this.marcarItemComoOk.bind(this);
        this.marcarItemComoNoOk = this.marcarItemComoNoOk.bind(this);
        this.eliminarItem = this.eliminarItem.bind(this);
        this.agregarItem = this.agregarItem.bind(this);
        this.edicionOK = this.edicionOK.bind(this);
        this.guardarLista = this.guardarLista.bind(this);

        this.state = initialState;
    }

    guardarLista() {
        localStorage.todoListItems = JSON.stringify(this.state);
    }

    edicionOK(itemKey, label) {
        const status = "nohecho";
        let items = {...this.state.items};
        items[itemKey] = {...items[itemKey], status, label};
        this.setState({...this.state, items}, () => this.guardarLista());
    }

    editarItem(key) {
        const status = "editando";
        let items = {...this.state.items};
        items[key].status = status;
        this.setState({...this.state, items}, () => this.guardarLista());
    }

    agregarItem(labelEl) {
        const item = {
            label: labelEl.value,
            status: 'nohecho'
        };
        const items = {...this.state.items, [`item-${Date.now()}`]: item};
        this.setState({...this.state, items}, () => this.guardarLista());
    };

    marcarItemComoOk(key) {
        const status = "hecho";
        let items = {...this.state.items};
        items[key].status = status;
        this.setState({...this.state, items}, () => this.guardarLista());
    }

    marcarItemComoNoOk(key) {
        const status = "nohecho";
        let items = {...this.state.items};
        items[key].status = status;
        this.setState({...this.state, items}, () => this.guardarLista());

        this.guardarLista();
    }

    eliminarItem(key) {
        let items = {...this.state.items};
        delete items[key];
        this.setState({items}, () => this.guardarLista());
    }


    render() {
        return (
            <div className="App card-body">
                <div className="col-12 display-4">Todo</div>
                <div className="w-100"/>
                <ul className="list-unstyled">
                    {Object.keys(this.state.items).map(key => {
                        const todoItem = this.state.items[key];
                        return (<TodoItem
                            key={key}
                            itemKey={key}
                            editarItem={(key) => this.editarItem(key)}
                            marcarItemComoOk={(key) => this.marcarItemComoOk(key)}
                            marcarItemComoNoOk={(key) => this.marcarItemComoNoOk(key)}
                            eliminarItem={(key) => this.eliminarItem(key)}
                            label={todoItem.label}
                            status={todoItem.status}
                            edicionOK={(key, label) => this.edicionOK(key, label)}
                        />)
                    })}
                    <li className="mt-4">

                        <AgregarItemForma agregarItem={(labelEl) => this.agregarItem(labelEl)}/>
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
