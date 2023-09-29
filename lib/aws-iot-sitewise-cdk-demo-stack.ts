// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import * as cdk from 'aws-cdk-lib';
import * as sitewise from 'aws-cdk-lib/aws-iotsitewise';
import { GenericFactoryModel } from './models/generic-factory-model-constructor';
import { GenericProductionLineModel } from './models/generic-production-line-model-constructor';
import { GenericMachineModel } from './models/generic-machine-model-constructor';
import { MachineAsset } from './assets/machines-asset-construct';
import { ProductionLineAsset } from './assets/production-asset-construct';
import { FactoryAsset } from './assets/factories-asset-construct';
 
// Main Stack that will create all models and assets
export class CdkSitewiseDemoStack extends cdk.Stack {
  public genericMachineModel: GenericMachineModel;
  public genericProductionLineModel: GenericProductionLineModel;
  public genericFactoryModel: GenericFactoryModel;
  public machine1Asset: MachineAsset;
  public machine2Asset: MachineAsset;
  public productionLine1Asset: ProductionLineAsset;
  public factory1Asset: FactoryAsset;
  
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**************************************************************************/
    /*                            Create Models                               */
    /**************************************************************************/

    //Create the Generic Motor Model
    this.genericMachineModel = new GenericMachineModel(this, 'GenericMachineModel', {});


    //Create the Production Line Model
    this.genericProductionLineModel = new GenericProductionLineModel(this, 'ProductionLineDemoModel', {
            genericMachineModel: this.genericMachineModel
    });
    
    //Create the Factory Model and the hierachy between the Factory and the Production Line
    this.genericFactoryModel = new GenericFactoryModel(this, 'FactoryModel', {
            productionLineModel: this.genericProductionLineModel
    });


    /**************************************************************************/
    /*                            Create Assets                               */
    /**************************************************************************/
    
    // Create the Machine 1 Asset
    this.machine1Asset = new MachineAsset(this, 'MachineAsset_1', {
          name: 'Machine-1',
          modelId: this.genericMachineModel.ref
    })
    
    // Create the Machine 2 Asset
    this.machine2Asset = new MachineAsset(this, 'MachineAsset_2', {
          name: 'Machine-2',
          modelId: this.genericMachineModel.ref
    })
    
    // Create the Production line 1 and associate the Machine
    this.productionLine1Asset = new ProductionLineAsset(this, 'ProductionLineAsset_1', {
          name: 'ProductionLine-1',
          modelId: this.genericProductionLineModel.ref,
          productionLineHierarchyId: this.genericProductionLineModel.productionMachineHierarchyLogicalId,
          machineId: [ this.machine1Asset.ref, this.machine2Asset.ref ]
    })
    
    
    // Create the Factory 1 and associate the Production line
    this.factory1Asset = new FactoryAsset(this, 'FactoryAsset_1', {
          name: 'Factory-11',
          modelId: this.genericFactoryModel.ref,
          factoryHierarchyId: this.genericFactoryModel.factoryProductionHierarchyLogicalId,
          productionLineId: [ this.productionLine1Asset.ref ]
    })

  }
}
