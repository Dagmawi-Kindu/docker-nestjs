export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}
export interface ICreateNote {
  title: string;
  content: string;
}
export interface IUpdateNote extends ICreateNote {}
