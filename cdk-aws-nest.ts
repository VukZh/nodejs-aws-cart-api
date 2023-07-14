import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { Duration } from 'aws-cdk-lib';

import * as dotenv from 'dotenv';
dotenv.config();

const app = new cdk.App();

const stack = new cdk.Stack(app, 'LambdaNestStackVuk', {
  env: { region: 'eu-west-1' },
});

const sharedLambdaProps: Partial<NodejsFunctionProps> = {
  runtime: lambda.Runtime.NODEJS_18_X,
  environment: {
    PG_HOST: process.env.PG_HOST!,
    PG_PORT: process.env.PG_PORT!,
    PG_DATABASE: process.env.PG_DATABASE!,
    PG_USERNAME: process.env.PG_USERNAME!,
    PG_PASSWORD: process.env.PG_PASSWORD!,
    PRODUCT_AWS_REGION: process.env.PRODUCT_AWS_REGION!,
  },
  bundling: {
    externalModules: [
      'class-transformer',
      '@nestjs/microservices',
      '@nestjs/websockets/socket-module',
      'class-validator',
      '@nestjs/microservices/microservices-module',
      'pg-native',
      'sqlite3',
      'pg-query-stream',
      'oracledb',
      'better-sqlite3',
      'tedious',
      'mysql',
      'mysql2',
    ],
  },
};

const NestLambdaV = new NodejsFunction(stack, 'NestLambdaVuk', {
  ...sharedLambdaProps,
  functionName: 'nestAWSVuk',
  entry: 'dist/main.js',
  handler: 'handler',
  timeout: Duration.minutes(15),
});

const api = new apiGateway.HttpApi(stack, 'NestAPIV', {
  corsPreflight: {
    allowHeaders: ['*'],
    allowOrigins: ['*'],
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
  },
});

api.addRoutes({
  path: '/',
  methods: [apiGateway.HttpMethod.ANY],
  integration: new HttpLambdaIntegration(
    'NestLambdaIntegrationRoot',
    NestLambdaV,
  ),
});

api.addRoutes({
  path: '/{proxy+}',
  methods: [apiGateway.HttpMethod.ANY],
  integration: new HttpLambdaIntegration(
    'NestLambdaIntegrationProxy',
    NestLambdaV,
  ),
});
