---
title: Onboard with Terraform Provider
description: This tutorial shows you how to onboard with your Terraform provider.
sidebar_position: 3
redirect_from:
  - /tutorials/platform/onboard-terraform-provider
---

The [Harness Terraform Provider](https://registry.terraform.io/providers/harness/harness/) enables automated lifecycle management of the Harness Platform using Terraform. You can onboard onto Harness on day 1 and also make day 2 changes using this Provider. Currently the following Harness resources can be managed via the Provider.

- Organizations
- Projects
- Connectors
- Services
- Environments
- Infrastructure Definitions
- Pipelines
- Permissions
- Secrets

This tutorial shows you how to manage all the above resources except Permissions and Secrets.

## Prerequisite

### Install terraform CLI

Install the [terraform CLI v1.3.x](https://developer.hashicorp.com/terraform/downloads) on your host machine. Run the following command to verify.
```
terraform -version
```

### Get Your Harness Account ID 

You will also need to provde your Harness accountId as an input parameter to the Provider. This accountId is present in every Harness URL. For example, in the following URL

```
https://<harness-mgr-port>/ng/#/account/6_vVHzo9Qeu9fXvj-AcQCb/settings/overview
```

`6_vVHzo9Qeu9fXvj-AcQCb` is the accountId. 

### Get Harness API Key Token

Login to your Harness Account and click My Profile on the left navigation. Click +API Key to create a new API key. Now click +Token to create API key token. Give the token a name and save the token that gets autogenerated when you click Apply.  

## Create your main.tf file

You can create your own main.tf file. For this tutorial, we will use a sample main.tf file

```
curl -LO https://raw.githubusercontent.com/harness-apps/developer-hub-apps/main/terraform/main.tf
```

### Configure the Harness Provider

Open the `main.tf` file in a text editor and replace `PUT_YOUR_HARNESS_ACCOUNTID_HERE` and `PUT_YOUR_API_KEY_TOKEN_HERE` with your Harness accountId and API key token values respectively. 

The `PUT_YOUR_MANAGER_ENDPOINT_HERE` value can be determined as follows:
- For Harness SaaS, it is `https://app.harness.io/gateway`
- For Harness CDCE Docker, it is `http://HARNESS_HOST` where HARNESS_HOST is the host IP where Harness CDCE is running. You can use `localhost` for HARNESS_HOST if terraform is running on the same machine.
 - For Harness CDCE Helm, it is `http://HARNESS_HOST:7143` where HARNESS_HOST is the public IP of the Kubernetes node where CDCE Helm is running. You can use `localhost` for HARNESS_HOST if terraform is running on the same machine.

Note that if terraform CLI is running local to CDCE (either docker compose or minikube port forward onto VM), then you can use `localhost` and `localhost:7143` for Docker and Kubernetes install options respectively.

```
terraform {
  required_providers {
    harness = {
      source = "harness/harness"
    }
  }
}

provider "harness" {
  endpoint         = "PUT_YOUR_MANAGER_ENDPOINT_HERE"
  account_id       = "PUT_YOUR_HARNESS_ACCOUNTID_HERE"
  platform_api_key = "PUT_YOUR_API_KEY_TOKEN_HERE"
}

...
```

### Create the terraform resources

Review the`main.tf` file for the operations that terraform is going to execute for us. As you can see, the sample first creates a new organization as well as a new project inside that organization. It then creates a helm chart service that will be deployed to Kubernetes infrastructure running in a pre-production environment. A new pipeline is then created to make this service deployment happen. 

At every step, you can use existing organizations, projects, services, environments if you so desire. We will now review the terraform resource definition for each of these resources.

#### Create a new organization
```
resource "harness_platform_organization" "org" {
    name      = "OrgByTF"
    identifier = "orgbytf"
    description = "Created through Terraform"
}
```

#### Create a new project in the organization
```
resource "harness_platform_project" "project" {
    name      = "ProjByTF"
    identifier = "projbytf"
    org_id    = "orgbytf"
    description = "Created through Terraform"
    depends_on = [
        harness_platform_organization.org
    ]
}
```

#### Create a helm connector at account level

Account-level connectors are available to all projects in all organizations. We create such a connector by not setting the org_id and project_id attributes in the terraform resource. We will use this connector to retrieve the Kubernetes manifests for the sample service we will deploy.
```
resource "harness_platform_connector_helm" "helmconn" {
    name      = "HelmConnByTF"
    identifier = "helmconnbytf"
    description = "Created through Terraform"
    url = "https://charts.bitnami.com/bitnami"
}
```

#### Create a service inside the project 

This service will use the above Helm connector to deploy a Helm Chart. We are using the  `wildfly` helm chart available at `https://charts.bitnami.com/bitnami` as the sample service for this tutorial.
```
resource "harness_platform_service" "service" {
  name        = "ServiceByTF"
  identifier  = "servicebytf"
  description = "Created through Terraform"
  org_id      = "orgbytf"
  project_id  = "projbytf"
  yaml        = <<-EOT
    ...
  EOT

  depends_on = [
        harness_platform_project.project
  ]
}
```

#### Create a Kubernetes connector at account level

We will deploy the service defined earlier to the Kubernetes cluster associated with this connector. This connector will inherit the permissions of a delegate named `firstk8sdel` which you can install using the Kubernetes delegate instructions from [Install Delegate](/docs/platform/get-started/tutorials/install-delegate)
```
resource "harness_platform_connector_kubernetes" "k8sconn" {
  name        = "K8SConnByTF"
  identifier  = "k8sconnbytf"
  description = "Created through Terraform"

  inherit_from_delegate {
    delegate_selectors = ["firstk8sdel"]
  }
}
```

#### Create an environment in the project

Create an environment inside the project that refers to the Kubernetes connector we defined in the previous step. Environments can be of `PreProduction` or `Production` types and we will use the former for this example.
```
resource "harness_platform_environment" "env" {
  name       = "EnvByTF"
  identifier = "envbytf"
  org_id     = "orgbytf"
  project_id = "projbytf"
  tags       = []
  type       = "PreProduction"
  yaml       = <<-EOT
    ...
  EOT

  depends_on = [
        harness_platform_project.project
  ]
}
```

#### Create a infrastructure definition in the environment

Create a infrastructure definition in the environment we just created.
```
resource "harness_platform_infrastructure" "infra" {
  name            = "InfraByTF"
  identifier      = "infrabytf"
  org_id          = "orgbytf"
  project_id      = "projbytf"
  env_id          = "envbytf"
  type            = "KubernetesDirect"
  deployment_type = "Kubernetes"
  yaml            = <<-EOT
    ...
  EOT

  depends_on = [
        harness_platform_environment.env
  ]
}
```

#### Create a pipeline inside the project

Every run of this pipeline will deploy a particular version of the service onto the Kubernetes cluster.
```
resource "harness_platform_pipeline" "pipeline" {
  name       = "PipelineByTF"
  identifier = "pipelinebytf"
  org_id     = "orgbytf"
  project_id = "projbytf"
  
  yaml       = <<-EOT
    ...
  EOT

  depends_on = [
        harness_platform_infrastructure.infra
  ]
}
```

## Run terraform init, plan and apply

Initialize terraform. This will download the Harness Provider onto your machine.
```
terraform init
```

Run the following step to see exactly the changes terraform is going to make on your behalf.
```
terraform plan
```

Finally, run this step to make terraform onboard your resources onto the Harness Platform.
```
terraform apply
```

When prompted by terraform if you want to continue with the apply step, type `yes` and then you will see output similar to the following.

```
harness_platform_connector_kubernetes.k8sconn: Creating...
harness_platform_organization.org: Creating...
harness_platform_connector_helm.helmconn: Creating...
harness_platform_connector_helm.helmconn: Creation complete after 2s [id=helmconnbytf]
harness_platform_organization.org: Creation complete after 2s [id=orgbytf]
harness_platform_connector_kubernetes.k8sconn: Creation complete after 2s [id=k8sconnbytf]
harness_platform_project.project: Creating...
harness_platform_project.project: Creation complete after 2s [id=projbytf]
harness_platform_service.service: Creating...
harness_platform_environment.env: Creating...
harness_platform_environment.env: Creation complete after 1s [id=envbytf]
harness_platform_service.service: Creation complete after 1s [id=servicebytf]
harness_platform_infrastructure.infra: Creating...
harness_platform_infrastructure.infra: Creation complete after 3s [id=infrabytf]
harness_platform_pipeline.pipeline: Creating...
harness_platform_pipeline.pipeline: Creation complete after 5s [id=pipelinebytf]

Apply complete! Resources: 8 added, 0 changed, 0 destroyed.
```

## Verify and run pipeline on Harness UI

On Harness UI, you can go to Account Settings --> Organizations to see the new organization. Click View Projects to see the new project. Click the project and go into the "Continuous Delivery" module. When you click Pipelines now, you can see the new pipeline has been created. You can run this pipeline as long as you have previously installed a delegate with name `firstk8sdel` using the Kubernetes delegate instructions from [Install Delegate](/docs/platform/get-started/tutorials/install-delegate). As previously shown, you can change the delegate name to any other delegate you may have installed by editing the Kubernetes connector resource of the main.tf file.

## Run terraform destroy

This is as simple as the command below:

```
terraform destroy
```

## Changing Harness references and state files

Administrators may want to change the references of various Harness variables.  For example, there may be a reference to an SSH key stored in Harness that will need to be renamed or relocated.

For example,
`harness_plt_cnnctr_github.llb_ghe_ssh_key_ctagile` may need to be renamed or moved from a project scope to an account scope.

In this case, it is important to remember that Terraform treats these references within state files, the same way they do about Cloud resources.  Terraform expect the resources to exist, until the reference is changed and moved to the new reference.  This is due to the stateful nature of Terraform.

If, for example, the SSHKey in Harness is deleted before the state file is updated with a `terrafrom plan` and `apply`, the state file will be looking for a non-existent SSHKey and you may run into the following type of error:

```
Stack trace from the terraform-provider-harness_v0.32.9 plugin:
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x90 pc=0x12ee973]
goroutine 209 [running]
```

In this case, the state file will need to be manually updated with the new resource reference, or the old reference will need to be removed completely.
