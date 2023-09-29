// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface FactoryAssetProps {
    name: string       // Factory name
    modelId: string    // Model to follow
    factoryHierarchyId: string  // Identification of the factory hierarchy
    productionLineId: string[]    // Production Line to add on the hierarchy
}

export class FactoryAsset extends Construct{
    public readonly factory: sitewise.CfnAsset;
    public readonly ref: string;
    
    constructor(scope: Construct, id: string, props: FactoryAssetProps) {
        super(scope, id);
        
        this.factory = new sitewise.CfnAsset(this, 'FactoryAsset', {
            assetName: props.name,
            assetModelId: props.modelId,
            assetHierarchies: props.productionLineId.map((productionLineRef) => { //Lambda to transform the array into object
                return {
                    childAssetId: productionLineRef,
                    logicalId: props.factoryHierarchyId
                };
            })
        });
        
        this.ref = this.factory.ref;
    }
}