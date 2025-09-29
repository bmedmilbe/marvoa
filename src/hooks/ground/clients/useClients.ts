import useGroundGeneralAll from "../useGroundGeneralAll";
import { type Client } from "../../../components/forms/AddClientForm";

export const useClients = () =>
  useGroundGeneralAll<Client>("clients", "clients");
