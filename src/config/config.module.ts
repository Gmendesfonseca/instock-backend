import * as Joi from 'joi';
import { LogLevel, Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';
import { join } from 'path';

const logLevels: LogLevel[] = [
  'log',
  'error',
  'warn',
  'debug',
  'verbose',
  'fatal',
];

type ApplicationProperties = {
  DRIVE_DISK: string;
  PORT: number;
  NODE_ENV: string;
  LOG_LEVEL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
};

type DatabaseProperties = {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_LOGGING: boolean;
  DB_AUTO_LOAD_MODELS: boolean;
};

export type ConfigProperties = DatabaseProperties & ApplicationProperties;

const configSchema: Joi.StrictSchemaMap<ConfigProperties> = {
  DRIVE_DISK: Joi.string().valid('local', 's3').default('local'),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  LOG_LEVEL: Joi.string()
    .custom((value, helpers) => {
      const levels = value
        .split(',')
        .map((level) => level.trim()) as LogLevel[];
      const invalidLevels = levels.filter(
        (level) => !logLevels.includes(level),
      );
      if (invalidLevels.length > 0) {
        return helpers.error('any.invalid', {
          levels: invalidLevels.join(', '),
        });
      }
      return levels;
    }, 'custom log level validation')
    .default('log,error,warn')
    .messages({
      'any.invalid': 'LOG_LEVEL contains invalid values: {{#levels}}',
    })
    .description('Allowed log levels: log, error, warn, debug, verbose'),
  PORT: Joi.number().port().default(5000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().integer().required(),
  DB_LOGGING: Joi.boolean().default(false),
  DB_AUTO_LOAD_MODELS: Joi.boolean().default(false),
};

@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      envFilePath: [join(process.cwd(), `.env`), '.env'],
      validationSchema: Joi.object(configSchema),
    }),
  ],
})
export class ConfigModule {}
