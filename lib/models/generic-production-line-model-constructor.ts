// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';
import { GenericMachineModel } from './generic-machine-model-constructor';

export interface ProductionLineModelProps {
    genericMachineModel: GenericMachineModel;
}

//Create the Production Line Model via a CDK Construct
export class GenericProductionLineModel extends Construct {
    public readonly ref: string;
    public readonly productionMachineHierarchyLogicalId: string;
    public readonly genericMachineModel: GenericMachineModel;
    private productionLineModel: sitewise.CfnAssetModel;
    
    // Define the construct
    constructor(scope:Construct, id: string, props: ProductionLineModelProps){
        super(scope, id);
        
        this.genericMachineModel = props.genericMachineModel;
        
        //Chreate a LogicalID for the Production Line and the machine Hierarchy
        this.productionMachineHierarchyLogicalId = 'ProductionMachineHierarchy';
    
        // Create the Production Line Model
        this.productionLineModel = new sitewise.CfnAssetModel(this, 'Generic-ProductionLineModel', {
          assetModelName: 'Generic Production Line Model',
          assetModelDescription: 'Generic Production Lined Model Description',
          assetModelProperties: [
              {
                name: 'name',
                dataType: 'STRING',
                logicalId: 'GenericProductionLineNameModelAttribute',
                type: {
                  typeName: 'Attribute',
                  attribute: { defaultValue: 'Production Line'} 
                }
              }
          ],
          assetModelHierarchies: [
            {
                childAssetModelId: this.genericMachineModel.ref,
                logicalId: this.productionMachineHierarchyLogicalId,
                name: 'Production Line - Generic Machine Model Hiearchy'
            }
          ]
        });
        
        // Print the Ids
        new cdk.CfnOutput(this, 'Generic Production Line Model ID', {
            value: this.productionLineModel.ref,
            description: 'LogicalID of Generic Production Line model.'
        });

        new cdk.CfnOutput(this, 'Production-Machine Hierarchy Logical Id', {
            value: this.productionMachineHierarchyLogicalId,
            description: 'LogicalID of hierarchical association between Production Line and Generic Machine models.'
        });

        // Set the ref variable
        this.ref = this.productionLineModel.ref;
    }
}