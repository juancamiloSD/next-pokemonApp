import { Navbar } from '@nextui-org/react'
import { Logo } from './Logo';
import NextLink from 'next/link'

export const NavBar = () => {

    return (
        <Navbar isBordered variant="floating" className='navbarCustom'>
            <Navbar.Brand>
                <NextLink href="/" passHref>
                    <Logo />               
                </NextLink>
            </Navbar.Brand>
            <Navbar.Content variant={ "highlight-rounded" }>
                <Navbar.Link href="/">Inicio</Navbar.Link>
                <Navbar.Link href="/favorites">Favoritos</Navbar.Link>
            </Navbar.Content>
        </Navbar>
    )
}
