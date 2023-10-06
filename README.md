# Authors
* **Leo Simberg**: Lead IoT Partner Solutions Architect

# Create Sitewise Models and Assets using CDK

This is an illustrative AWS Cloud Development Kit (CDK) project, showcasing the process of creating Sitewise models and assets for a Factory with a single generic production line and two generic machines using AWS CDK. This project serves as a valuable resource for comprehending the seamless integration of CDK with Sitewise, enabling the construction of comprehensive Sitewise models, assets, and hierarchies through Infrastructure as Code (IaC).

**How to use CDK** - [CDK Workshop](https://cdkworkshop.com/)

## Overview

In this example, we will use the AWS CDK to define the infrastructure for a factory and create Sitewise models and assets for the following components:

- One generic Factory
- One generic Production Line connected to the factory.
- Two generic Machines connected to the production line.

The CDK constructs created in this example include:

### Models (lib/models):
- `generic-factory-model-constructor.ts` - A construct representing the model for a generic factory.
- `generic-production-line-model-constructor.ts` - A construct representing the model for a generic production line.
- `generic-machine-line-model-constructor.ts` - A construct representing the model for a generic machine.

### Assets (lib/assets):
- `factories-asset-construct.ts` - A construct representing the entire factory.
- `production-asset-construct.ts` - A construct representing the production line.
- `machines-asset-construct.ts` - A construct representing a machine.

## Prerequisites

Before you begin, ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org/) installed (CDK is based on Node.js).
- AWS CDK installed globally. You can install it using npm:
  ```bash
  npm install -g aws-cdk

- AWS CLI configured with appropriate credentials.


## Installation
1. Clone this repository:

```bash
git clone https://github.com/aws-samples/leverage-cdk-with-aws-iot-sitewise-demo.git
```

2. Change into the project directory:
```bash
cd leverage-cdk-with-aws-iot-sitewise-demo
```

3. Install dependencies:
```bash
npm install
```

## Usage
1. Define your factory, production line, and machines in the lib/lib/aws-iot-sitewise-cdk-demo-stack.ts file. 

```typescript
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

```
2. Deploy the CDK application to create the Sitewise models and assets on AWS:

```bash
cdk deploy
```

## Cleanup
To remove the deployed resources, run the following command:

```bash
cdk destroy
```

### Contributing
Contributions to improve and extend this sample project are welcome! If you find a bug or have an idea for an enhancement, please open an issue or submit a pull request.

### License
This library is licensed under the MIT-0 License. See the LICENSE file.

### 
# Special Thanks
* Bin Qiu: Partner Solutions Architect 
* Nick White: Partner Solutions Architect
