interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  role?: Role;
  address?: string;
  phone?: string;
  sex?: Sex;
  birthdate?: string;
}

interface Guest extends User {

}

interface Host extends User {

}

enum Role {
  CLIENT = 0,
  ADMIN = 1
}

enum Sex {
  MALE = 0,
  FEMALE = 1
}

export type { User, Guest, Host, Role, Sex }