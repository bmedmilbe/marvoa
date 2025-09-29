import useGroundGeneralInfinite from "../useGroundGeneralInfinite";
import { type SellPaymentExpense } from "./useSellsByClients";

export const useBalances = () =>
  useGroundGeneralInfinite<SellPaymentExpense>(`balances`, ["balances"]);
