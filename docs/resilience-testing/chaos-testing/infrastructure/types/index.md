---
title: Types of Infrastructure
redirect_from:
- /docs/chaos-engineering/guides/infrastructures/enable-disable
---
This topic describes different types of infrastructure, that can be used to execute chaos experiments.

There are different types of chaos infrastructure such as:
- [Legacy Infrastructure (Kubernetes)](./legacy-infra)
- OpenShift
- [Linux](./legacy-infra/linux)
- [Windows](./legacy-infra/windows)
- [Delegate-Driven Chaos Infrastructure](./ddcr)


You can execute experiments on these infrastructures based on different environments, such as Kubernetes, Linux VMs, AWS cloud, VMware, and so on.

Chaos experiments associated with Cloud Foundry are executed using Linux chaos infrastructure, and experiments with AWS, GCP, Azure, VMware, and Bare metal are executed on Kubernetes infrastructure.

Before creating an infrastructure, create an environment (see Experiments documentation) because a chaos infrastructure is created within an environment.

