---
title: HSF Plugins
description: Understand HSF Plugins
sidebar_position: 5
---

Harness Solutions Factory (HSF) provides a small set of plugins that package common automation tasks into reusable, pipeline-friendly steps. Below describe each available plugin and the problem it is designed to solve.

:::note
All of these plugins are publically available and all the images are stored in [DockerHub](https://hub.docker.com/u/harnesssolutionfactory). 
:::

### Harness Code Repository Mirror Repositories Plugin
Synchronizes a specified Git reference (branch, tag, or commit SHA) from a source repository to a target repository. This plugin enables reliable repository replication across Git environments and supports authenticated or anonymous access for both source and target repositories.

### Harness Token Rotation Plugin
Automates the rotation of service account tokens and updates corresponding secrets. This plugin helps enforce security best practices by ensuring expired tokens are removed and credentials remain current without manual intervention.

### Harness STO Configuration Manager Plugin
Iterates over a repository to discover a hierarchical set of configuration files and arguments, then applies them to the selected Harness STO scanner. This plugin enables centralized, repository-driven management of STO scan configurations.

### Manage IACM Plugin
Manages IaCM workspace creation and lifecycle across pipelines. The plugin creates workspaces during a pre-stage, allowing subsequent stages in the same pipeline to execute against the same workspace. This approach reduces dependency on direct Terraform usage and follows a Drone-style plugin execution model.

### Harness Python API SDK Plugin
Provides a simplified, non-compiled Python SDK for interacting with Harness APIs. This SDK was created to eliminate repetitive Bash and curl scripting and to standardize how Python-based tools and automations are developed across HSF projects.

### Harness IDP Resource Manager Plugin
Manages Harness IDP entities through Harness APIs. The solution also supports backward compatibility by registering and updating IDP 1.0-style configurations via Git sync.

### Harness IDP Service Manager Plugin
A container-based tool for managing Harness Internal Developer Portal (IDP) entities by processing Harness services and generating corresponding IDP components with proper hierarchical organization.
