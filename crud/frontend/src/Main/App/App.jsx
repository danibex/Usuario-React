import './App.css'
import React from 'react'

import Logo from '../../components/Logo'
import Nav from '../../components/Nav'
import Main from '../../templates/Main'
import Footer from '../../components/Footer'

export default props =>
    <div className='app'>
        <Logo />
        <Nav />
        <Main />
        <Footer />
    </div>