// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface ProductionLineAssetProps {
    name: string       // Production Line name
    modelId: string    // Model to follow
    productionLineHierarchyId: string  // Identification of the production line hierarchy
    machineId: string[]     // Machine to add on the hierarchy
}

export class ProductionLineAsset extends Construct{
    public readonly productionLine: sitewise.CfnAsset;
    public readonly ref: string;
    
    constructor(scope: Construct, id: string, props: ProductionLineAssetProps) {
        super(scope, id);
        
        this.productionLine = new sitewise.CfnAsset(this, 'ProductionLineAsset', {
            assetName: props.name,
            assetModelId: props.modelId,
            assetHierarchies: props.machineId.map((ref) => { //Lambda to transform the array into object
                return {
                    childAssetId: ref,
                    logicalId: props.productionLineHierarchyId
                };
            })
        });
        
        this.ref = this.productionLine.ref;
    }
}