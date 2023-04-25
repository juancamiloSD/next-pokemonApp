import { Result } from "@/interfaces"
import { localFavorites } from "@/utils"
import { Card, Grid, Row, Text } from "@nextui-org/react"
import { useRouter } from "next/router"
import { FC, useEffect, useState } from "react"

interface Props {
    pokemon: Result
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

    const router = useRouter()

    const [isInFavorites, setIsInFavorites] = useState( false)

    useEffect(() => {
        setIsInFavorites(localFavorites.existFavorites(pokemon.id))
    }, [])
    

    const onClick = () => {
        router.push(`/name/${ pokemon.name }`)
    }
    

    return (
        <Grid xs={ 6 } sm={ 3 } md={ 2 } xl={ 2 }>
            <Card isHoverable isPressable onPress={ onClick } css={{ padding: '15px 10px 0 10px' }}>
            <Card.Body css={{ p:1 }}>
                <Card.Image
                src={ pokemon.img }
                width="100%"
                height={ 140 }
                />
            </Card.Body>
            <Card.Footer>
                <Row justify="space-between">
                    <Text transform="capitalize">#{ pokemon.id } - { pokemon.name }</Text>
                    <Text h3>{ isInFavorites ? '🌟' : '' }</Text>
                </Row>
            </Card.Footer>
            </Card>
        </Grid>
    )
}
