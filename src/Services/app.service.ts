import { Body, Injectable } from '@nestjs/common';
import { User } from 'src/Entities/user.entity';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { response } from 'express';
import { AuthDto } from 'src/DTO/Auth/AuthDTO';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async authenticate(@Body() body: AuthDto): Promise<any> {
    const user = await this.validateAuth(body);
    const payload = await this.createPayload(user);
    const access_token = await this.createToken(payload);
    const token_type = 'Bearer';
    const expires_in = process.env.JWT_EXPIRES_IN;
    return response.json({
      token_type,
      access_token,
      expires_in,
    });
  }

  private async validateAuth(body: AuthDto): Promise<any> {
    const validate = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where({ email: body.email, password: body.password })
      .getOne();
    if (!validate || validate.isActive === false) return 'Invalid credentials';
    else return validate;
  }

  private async createPayload(user): Promise<any> {
    return {
      id: user.id,
      email: user.email,
      name: user.name.concat(' ', user.lastName),
    };
  }

  private async createToken(payload: any): Promise<string> {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}
