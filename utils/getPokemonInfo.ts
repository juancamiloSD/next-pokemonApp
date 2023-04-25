import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import { Stat } from "../interfaces/pokemon-full";

const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

    return {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      stats: data.stats,
      types: data.types,
    };
  } catch (error) {
    return null;
  }
};

export default getPokemonInfo;
