import { Navbar } from '@nextui-org/react'
import { Logo } from './Logo';
import NextLink from 'next/link'
import { useState } from 'react';

export const NavBar = () => {

    const [variant, setVariant] = useState("default");
    const [activeColor, setActiveColor] = useState("primary");
    const colors = ["primary", "secondary", "success", "warning", "error"];
    const variants = [
        "default",
        "highlight",
        "highlight-solid",
        "underline",
        "highlight-rounded",
        "highlight-solid-rounded",
        "underline-rounded",
      ];

    return (
            <Navbar isBordered variant="floating" className='navbarCustom'>
                <Navbar.Brand>
                    <Logo />               
                </Navbar.Brand>
                <Navbar.Content variant="highlight-rounded">
                    <Navbar.Link href="/">Inicio</Navbar.Link>
                    <Navbar.Link href="/favorites">Favoritos</Navbar.Link>
                </Navbar.Content>
            </Navbar>
    )
}
