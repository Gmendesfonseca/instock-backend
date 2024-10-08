export interface JwtPayload {
  sub: string;
  exp: number;
  user: {
    id: string;
    username: string;
    email: string;
    type: 'PERSON' | 'COMPANY';
    profile_id: string;
    config: {
      auth2f: boolean;
      default_language: string;
      default_interface: string;
      schedule_default: string;
      master: boolean;
    };
  };
}
