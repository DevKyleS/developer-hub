---
title: What's supported in Harness IaCM
description: Supported Platforms and Features in Harness IaCM
sidebar_label: What's Supported
sidebar_position: 10
---

import HarnessApiData from '../../src/components/HarnessApiData/index.tsx';

This page describes supported platforms and technologies for Harness IaCM specifically.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](https://developer.harness.io/docs/platform/platform-whats-supported/).

## Prerequisites
To configure an IaCM workspace and create pipelines, you must have the following:
- An active cloud provider account
- A Git repository

## Supported IaC Frameworks
Harness IaCM supports the following IaC frameworks:
- [**OpenTofu**](https://opentofu.org/) <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (versions up to: v\(.))"'></HarnessApiData>
- **Terraform** (up to v1.5.x)
- [**Terragrunt**](https://terragrunt.gruntwork.io/) <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/terragrunt"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (versions up to: v\(.))"'></HarnessApiData>

:::info opentofu / terraform
Harness IaCM currently supports integration with all **OpenTofu** versions <HarnessApiData
    query="https://app.harness.io/gateway/iacm/api/provisioners/supported/opentofu"
    token="process.env.HARNESS_GENERIC_READ_ONLY_KEY"
    fallback=""
    parse='.[-1] | " (latest: v\(.))"'></HarnessApiData>.  
 For **Terraform**, we support all MPL versions up to **1.5.x**, any BSL versions (from 1.6.0) are not supported.

Go to [OpenTofu migration](https://opentofu.org/docs/intro/migration/) to migrate from Terraform to OpenTofu.
:::

## Supported Workspace Connectors
### Configuration management
- **Ansible**: Harness IaCM integrates with Ansible so you can define your target machines (**inventories**) and apply automation tasks (**playbooks**) as part of your CI/CD pipelines. Go to [Ansible Support](/docs/infra-as-code-management/configuration/ansible).

### Cloud Providers
- **AWS**: Connect via your AWS account to leverage extensive IaCM features.
- **Azure**: Integration supports multiple Azure services.
- **Google Cloud Platform (GCP)**: Offers tailored IaCM functionalities for GCP resources.
- **Spot**: Utilize Spot by NetApp for cost-effective cloud workload management.

### Git Providers
Harness IaCM supports the following source providers for seamless code management:
- **[Harness Code Repository](/docs/code-repository)**: Provides direct integration for streamlined operations.
- **GitHub**: Ideal for managing projects hosted on GitHub with options for branch-specific operations.
- **GitLab**: Connects easily with GitLab for comprehensive repository management.
- **Bitbucket**: Integrates smoothly for managing Bitbucket repositories.
- **Azure Repos**: Supports Azure Repos for direct access to Microsoft’s DevOps tools.

Git options include `Latest from Branch` (specifying a branch) and `Git Tag` fetch types. Users can set a configuration file path, such as a terraform (.tf) file.

## IaCM Feature Flags
Some Harness IaCM features are released behind feature flags to get feedback from specific customers before releasing the features to the general audience.
The following table describes each of the feature flags relevant to Harness IaCM.

:::note
To enable a feature flag in your Harness account, contact [Harness Support](mailto:support@harness.io).
:::

## Supported integrations
Support for SMP (Service Management Platform) is available in IaCM. See [IACM SMP](/docs/infra-as-code-management/manage-projects/iacm-smp) for details.

## Supported plugins
IaCM supports external plugins to enhance its usability and security.

### Security Scanners
IaCM integrates with multiple security scanning tools to check your infrastructure code for security vulnerabilities, compliance issues, and misconfigurations:

- **[Checkov](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkov/iac-scans-with-checkov)**: Open-source static code analysis tool for Infrastructure as Code that detects security and compliance misconfigurations.
- **[Wiz](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/wiz/iac-scans-with-wiz)**: Cloud security platform that scans your infrastructure changes for security vulnerabilities and compliance violations.
- **[Snyk](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference)**: Developer security platform that identifies vulnerabilities and security issues in your IaC configurations.
- **[Checkmarx One](https://developer.harness.io/docs/security-testing-orchestration/sto-techref-category/checkmarx-scanner-reference)**: Application security testing platform that provides comprehensive security scanning for infrastructure code.
- **Custom Scans**: IaCM also supports integration with custom security scanning tools through the [Harness STO module](https://developer.harness.io/docs/security-testing-orchestration).

:::note
Security scanning features are part of the [Harness STO module](https://developer.harness.io/docs/security-testing-orchestration) and require an STO license.
:::