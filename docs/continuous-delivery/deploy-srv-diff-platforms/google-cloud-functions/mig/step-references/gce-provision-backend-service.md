---
title: GCE Provision Backend Service
description: Provision a Google Cloud backend service.
sidebar_position: 2
tags:
  - gce-provision-backend-service
  - gce-provision-backend-service-step
---

# GCE Provision Backend Service

The **GCE Provision Backend Service** step creates or updates a backend service in Google Cloud. This is a utility step that can be used to provision any backend service within GCP, not limited to MIG deployments.

:::note Prerequisites
- This step must be added within a **Container Step Group**. The step runs as a containerized task and requires the container infrastructure configuration provided by the step group.
- A **Download Harness Store** or **Git Clone** step must be added before this step to fetch the backend service configuration file from the Harness File Store or a Git repository.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/gce-provision-backend.png')} width="40%" height="40%" title="Click to view full size image" />
</div>
:::

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/gce-provision-backend-2.png')} width="40%" height="40%" title="Click to view full size image" />
</div>

## Deployment flow

1. **Download Harness Store**: Fetches the backend service configuration JSON file from the Harness File Store and makes it available for the next step. When configuring this step, specify the **Download Directory Path** (e.g., `/harness`) where the file will be downloaded.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/harness-store.png')} width="40%" height="40%" title="Click to view full size image" />
</div>

2. **GCE Provision Backend Service**: Reads the configuration file and creates or updates the backend service in the specified GCP project and region. The **Config File Path** in this step must match the download directory from the previous step (e.g., `/harness/backendservice.json`).

## What this step does

- Creates a new backend service in GCP if it doesn't exist
- Updates an existing backend service if it already exists
- Configures load balancing, health checks, and backend groups based on the configuration file

## Step parameters

| Parameter | Description | Required |
|-----------|-------------|----------|
| **GCP Connector** | Harness connector for authenticating to GCP. This connector provides access to create and manage backend services. | Yes |
| **Project** | The GCP project ID where the backend service will be created (e.g., `my-project`). | Yes |
| **Region** | The GCP region for the backend service (e.g., `us-central1`). | Yes |
| **Backend Service** | The name of the backend service to create or update (e.g., `prod-backend-service`). | Yes |
| **Config File Path** | Path to the backend service configuration JSON file. This path must match the **Download Directory Path** configured in the Download Harness Store step, combined with the filename (e.g., if download directory is `/harness` and filename is `backendservice.json`, use `/harness/backendservice.json`). | Yes |
| **Timeout** | Maximum time allowed for the step to complete (default: `10m`). | No |

## Container configuration

| Parameter | Description |
|-----------|-------------|
| **Container Registry** | Harness connector for authenticating to your container registry. This connector pulls the deployment plugin image. |
| **Image** | The deployment plugin container image. Use the official Harness image: [`harness/gce-provision-backend-service:0.0.1-linux-amd64`](https://hub.docker.com/r/harness/gce-provision-backend-service/tags) |

## Backend service configuration file

The configuration file defines the backend service properties in JSON format. Store this file in the Harness File Store and reference it using the Download Harness Store step.

```json
{
  "name": "my-backend-service",
  "loadBalancingScheme": "INTERNAL_SELF_MANAGED",
  "protocol": "HTTP",
  "portName": "http",
  "sessionAffinity": "NONE",
  "timeoutSec": 30,
  "connectionDraining": {
    "drainingTimeoutSec": 300
  },
  "healthChecks": [
    "projects/PROJECT_ID/global/healthChecks/HEALTH_CHECK_NAME"
  ],
  "backends": [
    {
      "group": "projects/PROJECT_ID/zones/ZONE/instanceGroups/MIG_NAME",
      "balancingMode": "UTILIZATION",
      "maxUtilization": 0.8,
      "capacityScaler": 1.0
    }
  ]
}
```

### Using expressions for dynamic values

You can use Harness expressions in the configuration file to dynamically reference values from other pipeline steps. This is useful when the MIG name or other values are generated during pipeline execution.

For example, to reference a MIG name from a previous deployment step, use an expression like:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.DEPLOY_STEP_ID.output.outputVariables.MIG_NAME>
```

The exact expression path depends on your pipeline structure—replace `STAGE_ID`, `STEP_GROUP_ID`, and `DEPLOY_STEP_ID` with the actual identifiers from your pipeline configuration.

For more information on using expressions, see [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables/#get-inputoutput-expressions-from-execution-details).

## Pipeline YAML

```yaml
- stepGroup:
    name: MIG
    identifier: MIG
    steps:
      - step:
          type: DownloadHarnessStore
          name: DownloadHarnessStore
          identifier: DownloadHarnessStore
          spec:
            files:
              - /mig_config/backendservice.json
      - step:
          type: GCEProvisionBackendService
          name: GCEProvisionBackendService
          identifier: GCEProvisionBackendService
          spec:
            project: PROJECT_ID
            backendService: my-backend-service
            gcpConnectorRef: GCP_CONNECTOR_ID
            configFilePath: /harness/backendservice.json
            connectorRef: account.harnessImage
            image: harness/gce-provision-backend-service:0.0.1-linux-amd64
            region: us-central1
          timeout: 10m
    stepGroupInfra:
      type: KubernetesDirect
      spec:
        connectorRef: K8S_CONNECTOR_ID
```
