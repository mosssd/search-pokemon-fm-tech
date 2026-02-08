import Link from "next/link";
import { Pokemon } from "@/types/pokemon";

interface Props {
  evolutions?: Pokemon[] | null;
}

export default function PokemonEvolution({ evolutions }: Props) {
  if (!evolutions?.length) {
    return <p>No evolutions</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Evolutions
      </h2>


      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {evolutions.map((evo) => (
            <Link 
              key={evo.id}
              href={`/?name=${evo.name}`}
              className="block cursor-pointer rounded-2xl border p-4 text-center hover:shadow-md hover:-translate-y-1 transition">
                <div className="flex items-center justify-center h-32 w-full mb-2"> 
                  <img 
                    src={evo.image} 
                    alt={evo.name} 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
                <p className="mt-2 font-medium">
                {evo.name}
              </p>
            </Link>
        ))}
      </div>
    </div>
  );
}
