import { Branch } from "./branch";

export interface Workshop {
  id: string;
  name: string;
  branches: Branch[];
}