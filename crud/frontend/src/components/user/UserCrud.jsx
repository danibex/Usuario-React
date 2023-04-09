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

    getUpdaterList(user) {
        const list = this.state.list.filter(e => e.id !== user.id)
        list.unshift(user)
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
                
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                Cadastro de Usuário
            </Main>
        )
    }
}