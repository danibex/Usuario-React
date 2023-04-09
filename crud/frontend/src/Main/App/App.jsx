import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import Logo from '../../components/Logo'
import Nav from '../../components/Nav'
import Home from '../../components/home/Home'
import Footer from '../../components/Footer'

export default props =>
    <div className='app'>
        <Logo />
        <Nav />
        <Home />
        <Footer />
    </div>

    {/* Font Awesome (Biblioteca de icones) */}