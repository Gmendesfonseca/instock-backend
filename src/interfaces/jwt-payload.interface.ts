export interface JwtPayload {
  sub: string;
  user: {
    id: string;
    username: string;
    email: string;
    type: string;
  };
  iat?: number;
  exp?: number;
}
