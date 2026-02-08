import { Suspense } from "react";
import PokemonSearch from "@/components/PokemonSearch";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PokemonSearch />
    </Suspense>
  );
}