import useGroundGeneralAll from "../useGroundGeneralAll";
import { type Destine } from "../../../components/forms/AddDestineForm";

export const useDestines = () =>
  useGroundGeneralAll<Destine>("destines", "destines");
