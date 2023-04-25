import Head from "next/head"
import { FC } from "react"
import { NavBar } from "../ui"

interface Props {
    title: string,
    children?: React.ReactNode
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
        <Head>
            <title>{ title || 'Pokemon App' }</title>
            <meta name="author" content="Juan Salazar"/>
            <meta name="description" content={`Información sobre los pokemon ${title}`}/>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>
            <meta property="og:title" content={`Información sobre el pokémon ${title}`} />
            <meta property="og:description" content={`Esta es la página sobre ${title}`} />
            <meta property="og:image" content={`${ origin }/images/banner.png`} />
        </Head>

        <NavBar />

        <main>
            { children }
        </main>
    </>
  )
}
