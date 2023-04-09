import React, {Component} from "react";
import axios from 'axios'
import Main from "../../templates/Main";
import { baseUrl, initialState } from "./BaseUrl"

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}


{/*User table, user form (Refatorar) */}
export default class UserCrud extends Component {
    
    state = {...initialState}
    
    componentWillMount() {
        axios(baseUrl)
            .then(resp => {
                this.setState({list: resp.data})
            })
    }

    clear() {
        this.setState({user: initialState.user})
    }
/* Incluir: POST, Alterar: PUT ou PATCH */
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id  ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then( resp => {
                const list = this.getUpdaterList(resp.data)
                this.setState({user: initialState.user, list})
            }) 
    }

    getUpdaterList(user, add =  true) {
        const list = this.state.list.filter(e => e.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = {...this.state.user} // clonando objeto a partir do state. alterando esse objeto clonado e persistindo os dado no state (não clonar o state diretamente)
        user[event.target.name] = event.target.value // pegando input 
        this.setState({user})
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                          <label>Nome</label>
                          <input type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..."/>
                    </div>
                    <div className="col-12 col-md-6">
                          <label>Email</label>
                          <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o email..."/>
                    </div>
                </div>
            <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary mx-1"
                         onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary mx-1"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>                    
                </div>
            </div>
            

        )
    }

    load(user) {
        this.setState({user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then(resp => {
                const list = this.getUpdaterList(user, false)
                this.setState({list})
            })
    }

    renderTable() {
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning">
                            <i className="fa fa-pencil" onClick={() => this.load(user)}></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}