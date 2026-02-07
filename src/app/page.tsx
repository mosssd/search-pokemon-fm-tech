"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "@/graphql/queries";
import { PokemonData, PokemonVars } from "@/types/pokemon";
import { useSearchParams , useRouter} from "next/navigation";
import { useState, useEffect } from "react";


export default function Home() {
  const searchParams = useSearchParams();
  const nameFromUrl = searchParams.get("name") || "";
  const [search, setSearch] = useState(nameFromUrl);
  const { data, loading, error } = useQuery<PokemonData,PokemonVars>(
    GET_POKEMON, {
      variables: { name: nameFromUrl },
      skip: !nameFromUrl
    });
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
     e.preventDefault();
  router.push(`/?name=${search}`);
  };


  useEffect(() => {
    setSearch(nameFromUrl);
  }, [nameFromUrl]);

if (error) return <p>Error loading pokemon</p>;

return (
  <div>
    <form onSubmit={handleSearch}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search pokemon..."
      />
    </form>

    {loading && <p>Loading Pokémon...</p>}

    {!loading && !data?.pokemon && nameFromUrl && (
      <p>No Pokémon found for "{nameFromUrl}"</p>
    )}

    {data?.pokemon && (
      <>
        <h1>{data.pokemon.name}</h1>
        <img src={data.pokemon.image} width={200} />
        <p>Weight: {data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}</p>
        <p>Height: {data.pokemon.height.minimum} - {data.pokemon.height.maximum}</p>
        <p>Max HP: {data.pokemon.maxHP}</p>
        <p>Types: {data.pokemon.types.join(", ")}</p>
        <h2>Attacks</h2>

        <h3>Fast</h3>
        <ul>
          {data?.pokemon.attacks.fast.map((attack) => (
            <li key={attack.name}>
              {attack.name} ({attack.type}) - {attack.damage}
            </li>
          ))}
        </ul>

        <h3>Special</h3>
        <ul>
          {data?.pokemon.attacks.special.map((attack) => (
            <li key={attack.name}>
              {attack.name} ({attack.type}) - {attack.damage}
            </li>
          ))}
        </ul>

        <h2>Evolutions</h2>
        {data?.pokemon.evolutions?.length ? (
          <ul>
            {data.pokemon.evolutions.map((evo) => (
             <li
              key={evo.id}
              onClick={() => router.push(`/?name=${evo.name}`)}
              className="cursor-pointer hover:opacity-70"
            >
              <img src={evo.image} width={100} />
              <p>{evo.name}</p>
            </li>
            ))}
          </ul>
        ) : (
          <p>No evolutions</p>
        )}
      </>
    )}
  </div>
  

);

  // return (
  //   <form onSubmit={handleSearch}>
  //     <input
  //       value={search}
  //       onChange={(e) => setSearch(e.target.value)}
  //       placeholder="Search pokemon..."
  //     />
  //   </form>
  // );
}
