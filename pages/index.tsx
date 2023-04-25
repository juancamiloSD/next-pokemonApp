import { pokeApi } from "@/api"
import { Layout } from "@/components/layouts"
import { PokemonCard } from "@/components/pokemon"
import { PokemonListResponse, Result } from "@/interfaces"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { NextPage } from "next"
import { GetStaticProps } from 'next'

interface Props {
  pokemons: Result[]
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title="Listado de pokemon">
      <Grid.Container gap={ 2 } justify="flex-start" css={{ marginTop: '25px' }}>
          {
            pokemons.map( (pokemon) => (
              <PokemonCard key={ pokemon.id } pokemon={ pokemon }/>
            ))
          }
      </Grid.Container>
    </Layout>
  )
}

// Se ejecuta del lado del servidor
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemons: Result[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage
