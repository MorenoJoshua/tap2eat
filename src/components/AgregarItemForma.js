import React from 'react';

class AgregarItemForma extends React.Component {

    crearItem(event) {
        event.preventDefault();

        const itemEl = this.itemLabel;
        this.props.agregarItem(itemEl);
        this.itemLabel.value = '';
    }

    render() {
        return (
            <form onSubmit={(event) => this.crearItem(event)}>
                <div className="input-group">
                    <input type="text" ref={ref => this.itemLabel = ref} name="label" className="form-control form-control-sm"
                           placeholder="Agregar nuevo" required/>
                    <button type="submit" className="btn btn-sm btn-success input-group-append">Agregar</button>
                </div>
            </form>
        )
    }
}

export default AgregarItemForma;