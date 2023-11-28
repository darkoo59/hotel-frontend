import { Role } from "./Role";

export interface User {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: string;
    sex?: number;
    birthdate?: string;
    role?: string;
  }