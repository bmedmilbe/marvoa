import { create } from "zustand";
// Certifique-se de que o caminho para QueryParams está correto
import type { QueryParams } from "../useFlights";

/**
 * Converte o valor de ordenação numérica (recebido de um componente, por exemplo)
 * para o formato de string esperado pela API (ex: '-final_price', 'date').
 * @param choosed O valor string vindo do input (ex: "1", "-2").
 * @returns A string de ordenação para a API ou undefined.
 */
export const chooseOrderText = (choosed: string): string | undefined => {
  const numValue = parseInt(choosed);

  if (isNaN(numValue) || numValue === 0) {
    // Se não for um número válido ou for zero, retorna undefined (sem ordenação)
    return undefined;
  }

  const absValue = Math.abs(numValue);
  const prefix = numValue > 0 ? "" : "-";

  if (absValue === 1) {
    return `${prefix}final_price`;
  } else if (absValue === 2) {
    return `${prefix}date`;
  }

  // Para qualquer outro número, retorne undefined
  return undefined;
};

// --- Tipagem do Estado e Ações ---

// O estado completo, incluindo a query e as funções de ação
interface QueryState {
  query: QueryParams;

  // Ações
  setSearch: (value: string | undefined) => void;
  setOrdering: (value: string) => void;
  // filterCountry: (value: number | undefined) => void;
  filterCity: (value: number | undefined) => void;
  filterAirline: (value: number | undefined) => void;
  setPage: (value: number) => void;
  setTo: (value: boolean) => void;
  resetPage: () => void;
}

// --- Hook Zustand ---

const useQueryStory = create<QueryState>((set) => ({
  // Estado Inicial
  query: {
    to: false,
    city__country: undefined,
    city: undefined,
    airline: undefined,
    search: undefined,
    ordering: undefined,
    page: 1, // Valor inicial da página
  },

  // Ações (Setters)
  setSearch: (value) =>
    set((store) => ({
      query: { ...store.query, search: value || undefined },
    })),

  setOrdering: (value: string) =>
    set((store) => ({
      query: {
        ...store.query,
        // Chama a função utilitária para converter o valor
        ordering: chooseOrderText(value),
      },
    })),

  // Funções de filtro (Country, City, Airline)
  // Se o valor for 0, é tratado como undefined (limpar filtro)
  // filterCountry: (value) =>
  //   set((store) => ({
  //     query: { ...store.query, city__country: value || undefined },
  //   })),

  filterCity: (value) =>
    set((store) => ({
      query: { ...store.query, city: value || undefined },
    })),
  setTo: (value: boolean) =>
    set((store) => ({
      query: { ...store.query, to: value },
    })),

  filterAirline: (value) =>
    set((store) => ({
      query: { ...store.query, airline: value || undefined },
    })),

  // Funções de paginação
  setPage: (value: number) =>
    set((store) => ({
      query: { ...store.query, page: value || 1 },
    })),

  resetPage: () =>
    set((store) => ({
      query: { ...store.query, page: 1 },
    })),
}));

export default useQueryStory;
