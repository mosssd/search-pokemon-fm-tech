export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions?: Pokemon[] | null; // ถ้าร่างสุดท้ายจะเป็น null
  evolutionRequirements: {
    amount: number;
    name: string;
  } | null;
  maxHP: number;
  image: string;
}

// สำหรับตอนที่ใช้ useQuery เพื่อบอกผลลัพธ์ที่ได้จาก API
export interface PokemonData {
  pokemon: Pokemon;
}

export interface PokemonVars {
  name: string;
}