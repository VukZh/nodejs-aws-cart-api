import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import {Duration} from "aws-cdk-lib";

const app = new cdk.App();

const stack = new cdk.Stack(app, 'LambdaNestStackVuk', {
  env: { region: 'eu-west-1' },
});

const sharedLambdaProps: Partial<NodejsFunctionProps> = {
  runtime: lambda.Runtime.NODEJS_18_X,
  environment: {
    PRODUCT_AWS_REGION: 'eu-west-1',
  },
  bundling: {
    externalModules: [
      'class-transformer',
      '@nestjs/microservices',
      '@nestjs/websockets/socket-module',
      'class-validator',
      '@nestjs/microservices/microservices-module',
    ],
  },
};

const NestLambdaV = new NodejsFunction(stack, 'NestLambdaVuk', {
  ...sharedLambdaProps,
  functionName: 'nestAWSVuk',
  entry: 'dist/main.js',
  handler: 'handler',
  timeout: Duration.seconds(10),
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