import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import { Stat } from "../interfaces/pokemon-full";

const getPokemonInfo = async (nameOrId: string) => {
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
    stats: data.stats,
    types: data.types,
  };
};

export default getPokemonInfo;
