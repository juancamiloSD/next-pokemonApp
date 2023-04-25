import { Layout } from "@/components/layouts"
import { Pokemon } from "@/interfaces"
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { localFavorites } from "@/utils"
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'
import getPokemonInfo from "@/utils/getPokemonInfo"

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {    

    const [isInFavorites, setIsInFavorites] = useState( false )
        
    useEffect(() => {
        setIsInFavorites(localFavorites.existFavorites( pokemon.id ))
    }, [])
    

    const onToggleFavorite = () => {
        localFavorites.toggleFavorites( pokemon.id )
        setIsInFavorites( !isInFavorites )
        if( isInFavorites ) return

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        })
    }

    return (
        <Layout title={ pokemon.name }>
            <Container lg>
                <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                    <Grid xs={ 12 } sm={ 5 }>
                        <Card isHoverable css={{ padding: '30px' }}>
                            <Card.Body>
                                <Card.Image
                                    src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                                    alt={ pokemon.name }
                                    width="100%"
                                    height={ 200 }
                                />
                                <Container direction="row" display="flex" gap={ 0 } css={{ marginTop: '35px' }}>
                                    <Image 
                                        src={ pokemon.sprites.front_default }
                                        alt={ pokemon.name }
                                        width={100}
                                        height={100}
                                    />
                                    <Image 
                                        src={ pokemon.sprites.back_default }
                                        alt={ pokemon.name }
                                        width={100}
                                        height={100}
                                    />
                                    <Image 
                                        src={ pokemon.sprites.front_shiny }
                                        alt={ pokemon.name }
                                        width={100}
                                        height={100}
                                    />
                                    <Image 
                                        src={ pokemon.sprites.back_shiny }
                                        alt={ pokemon.name }
                                        width={100}
                                        height={100}
                                    />

                                </Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={ 12 } sm={ 7 }>
                        <Card>
                            <Card.Header css={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px 0 30px' }}>
                                <Text h1 transform="capitalize">{ pokemon.name }</Text>
                                <Button
                                    color="gradient"
                                    ghost={ !isInFavorites }
                                    onPress={ onToggleFavorite }
                                >
                                    { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
                                    
                                </Button>
                            </Card.Header>
                            <Card.Body>
                                <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                                <Grid xs={ 12 } sm={ 6 } md={ 6 }>
                                    <Card>
                                        <Container>
                                            <Text h2 size={30}>Estadisticas:</Text>
                                            { 
                                                pokemon.stats.map( ({base_stat, stat}) => (
                                                    <Text key={ stat.name } h5 transform="capitalize">{ stat.name }: { base_stat }</Text>
                                                ))
                                            }
                                        </Container>
                                    </Card>
                                </Grid>
                                <Grid xs={ 12 } sm={ 6 } md={ 6 }>
                                    <Card>
                                        <Container>
                                            <Text h2 size={30} >Tipos:</Text>
                                            { 
                                                pokemon.types.map( ({ type }) => (
                                                    <Text key={ type.name } h5 transform="capitalize">{ type.name }</Text>
                                                ))
                                            }
                                        </Container>
                                    </Card>
                                </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Container>
        </Layout>
    )
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// getStaticPaths necesita siempre a getStaticProps
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemons151 = [...Array(151)].map( (value, index) => `${ index + 1 }`)

    return {
        paths: pokemons151.map( id => ({
            params: { id }
        })),
        // fallback: false
        fallback: 'blocking'
    }
}

// getStaticProps no necesita a getStaticPaths
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string }
    
    const pokemon = await getPokemonInfo(id)

    if(!pokemon){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
      props: {
        pokemon
      },
      revalidate: 10
    }
  }

export default PokemonPage