// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { Construct } from 'constructs';

export interface GenericMachineModelProps {}

//Create the Generic Machine Model via a CDK Construct
export class GenericMachineModel extends Construct {
    public readonly ref: string;
    private genericMachineModel: sitewise.CfnAssetModel;
    
    // Define the construct
    constructor(scope:Construct, id: string, props: GenericMachineModelProps){
        super(scope, id);
    
        // Create the Generic MachineModel
        this.genericMachineModel = new sitewise.CfnAssetModel(this, 'GenericMachineModel', {
          assetModelName: 'Generic Machine Model',
          assetModelDescription: 'Generic Machine Model Description',
          assetModelProperties: [
            // ATTRIBUTES
              {
                name: 'name',
                dataType: 'STRING',
                logicalId: 'GenericMachineNameModelAttribute',
                type: {
                  typeName: 'Attribute',
                  attribute: { defaultValue: 'Generic Machine'} 
                }
              },
              {
                name: 'brand_model',
                dataType: 'STRING',
                logicalId: 'GenericMachineBrand_ModelModelAttribute',
                type: {
                  typeName: 'Attribute',
                  attribute: { defaultValue: 'Machine brand_model'} 
                }
              },
              
              // MEASUREMENTS
              { 
                name: 'Consumption',
                dataType: 'DOUBLE',
                logicalId: 'MachineConsumptionMeasurement',
                unit: 'A',
                type: { typeName: 'Measurement' }
              },
              { 
                name: 'Motor Temperature Fahrenheit',
                dataType: 'DOUBLE',
                logicalId: 'MotorTemperatureFahMeasurement',
                unit: 'F',
                type: { typeName: 'Measurement' }
              },
              
              // TRANSFORMS
              { 
                name: 'Motor Temperature Celsius',
                dataType: 'DOUBLE',
                logicalId: 'MotorTemperatureCelMeasurement',
                unit: 'C',
                type: { 
                  typeName: 'Transform', 
                  transform: {
                    expression: '(temp - 32) * 5/9',
                    variables: [
                      {
                        name: 'temp',
                        value: { propertyLogicalId: 'MotorTemperatureFahMeasurement' }
                      }
                    ]
                  }
                }
              },
              
              // METRICS
              {
                name: 'Average Motor Temperature',
                dataType: 'DOUBLE',
                logicalId: 'AverageMotorTemperatureMeasurement',
                unit: 'F',
                type: {
                  typeName: 'Metric',
                  metric: {
                    expression: 'avg(temp)',
                    variables: [
                      {
                        name: 'temp',
                        value: { propertyLogicalId: 'MotorTemperatureFahMeasurement' }
                      }
                    ],
                    window: { tumbling: { interval: '5m' } }
                  }
                }
              },
            ]
        });
        
        // Print the Ids
        new cdk.CfnOutput(this, 'Generic Machine Model ID', {
            value: this.genericMachineModel.ref,
            description: 'LogicalID of Generic Machine model.'
        });

        // Set the ref variable
        this.ref = this.genericMachineModel.ref;
    }
}