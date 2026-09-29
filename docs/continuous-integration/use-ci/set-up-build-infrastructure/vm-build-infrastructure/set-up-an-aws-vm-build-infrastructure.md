---
title: Set up an AWS VM build infrastructure
description: Set up a CI build infrastructure using AWS VMs.
sidebar_position: 10
helpdocs_topic_id: z56wmnris8
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CustomCAcert from '/docs/continuous-integration/shared/windows-custom-ca-certs.md';

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

:::warning

This feature is planned to be deprecated at the end of January 2027 as we transition to our Unified Runner (Delegate 3.0), which merges the runner and delegate into a single component and introduces additional capabilities and improvements.

The current implementation will continue to be fully supported while the Unified Runner is introduced, and both will be available side-by-side during the transition period. We will share detailed guidance well ahead of the change, and customers will have sufficient time, tooling, and support to plan and complete their migration before the deprecation takes effect.

If you have any questions, please contact your account representative or [Harness Support](mailto:support@harness.io).

:::

This topic describes how to use AWS VMs as Harness CI build infrastructure. To do this, you will create an Ubuntu VM and install a Harness Delegate and Drone VM Runner on it. The runner creates VMs dynamically in response to CI build requests. You can also configure the runner to hibernate AWS Linux and Windows VMs when they aren't needed.

