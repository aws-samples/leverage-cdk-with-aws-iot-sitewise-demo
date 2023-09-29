// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';
import { GenericProductionLineModel } from './generic-production-line-model-constructor';

export interface GenericFactoryModelProps {
    productionLineModel: GenericProductionLineModel;
}


//Create the Factory Model via a CDK Construct
export class GenericFactoryModel extends Construct {
    private factoryModel: sitewise.CfnAssetModel;
    public readonly ref: string;
    public readonly factoryProductionHierarchyLogicalId: string;
    public readonly productionLineModel: GenericProductionLineModel
    
    // Create the Factory Model
    constructor(scope: Construct, id: string, props: GenericFactoryModelProps) {
        super(scope, id);
        this.productionLineModel = props.productionLineModel;
        this.factoryProductionHierarchyLogicalId = 'Factory_ProductionLineHierarchy';
        
        // Create the Factory Model
        this.factoryModel = new sitewise.CfnAssetModel(this, 'FactoryModel', {
            assetModelName: 'Generic Factory Model',
            assetModelDescription: 'Generic Factory Model Description',
            assetModelProperties: [
                {
                    name: 'name',
                    dataType: 'STRING',
                    logicalId: 'FactoryNameModelAttribute',
                    type: {
                        typeName: 'Attribute',
                        attribute: { defaultValue: 'Factory'} 
                    }
                }, 
                {
                    name: 'region',
                    dataType: 'STRING',
                    logicalId: 'FactoryRegionModelAttribute',
                    type: {
                        typeName: 'Attribute',
                        attribute: { defaultValue: 'US-Texas'} 
                    }
                }
            ],
            assetModelHierarchies: [
                {
                    childAssetModelId: this.productionLineModel.ref,
                    logicalId: this.factoryProductionHierarchyLogicalId,
                    name: 'Factory - Production Line Hiearchy'
                }
            ]
        });
        
        // Print the Ids
        new cdk.CfnOutput(this, 'Production Line Model Id', {
            value: this.productionLineModel.ref,
            description: 'LogicalID of the Production Line model.'
        });
        
        new cdk.CfnOutput(this, 'Factory-Production Hierarchy Logical Id', {
            value: this.factoryProductionHierarchyLogicalId,
            description: 'LogicalID of hierarchical association between Factory and Production Line models.'
        });
        
        // Set the ref variable
        this.ref = this.factoryModel.ref;
    }
}