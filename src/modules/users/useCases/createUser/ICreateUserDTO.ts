export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  status_id: number;
}

export interface ICreateUserServiceParamsDTO {
  name: string;
  email: string;
  password: string;
}
