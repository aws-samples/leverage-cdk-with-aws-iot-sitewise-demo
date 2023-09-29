#!/usr/bin/env node
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import { CdkSitewiseDemoStack } from '../lib/aws-iot-sitewise-cdk-demo-stack';

const app = new cdk.App();
new CdkSitewiseDemoStack(app, 'CdkSitewiseDemoStack');