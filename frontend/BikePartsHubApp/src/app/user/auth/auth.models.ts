export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  role:string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string;
}

export interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}
