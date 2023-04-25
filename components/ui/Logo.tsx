import { Image } from "@nextui-org/react"
import NextLink from 'next/link';

export const Logo = () => {
  return (
    <>
      <NextLink href="/" passHref>
          <Image
              src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
              alt="icono"
              width={180}
              height={70}
          />
      </NextLink>
    </>
  )
}
