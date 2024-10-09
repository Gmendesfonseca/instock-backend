export interface JwtPayload {
  sub: string;
  exp?: number;
  user: {
    id: string;
    username: string;
    email: string;
    type: string;
  };
}
