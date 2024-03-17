import { Status } from "../../entities/status.entity";
import { CreatePetDTO } from "./create-pet";

export interface UpdatePet extends Omit<CreatePetDTO, 'statusId'> {
  name: string;
  status: Status;
}