This is one of several CI build infrastructure options. For example, you can also [set up a Kubernetes cluster build infrastructure](../k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

The following diagram illustrates a CI build farm using AWS VMs. The [Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) communicates directly with your Harness instance. The [VM runner](https://docs.drone.io/runner/vm/overview/) maintains a pool of VMs for running builds. When the delegate receives a build request, it forwards the request to the runner, which runs the build on an available VM.

![](../static/set-up-an-aws-vm-build-infrastructure-12.png)

:::info

This is an advanced configuration. Before beginning, you should be familiar with:

- Using the AWS EC2 console and interacting with AWS VMs.
- [Harness key concepts](/docs/platform/get-started/key-concepts.md)
- [CI pipeline creation](../../prep-ci-pipeline-components.md)
- [Harness Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview)
- Drone VM Runners and pools:
  - [Drone documentation - VM runner overview](https://docs.drone.io/runner/vm/overview/)
  - [Drone documentation - Drone Pool](https://docs.drone.io/runner/vm/configuration/pool/)
  - [Drone documentation - Amazon drivers](https://docs.drone.io/runner/vm/drivers/amazon/)
  - [GitHub repository - Drone runner AWS](https://github.com/drone-runners/drone-runner-aws)

:::

## Prepare the AWS EC2 instance

These are the requirements to configure the AWS EC2 instance. This instance is the primary VM where you will host your Harness Delegate and runner.

:::important

AWS Spot instances, of any kind, are not supported to use as self-managed build infrastructure.

:::

### Configure authentication for the EC2 instance

The recommended authentication method is an [IAM role](https://console.aws.amazon.com/iamv2/home#/users) on the VM instance, but using IAM user and access key and secret ([AWS secret](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)) is also supported. It is best practice to use an IAM role over an access key and secret for security reasons.

1. Create or select an IAM role for the primary VM instance. This IAM role must have CRUD permissions on EC2. This role provides the runner with temporary security credentials to create VMs and manage the build pool. For details, go to the Amazon documentation on [AmazonEC2FullAccess Managed policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2FullAccess.html).
2. If you plan to run Windows builds, You must add the [AdministratorAccess policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) to the IAM role associated with the access key and access secret.
3. If you haven't done so already, create an access key and secret for the IAM role.

### Launch the EC2 instance

1. In the [AWS EC2 Console](https://console.aws.amazon.com/ec2/), launch a VM instance that will host your Harness Delegate and runner. This instance must use an Ubuntu AMI that is `t2.large` or greater.

   The primary VM must be Ubuntu. The build VMs (in your VM pool) can be Ubuntu, AWS Linux, or Windows Server 2019 or higher. All machine images must have Docker installed.

2. Attach a key pair to your EC2 instance. Create a key pair if you don't already have one.
3. You don't need to enable **Allow HTTP/HTTPS traffic**.

### Configure ports and security group settings

1. Create a Security Group in the EC2 console. You need the Security Group ID to configure the runner. For information on creating Security Groups, go to the AWS documentation on [authorizing inbound traffic for your Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html).
2. In the Security Group's **Inbound Rules**, allow ingress on port 9079. This is required for security groups within the VPC.
3. In the EC2 console, go to your EC2 VM instance's **Inbound Rules**, and allow ingress on port 22.
4. If you want to run Windows builds and be able to RDP into your build VMs, you must also allow ingress on port 3389.
5. Allow ingress rules for port 3000 as well.
6. Outbound access to githubusercontent.com over 443, which is allowed by default in a typical security group.
7. Outbound access to googleapis.com over 443 to ship the task logs. Can be avoided by using the account setting "Account Settings"->"Default Settings"->"Continuous Integration->"Upload Logs via Harness".
8. Set up VPC firewall rules for the build instances on EC2.

### Install Docker and attach IAM role

1. [SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).
2. [Install Docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker).
3. [Install Docker Compose](https://docs.docker.com/compose/install/).
4. Attach the IAM role to the EC2 VM. For instructions, go to the AWS documentation on [attaching an IAM role to an instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role).

### Use a custom Windows AMI

If you plan to use a custom Windows AMI in your AWS VM build farm, you must delete `state.run-once` from your custom AMI.

In Windows, sysprep checks if `state.run-once` exists at `C:\ProgramData\Amazon\EC2Launch\state.run-once`. If the file exists, sysprep doesn't run post-boot scripts (such as `cloudinit`, which is required for Harness VM build infrastructure). Therefore, you must delete this file from your AMI so it doesn't block the VM init script.

:::tip
If `C:\ProgramData\Amazon\EC2Launch\state.run-once` is not found, run the following command instead:

```
C:\ProgramData\Amazon\EC2-Windows\Launch\Scripts\InitializeInstance.ps1 -Schedule
```

:::

If you get an error about an unrecognized `refreshenv` command, you might need to [install Chocolatey](https://chocolatey.org/install) and add it to `$profile` to enable the `refreshenv` command.

<CustomCAcert/>

### Environment Variables

Optionally set the following environment variables:

| Variable Name                  | Description                                                                                                                                                    | Default |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `HEALTH_CHECK_TIMEOUT`         | Integer. Set a time out (in minutes) for the health check. Works only for Mac and Linux. For example, `HEALTH_CHECK_TIMEOUT=6` would set a 6 minute timeout.   | 3       |
| `HEALTH_CHECK_WINDOWS_TIMEOUT` | Integer. Set a time out (in minutes) for the health check. Works only for Windows. For example, `HEALTH_CHECK_WINDOWS_TIMEOUT=6` would set a 6 minute timeout. | 5       |

## Configure the Drone pool on the AWS VM

<!-- This isn't possible anymore because of the new delegate install UI.

:::tip Option: Use Terraform

If you have Terraform and Go installed on your EC2 environment, you can use the [cie-vm-delegate script](https://github.com/harness/cie-vm-delegate). Follow the setup instructions described in the script's README.-->

<!-- Might need these steps - I think the Terraform workflow still uses docker-compose:

When you reach the step to download the delegate YAML, follow these steps to get the docker-compose.yaml file:

1. In your Harness account, organization, or project, select **Delegates** under **Project Settings**.
2. Click **New Delegate** and select **Switch back to old delegate install experience**.
3. Select **Docker** and then select **Continue**.
4. Enter a **Delegate Name**. Optionally, you can add **Tags** or **Delegate Tokens**. Then, select **Continue**.
5. Select **Download YAML file** to download the `docker-compose.yaml` file to your local machine.

You may need to add the runner spec to the delegate definition:

1. Append the following to the end of the `docker-compose.yaml` file:

   ```yaml
   drone-runner-aws:
       restart: unless-stopped
       image: drone/drone-runner-aws
       network_mode: "host"
       volumes:
        - /runner:/runner
       entrypoint: ["/bin/drone-runner-aws", "delegate", "--pool", "pool.yml"]
       working_dir: /runner
   ```

2. Under `services: harness-ng-delegate: restart: unless-stopped`, add the following line:

   ```yaml
   network_mode: "host"
   ```

The Harness Delegate and runner run on the same VM. The runner communicates with the Harness Delegate on `localhost` and port `3000` of your VM.

:::
-->

The `pool.yml` file defines the VM spec and pool size for the VM instances used to run the pipeline. A pool is a group of instantiated VMs that are immediately available to run CI pipelines. You can configure multiple pools in `pool.yml`, such as a Windows VM pool and a Linux VM pool. To avoid unnecessary costs, you can configure `pool.yml` to hibernate VMs when not in use.

1. Create a `/runner` folder on your delegate VM and `cd` into it:

   ```
   mkdir /runner
   cd /runner
   ```

2. In the `/runner` folder, create a `pool.yml` file.
3. Modify `pool.yml` as described in the following example and the [Pool settings reference](#pool-settings-reference).

### Example pool.yml

The following `pool.yml` example defines both an Ubuntu pool and a Windows pool.

```yaml
version: "1"
instances:
  - name: ubuntu-ci-pool ## The settings nested below this define the Ubuntu pool.
    default: true
    type: amazon
    pool: 1
    limit: 4
    platform:
      os: linux
      arch: amd64
    spec:
      account:
        region: us-east-2 ## To minimize latency, use the same region as the delegate VM.
        availability_zone: us-east-2c ## To minimize latency, use the same availability zone as the delegate VM.
        access_key_id: XXXXXXXXXXXXXXXXX # Optional if using an IAM role
        access_key_secret: XXXXXXXXXXXXXXXXXXX # Optional if using an IAM role
        key_pair_name: XXXXX
      ami: ami-xxx ## Ubuntu Amd64 AMI must be passed
      size: t2.nano
      iam_profile_arn: arn:aws:iam::XXXX:instance-profile/XXXXX
      network:
        security_groups:
          - sg-XXXXXXXXXXX
  - name: windows-ci-pool ## The settings nested below this define the Windows pool.
    default: true
    type: amazon
    pool: 1
    limit: 4
    platform:
      os: windows
    spec:
      account:
        region: us-east-2 ## To minimize latency, use the same region as the delegate VM.
        availability_zone: us-east-2c ## To minimize latency, use the same availability zone as the delegate VM.
        access_key_id: XXXXXXXXXXXXXXXXXXXXXX
        access_key_secret: XXXXXXXXXXXXXXXXXXXXXX
        key_pair_name: XXXXX
      ami: ami-xxx ## Windows AMI with Docker Installed should be passed
      size: m5.large
      hibernate: true
      disk:
        size: 60 ## Min Size Generally Required for Windows based AMI with Docker Installed , The size mentioned is in GBs
      network:
        security_groups:
          - sg-XXXXXXXXXXXXXX
```

### Pool settings reference

You can configure the following settings in your `pool.yml` file. You can also learn more in the Drone documentation for the [Pool File](https://docs.drone.io/runner/vm/configuration/pool/) and [Amazon drivers](https://docs.drone.io/runner/vm/drivers/amazon/).

| Setting                         | Type                     | Example                                                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------- | ------------------------ | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                          | String                   | `name: windows_pool`                                                               | Unique identifier of the pool. You will need to specify this pool name in Harness when you [set up the CI stage build infrastructure](#specify-build-infrastructure).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `pool`                          | Integer                  | `pool: 1`                                                                          | Warm pool size number. Denotes the number of VMs in ready state to be used by the runner.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `limit`                         | Integer                  | `limit: 3`                                                                         | Maximum number of VMs the runner can create at any time. `pool` indicates the number of warm VMs, and the runner can create more VMs on demand up to the `limit`.<br/>For example, assume `pool: 3` and `limit: 10`. If the runner gets a request for 5 VMs, it immediately provisions the 3 warm VMs (from `pool`) and provisions 2 more, which are not warm and take time to initialize.                                                                                                                                                                                                                                                                                                   |
| `platform`                      | Key-value pairs, strings | Go to [platform example](#platform-example).                                       | Specify VM platform operating system (`os: linux` or `os: windows`). `arch` and `variant` are optional. `os_name: amazon-linux` is required for AL2 AMIs. The default configuration is `os: linux` and `arch: amd64`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `spec`                          | Key-value pairs, various | Go to [Example pool.yml](#example-poolyml) and the examples in the following rows. | Configure settings for the build VMs and AWS instance. Contains a series of individual and mapped settings, including `account`, `tags`, `ami`, `size`, `hibernate`, `iam_profile_arn`, `network`, `user_data`, `user_data_path`, and `disk`. Details about these settings are provided below.                                                                                                                                                                                                                                                                                                                                                                                               |
| `account`                       | Key-value pairs, strings | Go to [account example](#account-example).                                         | AWS account configuration, including region and access key authentication.<br/><ul><li>`region` (required): AWS region. To minimize latency, use the same region as the delegate VM.</li><li>`availability_zone` (optional): AWS region availability zone. To minimize latency, use the same availability zone as the delegate VM.</li><li>`access_key_id`: The AWS access key for authentication. If using an IAM role, this is the access key associated with the IAM role.</li><li>`access_key_secret`: The secret associated with the specified `access_key_id`.</li><li>`key_pair_name`: The key pair name specified when you set up the EC2 instance. Don't include `.pem`. </li></ul> |
| `tags`                          | Key-value pairs, strings | Go to [tags example](#tags-example).                                               | Optional tags to apply to the instance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ami`                           | String                   | `ami: ami-092f63f22143765a3`                                                       | The AMI ID. You can use the same AMI as your EC2 instance or [search for AMIs](https://cloud-images.ubuntu.com/locator/ec2/) in your Availability Zone for supported models (Ubuntu, AWS Linux, Windows 2019+). AMI IDs differ by Availability Zone.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `size`                          | String                   | `size: t3.large`                                                                   | The AMI size, such as `t2.nano`, `t2.micro`, `m4.large`, and so on. Make sure the size is large enough to handle your builds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `hibernate`                     | Boolean                  | `hibernate: true`                                                                  | When set to `true` (which is the default), VMs hibernate after startup. When `false`, VMs are always in a running state. This option is supported for AWS Linux and Windows VMs. Hibernation for Ubuntu VMs is not currently supported. For more information, go to the AWS documentation on [hibernating on-demand Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html).                                                                                                                                                                                                                                                                                    |
| `iam_profile_arn`               | String                   | `iam_profile_arn: arn:aws:iam::XXXX:instance-profile/XXX`                          | If using IAM roles, this is the instance profile ARN of the IAM role to apply to the build instances.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `network`                       | Key-value pairs, various | Go to [network example](#network-example).                                         | AWS network information, including security groups. For more information on these attributes, go to the AWS documentation on [creating security groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-a-base-security-group).<br/><ul><li>`security_groups`: List of security group IDs as strings.</li><li>`vpc`: If using VPC, this is the VPC ID as an integer.</li><li>`vpc_security_groups`: If using VPC, this is a list of VPC security group IDs as strings.</li><li>`private_ip`: Boolean.</li><li>`subnet_id`: The subnet ID as a string.</li></ul>                                                                                    |
| `user_data` or `user_data_path` | Key-value pairs, strings | Go to [user data example](#user-data-example).                                     | Define custom user data to apply to the instance. Provide [cloud-init data](https://docs.drone.io/runner/vm/configuration/cloud-init/) in either `user_data_path` or `user_data` if you need custom configuration.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `disk`                          | Key-value pairs, various | Go to [disk example](#disk-example).                                               | Optional AWS block information.<br/><ul><li>`size`: Integer, size in GB.</li><li>`type`: `gp2`, `io1`, or `standard`.</li><li>`iops`: If `type: io1`, then `iops: iops`.</li><li>`kms_key_id`: Your [AWS KMS Key ID](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)</li></ul>                                                                                                                                                                                                                                                                                                                                                                                          |

#### platform example

```yaml
instance:
  platform:
    os: linux
    arch: amd64
    version:
    os_name: amazon-linux
```

#### account example

```yaml
account:
  region: us-east-2
  availability_zone: us-east-2c
  access_key_id: XXXXX
  access_key_secret: XXXXX
  key_pair_name: XXXXX
```

#### tags example

```yaml
tags:
  owner: USER
  ttl: "-1"
```

#### network example

```yaml
network:
  private_ip: true
  subnet_id: subnet-XXXXXXXXXX
  security_groups:
    - sg-XXXXXXXXXXXXXX
```

#### user data example

Provide [cloud-init data](https://docs.drone.io/runner/vm/configuration/cloud-init/) in either `user_data_path` or `user_data` if you need custom configuration. Refer to the [user data examples for supported runtime environments](https://github.com/drone-runners/drone-runner-aws/tree/master/app/cloudinit/user_data).

Below is a sample `pool.yml` for GCP with `user_data` configuration:

```yaml
version: "1"
instances:
  - name: linux-amd64
    type: google
    pool: 1
    limit: 10
    platform:
      os: linux
      arch: amd64
    spec:
      account:
        project_id: YOUR_PROJECT_ID
        json_path: PATH_TO_SERVICE_ACCOUNT_JSON
      image: IMAGE_NAME_OR_PATH
      machine_type: e2-medium
      zones:
        - YOUR_GCP_ZONE # e.g., us-central1-a
      disk:
        size: 100
      user_data: |
        #cloud-config
        {{ if and (.IsHosted) (eq .Platform.Arch "amd64") }}
        packages: []
        {{ else }}
        apt:
          sources:
            docker.list:
              source: deb [arch={{ .Platform.Arch }}] https://download.docker.com/linux/ubuntu $RELEASE stable
              keyid: 9DC858229FC7DD38854AE2D88D81803C0EBFCD88
        packages: []
        {{ end }}
        write_files:
          - path: {{ .CaCertPath }}
            path: {{ .CertPath }}
            permissions: '0600'
            encoding: b64
            content: {{ .TLSCert | base64 }}
          - path: {{ .KeyPath }}
        runcmd:
          - 'set -x'
          - |
            if .ShouldUseGoogleDNS; then
              echo "DNS=8.8.8.8 8.8.4.4\nFallbackDNS=1.1.1.1 1.0.0.1\nDomains=~." | sudo tee -a /etc/systemd/resolved.conf
              systemctl restart systemd-resolved
            fi
          - ufw allow 9079
```

#### disk example

```yaml
disk:
  size: 16
  type: io1
  iops: iops
  kms_key_id: arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab
  tags:
    volumekey: volumeValue
    key1: value1
```

The [tags](#tags-example) property exemplified above follows a key/value pair format. This will add tags to the disk/volume directly.

:::note Minimum Version

In order to tag the disk, please ensure you are using drone runner version of `1.0.0-rc.190` or newer.

:::

## Start the runner

[SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the following command to start the runner:

```
docker run -v /runner:/runner -p 3000:3000 drone/drone-runner-aws:latest  delegate --pool /runner/pool.yml
```

This command mounts the volume to the Docker runner container and provides access to `pool.yml`, which is used to authenticate with AWS and pass the spec for the pool VMs to the container. It also exposes port 3000.

You might need to modify the command to use sudo and specify the runner directory path, for example:

```
sudo docker run --network host -v ./runner:/runner -p 3000:3000 drone/drone-runner-aws:latest  delegate --pool /runner/pool.yml
```

:::info What does the runner do?

When a build starts, the delegate receives a request for VMs on which to run the build. The delegate forwards the request to the runner, which then allocates VMs from the warm pool (specified by `pool` in `pool.yml`) and, if necessary, spins up additional VMs (up to the `limit` specified in `pool.yml`).

The runner includes lite engine, and the lite engine process triggers VM startup through a cloud init script. This script downloads and installs Scoop package manager, Git, the Drone plugin, and lite engine on the build VMs. The plugin and lite engine are downloaded from GitHub releases. Scoop is downloaded from `get.scoop.sh` which redirects to `raw.githubusercontent.com`.

Firewall restrictions can prevent the script from downloading these dependencies. Make sure your images don't have firewall or anti-malware restrictions that are interfering with downloading the dependencies. For more information, go to [Troubleshooting](#troubleshooting).

:::

## Install the delegate

Install a Harness Docker Delegate on your AWS EC2 instance.

1. In Harness, go to **Account Settings**, select **Account Resources**, and then select **Delegates**.

   You can also create delegates at the project scope. In your Harness project, select **Project Settings**, and then select **Delegates**.

2. Select **New Delegate** or **Install Delegate**.
3. Select **Docker**.
4. Enter a **Delegate Name**.
5. Copy the delegate install command and paste it in a text editor.
6. To the first line, add `--network host`, and, if required, `sudo`. For example:

   ```
   sudo docker run --cpus=1 --memory=2g --network host
   ```

7. [SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the delegate install command.

:::tip

The delegate install command uses the default authentication token for your Harness account. If you want to use a different token, you can create a token and then specify it in the delegate install command:

1. In Harness, go to **Account Settings**, then **Account Resources**, and then select **Delegates**.
2. Select **Tokens** in the header, and then select **New Token**.
3. Enter a token name and select **Apply** to generate a token.
4. Copy the token and paste it in the value for `DELEGATE_TOKEN`.

:::

For more information about delegates and delegate installation, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

## Verify connectivity

1. Verify that the delegate and runner containers are running correctly. You might need to wait a few minutes for both processes to start. You can run the following commands to check the process status:

   ```
   docker ps
   docker logs DELEGATE_CONTAINER_ID
   docker logs RUNNER_CONTAINER_ID
   ```

2. In the Harness UI, verify that the delegate appears in the delegates list. It might take two or three minutes for the Delegates list to update. Make sure the **Connectivity Status** is **Connected**. If the **Connectivity Status** is **Not Connected**, make sure the Docker host can connect to `https://app.harness.io`.

   ![](../static/set-up-an-aws-vm-build-infrastructure-13.png)

The delegate and runner are now installed, registered, and connected.

## Specify build infrastructure

Configure your pipeline's **Build** (`CI`) stage to use your AWS VMs as build infrastructure.

<Tabs>
  <TabItem value="Visual" label="Visual">

1. In Harness, go to the CI pipeline that you want to use the AWS VM build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **VMs**.
4. Enter the **Pool Name** from your [pool.yml](#configure-the-drone-pool-on-the-aws-vm).
5. Save the pipeline.

<!-- ![](../static/ci-stage-settings-vm-infra.png) -->

<DocImage path={require('../static/ci-stage-settings-vm-infra.png')} />

</TabItem>
  <TabItem value="YAML" label="YAML" default>

```yaml
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: VM
            spec:
              type: Pool
              spec:
                poolName: POOL_NAME_FROM_POOL_YML
                os: Linux
          execution:
            steps:
            ...
```

</TabItem>
</Tabs>

### Delegate selectors with self-managed VM build infrastructures

:::note

Currently, delegate selectors for self-managed VM build infrastructures is behind the feature flag `CI_ENABLE_VM_DELEGATE_SELECTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Although you must install a delegate to use a self-managed VM build infrastructure, you can choose to use a different delegate for executions and cleanups in individual pipelines or stages. To do this, use [pipeline-level delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#pipeline-delegate-selector) or [stage-level delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#stage-delegate-selector).

Delegate selections take precedence in the following order:

1. Stage
2. Pipeline
3. Platform (build machine delegate)

This means that if delegate selectors are present at the pipeline and stage levels, then these selections override the platform delegate, which is the delegate that you installed on your primary VM with the runner. If a stage has a stage-level delegate selector, then it uses that delegate. Stages that don't have stage-level delegate selectors use the pipeline-level selector, if present, or the platform delegate.

For example, assume you have a pipeline with three stages called `alpha`, `beta`, and `gamma`. If you specify a stage-level delegate selector on `alpha` and you don't specify a pipeline-level delegate selector, then `alpha` uses the stage-level delegate, and the other stages (`beta` and `gamma`) use the platform delegate.

<details>
<summary>Early access feature: Use delegate selectors for codebase tasks</summary>

:::note

Currently, delegate selectors for CI codebase tasks is behind the feature flag `CI_CODEBASE_SELECTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

By default, delegate selectors aren't applied to delegate-related CI codebase tasks.

With this feature flag enabled, Harness uses your [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) for delegate-related codebase tasks. Delegate selection for these tasks takes precedence in order of [pipeline selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#pipeline-delegate-selector) over [connector selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#infrastructure-connector).

</details>

## Export runner metrics to Splunk

The VM runner exposes Prometheus metrics on port 3000 at `/metrics`, covering build queue time, VM provisioning latency, pool utilization, and per-build CPU and memory peaks. You can forward these to your own Splunk instance by running an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) container alongside the delegate and runner. The collector scrapes the runner over loopback and pushes to the Splunk [HTTP Event Collector (HEC)](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector).

This requires no changes to the runner or the delegate. The collector runs out-of-process, so a collector crash, a misconfiguration, or a Splunk outage cannot degrade or block builds.

```
Primary VM

  Harness Delegate ──▶ drone-runner-aws
                            :3000 /metrics
                                  ▲
                                  │ scrape every 30s (loopback)
                                  │
                       otel-collector-contrib
                                  │
                                  │ outbound HTTPS
                                  ▼
                          Customer Splunk HEC
```

Because the scrape is a loopback call and the only egress is outbound HTTPS, no new inbound ports or security group rules are required.

### Metrics export requirements

- Docker on the primary VM. This is already required to run the delegate and runner.
- A Splunk HEC endpoint and token, with HEC enabled on your Splunk instance.
- A pre-created **metrics** index in Splunk. HEC does not create indexes on demand, and metrics sent to an events index do not chart correctly. The HEC token's allowed-index list must include this index.
- Outbound HTTPS from the primary VM to your Splunk endpoint. This is port 443 for Splunk Cloud, or port 8088 for self-managed Splunk Enterprise.

The Splunk HEC token is the only credential involved. No Harness API key or delegate token is used, because the collector reads the runner's endpoint over localhost.

### Runner version requirements for metrics

:::note Minimum Version

Metrics export requires drone runner version `1.0.0-rc.313` or newer.

:::

`docker run` does not consult the registry when a matching local image already exists, so a `latest` tag can serve a months-old cached image indefinitely. Pull the version explicitly and check the image age before you begin:

```
docker pull drone/drone-runner-aws:1.0.0-rc.313
docker image inspect --format '{{.Created}}' drone/drone-runner-aws:1.0.0-rc.313
```

If the runner is running an older image, some metrics are **absent** from `/metrics` entirely rather than reported as zero. The symptom is easy to misread, because the collector logs no errors and other metrics continue to arrive normally.

### Create the collector configuration

Create `/runner/otel-config.yaml` on your primary VM:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'drone-runner-aws'
          scrape_interval: 30s
          static_configs:
            ## The runner is on this VM. The default /metrics path is implied.
            - targets: ['localhost:3000']

processors:
  ## Must be listed first in the pipeline. Applies backpressure so the collector
  ## cannot grow unbounded alongside the runner and delegate on the same VM.
  memory_limiter:
    check_interval: 1s
    limit_mib: 256
    spike_limit_mib: 64

  ## Tags every metric with the source VM so multiple runners stay separable.
  resourcedetection:
    detectors: [env, system, ec2]
    timeout: 5s

  cumulativetodelta:
    initial_value: auto

  ## Optional. Add this block only if you want to forward a specific set of
  ## metrics instead of all of them; otherwise skip it. The condition below
  ## keeps the two named metrics and drops everything else. If you add this
  ## block, also add it to the processors list under service.pipelines.metrics.
  # filter/keep_selected_metrics:
  #   error_mode: ignore
  #   metric_conditions:
  #     - 'metric.name != "harness_ci_pipeline_execution_total" and metric.name != "harness_ci_pipeline_running_executions"'

  batch:
    send_batch_size: 512
    timeout: 10s

extensions:
  ## Buffers metrics on disk so a Splunk outage doesn't lose data. Entries are
  ## removed as they are exported successfully, so this stays small in normal
  ## operation and only grows while Splunk is unreachable.
  file_storage/splunk:
    directory: /var/lib/otelcol/storage
    timeout: 1s
    ## Reclaims disk space after a backlog drains. Without this, the database
    ## file stays at the size of the largest backlog it has ever held.
    compaction:
      on_start: true
      on_rebound: true
      directory: /var/lib/otelcol/tmp
      rebound_needed_threshold_mib: 100
      rebound_trigger_threshold_mib: 10
      max_transaction_size: 65536

exporters:
  splunk_hec:
    ## Splunk Cloud:      https://http-inputs-STACK.splunkcloud.com:443/services/collector
    ## Splunk Enterprise: https://SPLUNK_HOST:8088/services/collector
    endpoint: "https://SPLUNK_HOST:8088/services/collector"
    token: "${env:SPLUNK_HEC_TOKEN}"
    source: "drone-runner-aws"
    sourcetype: "harness:ci:runner:metrics"
    index: "YOUR_METRICS_INDEX"
    tls:
      insecure_skip_verify: false
      ## For self-managed Splunk behind a private CA, point to your CA bundle.
      ## Omit this for Splunk Cloud: setting it replaces the system trust store
      ## rather than adding to it.
      # ca_file: /etc/otelcol/splunk-ca.pem
    ## Worst-case disk usage is roughly queue_size multiplied by batch size, so
    ## this caps how large the on-disk queue can grow. Beyond this limit new
    ## items are dropped rather than buffered. Builds are unaffected either way.
    sending_queue:
      enabled: true
      storage: file_storage/splunk
      queue_size: 1000
    retry_on_failure:
      enabled: true
      initial_interval: 5s
      max_interval: 60s
      max_elapsed_time: 300s

service:
  extensions: [file_storage/splunk]
  telemetry:
    metrics:
      level: basic
  pipelines:
    metrics:
      receivers: [prometheus]
      processors: [memory_limiter, resourcedetection, cumulativetodelta, batch]
      exporters: [splunk_hec]
```

The endpoint must use `https://`. Splunk HEC is HTTPS-only on port 8088 by default, and a plain `http://` endpoint produces a bare `EOF` error from the exporter.

The token is read from the environment rather than written inline, so the configuration file can be committed to source control without exposing the credential.

### Start the collector

The persistent send queue needs two writable directories: one for the queue itself and one as scratch space for compaction. The collector image runs as UID `10001`, so a root-owned bind mount prevents the storage extension from starting:

```
sudo mkdir -p /var/lib/otelcol/storage /var/lib/otelcol/tmp
sudo chown -R 10001:10001 /var/lib/otelcol
```

:::info

The queue writes to disk on every export and deletes each entry once Splunk accepts it, so it stays small during normal operation. It grows only while Splunk is unreachable, bounded by `queue_size`. Because the underlying database does not return freed space to the operating system on its own, the `compaction` settings reclaim it once a backlog drains. Allow free disk space roughly equal to the queue ceiling, since compaction briefly holds both the original and compacted copies.

:::

Start the collector:

```
sudo docker run -d --name otel-collector \
  --network host \
  --restart unless-stopped \
  --memory=512m \
  -e SPLUNK_HEC_TOKEN='YOUR_HEC_TOKEN' \
  -v /runner/otel-config.yaml:/etc/otelcol-contrib/config.yaml \
  -v /var/lib/otelcol:/var/lib/otelcol \
  otel/opentelemetry-collector-contrib:0.159.0
```

`--network host` is what makes `localhost:3000` resolve to the runner, matching how the delegate and runner are started elsewhere in this topic.

`--memory=512m` is what actually caps the collector. The `memory_limiter` processor throttles the collector's pipeline but does not cap the process, so pair the two and keep `limit_mib` comfortably below the container limit.

:::note

Pin the collector image tag rather than using `latest`. Collector configuration schemas change between releases, so a floating tag can turn an unrelated container restart months later into a crash loop on a configuration that previously worked.

:::

### Verify metrics are flowing

1. Confirm the runner is serving the `runner_*` metric families:

   ```
   curl -s localhost:3000/metrics | grep -c '^runner_'
   ```

   A non-zero count confirms the runner version supports the full catalog.

2. Confirm the collector is actually scraping. This runner-side counter increments once per scrape interval:

   ```
   curl -s localhost:3000/metrics | grep promhttp_metric_handler_requests_total
   ```

   The `code="200"` value should increase every 30 seconds, while `code="500"` and `code="503"` stay at zero.

3. Check the collector logs:

   ```
   docker logs otel-collector
   ```

   A healthy collector logs nothing after startup, because successful exports aren't logged. Silence is expected here. However, silence is also what a stale runner image looks like, so treat steps 1 and 2 as the positive confirmation rather than relying on the absence of errors.

4. Run a pipeline on your VM build infrastructure, then query your metrics index in Splunk.

### Runner metrics reference

The following metrics are the most useful for capacity and queue analysis.

**Queue and allocation latency**

| Metric | Type | Answers |
| ------ | ---- | ------- |
| `harness_ci_runner_wait_duration_seconds` | Histogram | How long a build waited for a VM. Buckets span 0.5s to 1800s. |
| `harness_ci_runner_total_vm_init_duration_seconds` | Histogram | Total time to get a usable machine, including wait, provision, health check, and setup. |
| `runner_vm_creation_duration_seconds` | Histogram | Time spent in the cloud provider's instance-creation call alone. |
| `runner_vm_init_duration_seconds` | Histogram | Per-attempt init duration, including failed attempts. |
| `runner_vm_health_check_duration_seconds` | Histogram | Duration of the lite engine health-check phase, which is dominated by VM boot time. |
| `runner_vm_setup_duration_seconds` | Histogram | Duration of the lite engine setup phase. |

**Capacity and pool health**

| Metric | Type | Answers |
| ------ | ---- | ------- |
| `harness_ci_pipeline_warm_pool_executions` | Gauge | Warm pool availability. |
| `harness_ci_pipeline_running_executions` | Gauge | Concurrent builds in flight. |
| `harness_ci_pipeline_per_account_running_executions` | Gauge | Concurrent builds in flight, per account. |
| `harness_ci_pipeline_pool_fallbacks` | Counter | Builds that fell back to another pool. |
| `runner_vms_current` | Gauge | Live VM count by pool, VM type, source, and lifecycle state. |
| `harness_ci_capacity_reservation_total`, `_errors_total`, `_fallbacks_total` | Counter | Capacity reservation outcomes. |

**Build outcomes and resource usage**

| Metric | Type | Answers |
| ------ | ---- | ------- |
| `harness_ci_pipeline_execution_total` | Counter | Completed executions, both passed and failed. |
| `harness_ci_pipeline_execution_errors_total` | Counter | Executions that failed due to system errors. |
| `harness_ci_pipeline_max_cpu_usage_percent` | Histogram | Peak CPU per build, for right-sizing instance types. |
| `harness_ci_pipeline_max_mem_usage_percent` | Histogram | Peak memory per build. |
| `runner_vm_usage_duration_seconds` | Histogram | How long a VM stayed in use. |

**Cleanup and cost**

| Metric | Type | Answers |
| ------ | ---- | ------- |
| `runner_purger_instances_force_deleted_total` | Counter | Leaked instances force-deleted, which signals a cloud cost leak. |
| `runner_purger_last_run_timestamp_seconds` | Gauge | Purger liveness, per pool. |
| `harness_ci_predictor_idle_age_seconds` | Histogram | Idle age of predictor-created instances. |

:::info

Some labels are only populated when the corresponding pool setting is present. For example, `zone` is empty unless the pool declares `availability_zone` in `pool.yml`, because the runner does not read the zone back from AWS when the setting is omitted.

:::

### Control metrics ingest volume

Splunk bills on ingest, so filtering in the collector rather than at search time is what reduces cost. Histograms dominate the series count, because each one emits a series per bucket plus `_sum` and `_count`. For example, `harness_ci_runner_wait_duration_seconds` produces 31 series for every distinct combination of its labels.

To forward only the metrics you need, uncomment the optional `filter/keep_selected_metrics` block in the collector configuration and edit the condition to name the metrics you want to keep. Then add the processor to the pipeline, after `memory_limiter` and before `batch`, so you aren't batching datapoints you're about to discard:

```yaml
service:
  pipelines:
    metrics:
      processors: [memory_limiter, resourcedetection, cumulativetodelta, filter/keep_selected_metrics, batch]
```

### Troubleshoot metrics export

| Symptom | Cause and resolution |
| ------- | -------------------- |
| Exporter logs a bare `EOF` | The endpoint uses `http://`. Splunk HEC is HTTPS-only on port 8088 by default. Change the endpoint to `https://`. |
| HEC returns `400` with `{"text":"Incorrect index","code":7}` | The target index does not exist, or the HEC token is not authorized for it. The collector treats this as a permanent error and drops the batch. Create the metrics index and add it to the token's allowed-index list. |
| `connect: connection refused` on the Splunk endpoint | Splunk is unreachable from the primary VM. Check the endpoint host and port and confirm outbound HTTPS is permitted. |
| Some metrics are missing in Splunk while others arrive normally, and the collector logs no errors | The runner is running an image older than `1.0.0-rc.313`, most likely a stale cached `latest` tag. Run `docker pull` for a pinned version and recreate the runner container. |
| Collector fails to start with a storage extension error | `/var/lib/otelcol` is not writable by UID `10001`. Run `sudo chown -R 10001:10001 /var/lib/otelcol`. |
| Collector logs nothing and no metrics reach Splunk | Confirm the collector is scraping by checking that `promhttp_metric_handler_requests_total{code="200"}` increments on the runner. If it doesn't, the scrape target is wrong. |
| Metrics stop arriving without any error | Alert on the `up` metric that the Prometheus receiver synthesizes for each scrape target. `up == 0` means the scrape failed, and absence of the series means the collector isn't running. |

## AWS Fargate Limitations

If you are running builds on AWS Fargate, please be aware of the following limitations.

### Docker delegate on AWS ECS Fargate backed instance

When operating ECS delegates on AWS Fargate, it's critical to note that AWS Fargate will terminate the delegate if the tasks running on the delegate exceed the infrastructure's specified limits. This is a limitation inherent in using infrastructure not owned by the customer. Harness Delegate cannot circumvent this restriction. However, ECS delegates operating on an EC2 instance do not have this issue. To avoid this limitation, consider using Kubernetes delegates where the infrastructure and associated YAML definitions address these issues.

### Docker in Docker does not work with AWS Fargate

AWS Fargate doesn't support the use of privileged containers. Privileged mode is required for DinD, thus, you cannot use DinD with AWS Fargate.

### AWS Fargate does not support IAM roles

Amazon requires the Amazon EKS Pod execution role to run pods on the AWS Fargate infrastructure. For more information, go to [Amazon EKS Pod execution IAM role](https://docs.aws.amazon.com/eks/latest/userguide/pod-execution-role.html) in the AWS documentation.

If you deploy pods to Fargate nodes in an EKS cluster, and your nodes needs IAM credentials, you must configure IRSA in your AWS EKS configuration (and then select the Use IRSA option for your connector credentials in Harness). This is due to [Fargate limitations](<https://docs.aws.amazon.com/eks/latest/userguide/fargate.html#:~:text=The%20Amazon%20EC2%20instance%20metadata%20service%20(IMDS)%20isn%27t%20available%20to%20Pods%20that%20are%20deployed%20to%20Fargate%20nodes.>).

## Troubleshoot AWS VM build infrastructure

- [Optimize Windows VM runner](/docs/continuous-integration/troubleshoot-ci/optimize-windows-vm-runner)
- [Build VM creation fails with no default VPC](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#aws-build-vm-creation-fails-with-no-default-vpc)
- [AWS VM builds stuck at the initialize step on health check](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#aws-vm-builds-stuck-at-the-initialize-step-on-health-check)
- [Delegate connected but builds fail](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#aws-vm-delegate-connected-but-builds-fail)
- [Use internal or custom AMIs](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#use-internal-or-custom-amis-with-self-managed-aws-vm-build-infrastructure)
- [Where can I find self-managed VM lite engine and cloud init output logs?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#where-can-i-find-logs-for-self-managed-aws-vm-lite-engine-and-cloud-init-output)
- [Can I use the same build VM for multiple CI stages?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#can-i-use-the-same-build-vm-for-multiple-ci-stages)
- [Why are build VMs running when there are no active builds?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#why-are-build-vms-running-when-there-are-no-active-builds)
- [How do I specify the disk size for a Windows instance in pool.yml?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#how-do-i-specify-the-disk-size-for-a-windows-instance-in-poolyml)
- [Clone codebase fails due to missing plugin](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#clone-codebase-fails-due-to-missing-plugin)
- [Can I limit memory and CPU for Run Tests steps running on self-managed VM build infrastructure?](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs#can-i-limit-memory-and-cpu-for-run-tests-steps-running-on-harness-cloud)

Go to the [CI Knowledge Base](/docs/continuous-integration/ci-articles-faqs/continuous-integration-faqs) for a broader list of frequently asked questions and answers.
