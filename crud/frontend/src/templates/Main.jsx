import './Main.css'
import React from 'react'
import Header from '../components/Header'



export default props => 
    <React.Fragment>
        <Header {...props} /> {/*Passando as propriedades do main para o header*/}
        <main className='content'>
            Conteudo
        </main>
    </React.Fragment>
