export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  access_token: string;
  refresh_token: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string; 
}
