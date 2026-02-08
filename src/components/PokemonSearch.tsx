"use client";

import { useQuery } from "@apollo/client/react";
import { GET_POKEMON } from "@/graphql/queries";
import { PokemonData, PokemonVars } from "@/types/pokemon";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PokemonDetail from "./PokemonDetail";
import PokemonEvolution from "./PokemonEvolution";

export default function PokemonSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nameFromUrl = searchParams.get("name") || "";
  const [search, setSearch] = useState(nameFromUrl);

  const { data, loading, error } = useQuery<PokemonData, PokemonVars>(
    GET_POKEMON,
    {
      variables: { name: nameFromUrl },
      skip: !nameFromUrl,
      fetchPolicy: "cache-first",
    }
  );

  // sync input กับ URL
  useEffect(() => {
    setSearch(nameFromUrl);
  }, [nameFromUrl]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?name=${search.trim()}`);
  };

  if (error) return <p>Error loading pokemon</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      
      {/* Search input */}
      <form onSubmit={handleSearch} className="flex gap-2 my-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Pokémon..."
          className="flex-1 border rounded-2xl px-4 py-2 focus:outline-none focus:ring"
        />

        <button
          type="submit"
          disabled={!search || loading}
          className="px-4 py-2 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 min-w-20 justify-center"
        >
          {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Search"}
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        <div className="h-48 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      )}

      {/* Not found */}
      {!loading && !data?.pokemon && nameFromUrl && (
        <p className="text-center text-gray-500">
          No Pokémon found for "{nameFromUrl}"
        </p>
      )}

      {/* Result */}
      <div className="space-y-6">
        {data?.pokemon && <PokemonDetail pokemon={data.pokemon} />}
        {data?.pokemon && <PokemonEvolution evolutions={data.pokemon.evolutions} />}
      </div>
    </div>
    
  );
}
