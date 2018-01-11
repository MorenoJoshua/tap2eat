import React from 'react';

class TodoItem extends React.Component {
    constructor() {
        super();
        this.editarOk = this.editarOk.bind(this);
    }

    editarOk(event, key) {
        event.preventDefault();
        const label = this.labelEl.value;
        this.props.edicionOK(key, label);
    }

    render() {
        let marcarComo;
        let labelOInput = this.props.label;

        const itemKey = this.props.itemKey;
        const hecho = this.props.status === 'hecho';
        const labelClass = hecho ? 'itemLabel text-muted text-strike' : 'itemLabel';

        let editando = <div onClick={() => this.props.editarItem(itemKey)} className="px-2"><span role="img" aria-label="Accion">✏</span></div>

        switch (this.props.status) {
            case 'hecho':
                marcarComo = (
                    <div onClick={() => this.props.marcarItemComoNoOk(itemKey)} className="px-2"><span role="img" aria-label="Accion">👎</span></div>
                );
                break;
            case 'nohecho':
                marcarComo = (
                    <div onClick={() => this.props.marcarItemComoOk(itemKey)} className="px-2"><span role="img" aria-label="Accion">👍</span></div>
                );
                break;
            case 'editando':
                marcarComo = ('');
                labelOInput = (
                    <div className="m-0 p-0">
                        <form onSubmit={(event) => this.editarOk(event, itemKey)}>
                            <input type="text" className="form-control m-0 p-0" defaultValue={this.props.label}
                                   ref={el => this.labelEl = el}/>
                        </form>
                    </div>
                );
                editando = '';
                break;
            default:
                break;
        }

        return (
            <li>
                <span className={labelClass}>{labelOInput}</span>
                <div className="float-right btn-group btn-group-sm">
                    {marcarComo}
                    {editando}
                    <div onClick={() => this.props.eliminarItem(itemKey)} className="px-2"><span role="img" aria-label="Accion">🗑</span></div>
                </div>
            </li>
        )
    }
}

export default TodoItem;