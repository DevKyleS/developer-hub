---
title: HSF Hub
description: Understand HSF Hub
sidebar_position: 4
---

HSF 2.4 introduces the ability to replace IDP workflows with Harness pipelines. HSF Hub has all of the same workflows that you would see in an instance of HSF with Harness IDP but now as pipelines in the HSF Hub project.

### How to enable HSF Hub:

In Harness Pilot Light there are variables `should_use_hsf_hub` and `should_use_harness_idp` if `should_use_hsf_hub` is set to false and `should_use_harness_idp` is set to true, which is the default value, it will deploy as prior versions did - to use Harness IDP.

If `should_use_harness_idp` is set to false, we remove this dependency on IDP and deploy without it. In the deployment, the IDP workflows are stripped out, the pipeline stage types are changed from IDP to IaCM and a `HSF_Core_manager` workspace is created as a placeholder for system stage executions.

If `should_use_hsf_hub` is set to true, we create a HSF Hub project and Deploy HSF Hub pipeline to create a location for users to deploy best practice pipelines.

### What happens during the initial deployment?

When you go through the deployment of Solutions Factory there will be two options during the deployment where you are able to decide if you want Harness IDP enabled and if you want HSF Hub enabled. This will set the two variables `should_use_hsf_hub` and `should_use_harness_idp`.

### How does it work?

When Harness IDP is enabled, all of the inputs were defined in the catalog_template.yaml file and shown when you executed the IDP flow. Now, without the IDP frontend, you will have to navigate to the HSF Hub project and pick the pipeline that has the functionality that you want. You will add in your inputs and then it will kick of a chained pipeline that will kick start the Create and Manage IACM Workspace pipeline, just like what would happen when you executed the IDP workflow.

With HSF Hub, we changed how permissions are implemented since we no longer could use the ones created through IDP. We’ve implemented ABAC.

- We’ve created a role called `HubOperator` that only has access to view and execute pipelines
- A role called `Shared_Resource_Access` which allows access to shared resources in the project such as secrets and templates
- And a resource group for each of the HSF Hub pipelines. By combining a role and resource group you are able to control which pipelines a user can run.

### Changing Operating Modes to use HSF Hub

Since HSF Hub was created starting version 2.4 you will need to make sure that you are on 2.4 or later. If you need help updating please refer back to this document.

1. Navigate to the Harness Pilot Light workspace in the Solutions Factory project. 
2. Go into the Connectors and Variables tab and scroll down to find the `should_use_harness_idp` and set it to false.
3. Click provision and wait till it's completed. Verify that the HSF Core Manager is created.
4. Navigate to the Solutions Factory Workspace and add in the variables `should_use_hsf_hub` set to true and `should_use_harness_idp` set to true.
5. Click provision. This will remove the IDP pipelines and change the Create and Manage IaCM pipeline to use IaCM steps. 
6. Navigate to pipelines and run Deploy Solutions Factory.

If you are upgrading from a version prior to 2.4 you will also need to update your templates because HSF Hub now points to Custom Template Library instead of Harness Template Library

1. Pull in example files for the specific templates that you are using.
2. Add in customized inputs and additional variables.
3. Run Deploy HSF Hub.

Deploy HSF Hub is a pipeline that will be created when the `should_use_hsf_hub` variable is set to true. This pipeline will clone the Custom Harness Template Library repository and use the hub registration file to parse through the resources to create the pipelines that live inside the HSF Hub project. These pipelines can be customized with pre and post steps, role bindings and resource groups.