import useGroundGeneralAll from "../useGroundGeneralAll";
import { type Product } from "../../../components/forms/AddProductForm";

export const useProducts = () =>
  useGroundGeneralAll<Product>("products", "products");
