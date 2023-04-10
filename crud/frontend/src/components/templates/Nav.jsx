import './Nav.css'
import React from 'react'
import NavItem from './NavItem'


export default props => (
    <aside className='menu-area'>
        <nav className='menu'>
        {/* Refatorar!!! */}
            <NavItem href="/" icon="home" name="Início"/>
            <NavItem href="/users" icon="users" name="Usuários"/>
        </nav>
    </aside>
)