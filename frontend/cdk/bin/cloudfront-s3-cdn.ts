#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { NextCloudFrontTemplateStack } from '../lib/cloudfront-s3-cdn-stack';
import { nextJsExport } from '../lib/process/setup';

const app = new cdk.App();

const env = app.node.tryGetContext('env');
const appName =
  app.node.tryGetContext('appkName') ||
  `${env ? `${env}-` : ''}next-cloudfront-template`;
const clientId = app.node.tryGetContext('clientId');
const apiUrl = app.node.tryGetContext('apiUrl');

nextJsExport({
  clientId,
  apiUrl,
});

// eslint-disable-next-line no-new
new NextCloudFrontTemplateStack(app, `${appName}-stack`, {
  appName,
});
