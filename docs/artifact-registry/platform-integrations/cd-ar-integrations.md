---
title: Artifact Registry and Continuous Delivery
description: Deep dive into the native integrations between the Artifact Registry and Continuous Delivery module.
sidebar_position: 10
sidebar_label: Continuous Delivery
tags:
  - artifact-registry
  - har
  - cd
  - integrations
  - kubernetes
  - aws-lambda
keywords:
  - harness artifact registry integrations
  - continuous delivery with artifact registry
  - deploy docker artifacts to Kubernetes
  - Deploy generic artifacts to AWS Lambda.
  - aws lambda deployment with har
  - artifact traceability and deployments
---

import DocImage from '@site/src/components/DocImage';

Harness Artifact Registry (HAR) integrates seamlessly with Harness Continuous Delivery (CD) pipelines, enabling you to store, manage, and deploy artifacts efficiently across your software delivery lifecycle. This integration provides a unified experience for artifact management and deployment, ensuring traceability from build to production.


## Supported CD Swimlanes

Harness Artifact Registry can be used with a wide range of CD swimlanes. To view the complete list of supported CD swimlanes and integrations, refer to the [Artifacts tab in the CD Integrations documentation](https://developer.harness.io/docs/continuous-delivery/cd-integrations).

## Configuring CD Services with Harness Artifact Registry

Once you have artifacts stored in your Harness Artifact Registry, you can configure your CD services to use HAR as the artifact source. When setting up your service, select **Harness Artifact Registry** as the artifact source, specify the registry and repository details, and define your artifact selection criteria (tags, versions, or latest). Once configured, your service is ready to be deployed, and the CD pipeline will automatically fetch artifacts from HAR during execution.

For detailed step-by-step instructions on configuring services with Harness Artifact Registry, refer to the [Use Artifacts from Harness Artifact Registry documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#use-artifacts-from-harness-artifact-registry).

## Deployment Workflow

Once your CD service is configured with Harness Artifact Registry, the deployment pipeline automatically authenticates with HAR, pulls the specified artifact version, and deploys it to your target environment.

<DocImage path={require('./static/cd-deploy.png')} />

## Benefits of HAR and CD Integration

- **Unified Platform Experience**: Consistent authentication, permissions, and audit logging across artifact management and deployment workflows
- **Automated Artifact Selection**: Configure pipelines to automatically select artifact versions based on tags, labels, or runtime inputs
- **Security and Compliance**: Ensure only approved artifacts are deployed with built-in access controls and audit trails

## Next Steps

- Learn more about [CD integrations and supported swimlanes](https://developer.harness.io/docs/continuous-delivery/cd-integrations)
- Follow the detailed guide on [configuring artifact sources in CD services](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#use-artifacts-from-harness-artifact-registry)
- Explore [Artifact Registry best practices](/docs/artifact-registry/ar-best-practices) for optimal configuration
