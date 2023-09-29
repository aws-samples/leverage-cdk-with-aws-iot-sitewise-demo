// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface MachineAssetProps {
    name: string       // Machine name
    modelId: string    // Model to follow
}

export class MachineAsset extends Construct{
    public readonly machine: sitewise.CfnAsset;
    public readonly ref: string;
    
    constructor(scope: Construct, id: string, props: MachineAssetProps) {
        super(scope, id);
        
        this.machine = new sitewise.CfnAsset(this, 'MachineAsset', {
            assetName: props.name,
            assetModelId: props.modelId,
            assetProperties: [
                {
                    logicalId: 'MachineConsumptionMeasurement',
                    alias: `machines/${props.name}/consumption`,
                    notificationState: 'ENABLED'
                },    
                {
                    logicalId: 'MotorTemperatureFahMeasurement',
                    alias: `machines/${props.name}/temperature`,
                    notificationState: 'ENABLED'
                },           
            ]
        });
        
        this.ref = this.machine.ref;
    }
}