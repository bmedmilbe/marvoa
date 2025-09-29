import useGroundGeneralInfinite from "../useGroundGeneralInfinite";
import { type SellPaymentExpense } from "./useSellsByClients";

export const useExpensesByDestine = (
  destineId: number
  //   query_params: QueryParamsClient
) =>
  useGroundGeneralInfinite<SellPaymentExpense>(
    `destines/${destineId}/expenses`,
    ["destines", destineId]
  );
