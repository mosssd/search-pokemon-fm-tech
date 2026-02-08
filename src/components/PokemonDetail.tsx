import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

interface Props {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: Props) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md p-6 space-y-8">

      {/* number */}
      <div className="absolute top-4 left-4 bg-gray-900 text-white rounded-full w-12 h-12 flex items-center justify-center text-sm font-semibold">
        #{pokemon.number}
      </div>

      {/* header */}
      <div className="text-center space-y-3">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={160}
          height={160}
          priority
          className="mx-auto"
        />

        <h1 className="text-3xl font-bold">{pokemon.name}</h1>

        <div className="flex justify-center gap-2 flex-wrap">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* info */}
      <div>
        <h2 className="font-semibold text-lg mb-3">General</h2>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Info label="Classification" value={pokemon.classification} />
          <Info label="Flee Rate" value={pokemon.fleeRate} />
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-3">Stats</h2>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <Info
            label="Weight"
            value={`${pokemon.weight.minimum} – ${pokemon.weight.maximum}`}
          />

          <Info
            label="Height"
            value={`${pokemon.height.minimum} – ${pokemon.height.maximum}`}
          />

          <Info label="Max HP" value={pokemon.maxHP} />
          <Info label="Max CP" value={pokemon.maxCP} />
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg mb-3">Type Effectiveness</h2>

        <div className="space-y-3 text-sm">
          <TypeList title="Weaknesses" list={pokemon.weaknesses} />
          <TypeList title="Resistant" list={pokemon.resistant} />
        </div>
      </div>

      {/* attacks */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Attacks</h2>

        <AttackGroup title="Fast" attacks={pokemon.attacks.fast} />
        <AttackGroup title="Special" attacks={pokemon.attacks.special} />
      </div>

      {/* evolution requirement */}
      {pokemon.evolutionRequirements && (
        <div>
          <h2 className="font-semibold text-lg mb-2">
            Evolution Requirement
          </h2>
          <p className="text-lg text-gray-700">
            - {pokemon.evolutionRequirements.amount} {pokemon.evolutionRequirements.name} -
          </p>
    
        </div>
      )}
    </div>

    
  );
}


function Info({ label, value }: any) {
  return (
    <div className="flex justify-between border rounded-lg px-3 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TypeList({ title, list }: any) {
  return (
    <div>
      <p className="mb-1 font-medium">{title}</p>
      <div className="flex flex-wrap gap-2">
        {list.map((type: string) => (
          <span
            key={type}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

function AttackGroup({ title, attacks }: any) {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">{title}</h3>

      <div className="space-y-2">
        {attacks.map((atk: any) => (
          <div
            key={atk.name}
            className="flex justify-between items-center border rounded-xl px-4 py-2">
            <div className="flex gap-3 items-center">
              <span>{atk.name}</span>

              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                {atk.type}
              </span>
            </div>

            <span className="font-semibold">
              {atk.damage}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
