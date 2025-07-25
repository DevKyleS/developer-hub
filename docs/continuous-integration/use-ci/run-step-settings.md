---
title: Use CI Run steps
description: This topic describes settings for the CI Run step.
sidebar_position: 90
sidebar_label: Run scripts
helpdocs_topic_id: 1i1ttvftm4
helpdocs_category_id: 4xo13zdnfx
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/category/run-scripts
  - /docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import EnhancedOutVar from '/docs/continuous-integration/shared/enhanced-output-variables.md';
import OutVar from '/docs/continuous-integration/shared/output-var.md';

You can use a **Run** step to run commands or scripts in a CI pipeline. Here are some examples of different ways you can use **Run** steps.

<Tabs>
  <TabItem value="test" label="Run tests" default>

This example runs `pytest`, includes [code coverage](./run-tests/code-coverage.md), and produces a report in JUnit XML format.

```yaml
              - step:
                  type: Run
                  name: Run pytest
                  identifier: Run_pytest
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: python:latest
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness CI"
                      uname -a
                      pip install pytest
                      pip install pytest-cov
                      pip install -r requirements.txt

                      pytest -v --cov --junitxml="result.xml" test_api.py test_api_2.py test_api_3.py

                      echo "Done"
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "**/*.xml"
```

:::tip

In Harness CI, you can [use test splitting (parallelism)](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism.md) to improve test times for any language or test tool.

:::

</TabItem>
  <TabItem value="dependencies" label="Install dependencies">

This example installs Go dependencies.

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      go get example.com/my-go-module
```

</TabItem>
  <TabItem value="version" label="Specify versions">

This example uses a **Run** step to select a version of Xcode.

```yaml
              - step:
                  type: Run
                  name: set_xcode_version
                  identifier: set_xcode_version
                  spec:
                    shell: Sh
                    command: |-
                      sudo xcode-select -switch /Applications/Xcode_15.1.0.app
                      xcodebuild -version
```

</TabItem>
  <TabItem value="repo" label="Clone a repo">

This example clones a GitHub repository.

```yaml
              - step:
                  type: Run
                  identifier: clone
                  name: clone
                  spec:
                    shell: Sh
                    command: |-
                      git clone https://GH_PERSONAL_ACCESS_TOKEN@github.com/ACCOUNT_NAME/REPO_NAME.git
```

To use this command, you would replace:

* `ACCOUNT_NAME` with your GitHub account name.
* `REPO_NAME` with the name of the GitHub repo to clone.
* `PERSONAL_ACCESS_TOKEN` with a [GitHub personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) that has pull permissions to the target repository. Additional permissions may be necessary depending on the Action's purpose. Store the token as a [Harness secret](/docs/category/secrets) and use a variable expression, such as `<+secrets.getValue("YOUR_TOKEN_SECRET")>`, to call it.

</TabItem>
  <TabItem value="scripts" label="Run scripts">

**Run** steps are highly versatile, and you can use them to run all manner of individual commands or multi-line scripts.

For example, this step produces [output variables](#output-variables) from Terraform value. This step is from the [Terraform notifications trigger tutorial](/docs/platform/triggers/tutorial-terraform-cloud-notification-trigger), and these output variables are used by another step later in the same pipeline.

```yaml
              - step:
                  type: Run
                  name: Terraform Outputs
                  identifier: tf_outputs
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: kameshsampath/kube-dev-tools
                    shell: Sh
                    command: |-
                      cd /harness/vanilla-gke/infra
                      terraform init
                      GCP_PROJECT=$(terraform output -raw project-name)
                      GCP_ZONE=$(terraform output -raw zone)
                      GKE_CLUSTER_NAME=$(terraform output -raw kubernetes-cluster-name)
                    envVariables:
                      TF_TOKEN_app_terraform_io: <+secrets.getValue("terraform_cloud_api_token")>
                      TF_WORKSPACE: <+trigger.payload.workspace_name>
                      TF_CLOUD_ORGANIZATION: <+trigger.payload.organization_name>
                    outputVariables:
                      - name: GCP_PROJECT
                      - name: GCP_ZONE
                      - name: GKE_CLUSTER_NAME
                    imagePullPolicy: Always
                  description: Get the outputs of terraform provision
```

:::tip

Consider [creating plugins](./use-drone-plugins/custom_plugins.md) for scripts that you reuse often.

:::

</TabItem>
<TabItem value="ssh" label="Connect with SSH">

This example demonstrates how to set up SSH authentication in a **Run** step, such as when connecting to a private Git server or remote machine.

The SSH private key must be stored in Harness as a **File-type Secret** to be used securely in the pipeline.

```yaml
- step:
    type: Run
    name: SSH setup and build
    identifier: SSH_Build
    spec:
      shell: Sh
      command: |-
        mkdir -p ~/.ssh
        echo '<+secrets.getValue("account.your-ssh-private-key")>' > ~/.ssh/id_rsa
        chmod 600 ~/.ssh/id_rsa
        export GIT_SSH_COMMAND="ssh -o StrictHostKeyChecking=no"
        git clone git@github.com:your-org/private-repo.git
        ./build.sh
```
:::tip

- Replace `account.your-ssh-private-key` with your actual secret reference.

- The `StrictHostKeyChecking=no` flag disables host verification. For production pipelines, consider managing known hosts instead.

- Ensure your build image has OpenSSH tools (ssh, git, etc.) installed.
:::

</TabItem>

</Tabs>

## Add the Run step

You need a [CI pipeline](./prep-ci-pipeline-components.md) with a [Build stage](./set-up-build-infrastructure/ci-stage-settings.md) where you'll add the **Run** step.

In order for the **Run** step to execute your commands, the build environment must have the necessary binaries for those commands. Depending on the stage's build infrastructure, **Run** steps can use binaries that exist in the build environment or pull an image, such as a public or private Docker image, that contains the required binaries. For more information about when and how to specify images, go to the [Container registry and image settings](#container-registry-and-image).

<Tabs>
  <TabItem value="Visual" label="Visual">

1. Go to the **Build** stage in the pipeline where you want to add the **Run** step.
2. On the **Execution** tab, select **Add Step**, and select the **Run** step from the Step Library.
3. Configure the [Run step settings](#run-step-settings) and then select **Apply Changes** to save the step.

</TabItem>
  <TabItem value="YAML" label="YAML" default>

In Harness, go to the pipeline where you want to add the `Run` step. In the `CI` stage, add a `Run` step and configure the [Run step settings](#run-step-settings).

```yaml
              - step:
                  type: Run
                  name: run pytest # Specify a name for the step.
                  identifier: run_pytest # Define a step ID, usually based on the name.
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR 
                    image: python:latest # Specify an image, if required.
                    shell: Sh
                    command: |- # Provide your commands
                      pytest test_main.py --junit-xml=output-test.xml
```

</TabItem>
</Tabs>

## Run step settings

The CI **Run** step has the following settings.

:::info

Depending on the stage's build infrastructure, some settings might be unavailable or optional. Settings specific to containers, such as **Set Container Resources**, are not applicable when using the step in a stage with VM or Harness Cloud build infrastructure.

:::

### Metadata

* **Name:** Enter a name summarizing the step's purpose. Harness automatically assigns an [ID](/docs/platform/references/entity-identifier-reference.md) based on the **Name**.
* **Description:** Optional text string describing the step's purpose.

### Container Registry and Image

**Container Registry** and **Image** ensure that the build environment has the binaries necessary to execute the commands that you want to run in this step. For example, a cURL script may require a cURL image, such as `curlimages/curl:7.73.0`.

<details>
<summary>When are Container Registry and Image required?</summary>

The stage's build infrastructure determines whether these fields are required or optional:

* [Kubernetes cluster build infrastructure](./set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md): **Container Registry** and **Image** are always required.
* [Local runner build infrastructure](./set-up-build-infrastructure/define-a-docker-build-infrastructure.md): **Run** steps can use binaries available on the host machine. The **Container Registry** and **Image** are required if the machine doesn't have the binary you need.
* [Self-managed AWS/GCP/Azure VM build infrastructure](/docs/category/set-up-vm-build-infrastructures): **Run** steps can use binaries that you've made available on your build VMs. The **Container Registry** and **Image** are required if the VM doesn't have the necessary binaries. These fields are located under **Optional Configuration** for stages that use self-managed VM build infrastructure.
* [Harness Cloud build infrastructure](./set-up-build-infrastructure/use-harness-cloud-build-infrastructure.md): **Run** steps can use binaries available on Harness Cloud machines, as described in the [image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). The **Container Registry** and **Image** are required if the machine doesn't have the binary you need. These fields are located under **Optional Configuration** for stages that use Harness Cloud build infrastructure.

</details>

<details>
<summary>What are the expected values for Container Registry and Image?</summary>

For **Container Registry**, provide a Harness container registry connector, such as a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/), that connects to a container registry, such as Docker Hub, where the **Image** is located.

For **Image**, provide the FQN (fully-qualified name) or artifact name and tag of the Docker image to use when this step runs commands, for example `us-docker.pkg.dev/gar-prod-setup/harness-public/harness/cache:latest` or `maven:3.8-jdk-11`. If you don't include a tag, Harness uses the `latest` tag.

You can use any Docker image from any Docker registry, including Docker images from private registries. Different container registries require different name formats, for example:

* **Docker Registry:** Input the name of the artifact you want to deploy, such as `library/tomcat`. Wildcards aren't supported. FQN is required for images in private container registries.
* **ECR:** Input the FQN of the artifact you want to deploy. Images in repos must reference a path, for example: `40000005317.dkr.ecr.us-east-1.amazonaws.com/todolist:0.2`.
* **GAR:** Input the FQN of the artifact you want to deploy. Images in repos must reference a path starting with the project ID that the artifact is in, for example: `us-docker.pkg.dev/gar-prod-setup/harness-public/harness/cache:latest`.

<figure>

![](./static/run-step-settings-03.png)

<figcaption>Configuring a Container Registry and Image settings.</figcaption>
</figure>

</details>

<details>
<summary>Pulling images from JFrog Artifactory Docker registries</summary>

If you need to pull images from a JFrog Artifactory Docker registry, create a Docker connector that connects to your JFrog instance. **Don't use the Harness Artifactory connector** - The Artifactory connector only supports JFrog non-Docker registries.

To create a Docker connector for a JFrog Docker registry:

1. Go to **Connectors** in your Harness project, organization, or account resources, and select **New Connector**.
2. Select **Docker Registry** under **Artifact Repositories**.
3. Enter a **Name** for the connector. The **Description** and **Tags** are optional.
4. For **Provider Type**, Select **Other**.
5. In **Docker Registry URL**, enter your JFrog URL, such as `https://mycompany.jfrog.io`.
6. In the **Authentication** settings, you must use **Username and Password** authentication.
   * **Username:** Enter your JFrog username.
   * **Password:** Select or create a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing the password corresponding with the **Username**.
7. Complete any other settings and save the connector. For information all Docker Registry connector settings, go to the [Docker connector settings reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).

:::tip JFrog URLs

The JFrog URL format depends on your Artifactory configuration, and whether your Artifactory instance is local, virtual, remote, or behind a proxy. To get your JFrog URL, you can select your repo in your JFrog instance, select **Set Me Up**, and get the repository URL from the server name in the `docker-login` command.

![](./static/artifactory-connector-settings-reference-09.png)

For more information, go to the JFrog documentation on [Repository Management](https://www.jfrog.com/confluence/display/JFROG/Repository+Management) and [Configuring Docker Repositories](https://www.jfrog.com/confluence/display/RTF/Docker+Registry#DockerRegistry-ConfiguringDockerRepositories).

:::

</details>

### Shell and Command

Use these fields to define the commands that you need to run in this step.

For **Shell**, select the shell type. Options include: **Bash**, **PowerShell**, **Pwsh** (PowerShell Core), **Sh**, and **Python**. If the step includes commands that aren't supported for the selected shell type, the build fails. Required binaries must be available on the build infrastructure or through a specified [Container Registry and Image](#container-registry-and-image).

In the **Command** field, enter [POSIX](https://en.wikipedia.org/wiki/POSIX) shell script commands for this step. The script is invoked as if it were the entry point. If the step runs in a container, the commands are executed inside the container.

<Tabs>
  <TabItem value="bash" label="Bash" default>

For Bash, set the `shell` to `Bash` and enter your Bash script in `command`. For example, the following step runs a Bash script that checks the Java version:

```yaml
              - step:
                  ...
                  spec:
                    shell: Bash
                    command: |-
                      JAVA_VER=$(java -version 2>&1 | head -1 | cut -d'"' -f2 | sed '/^1\./s///' | cut -d'.' -f1)
                      if [[ $JAVA_VER == 17 ]]; then
                        echo successfully installed $JAVA_VER
                      else
                        exit 1
                      fi
```

</TabItem>
  <TabItem value="powershell" label="PowerShell">

For PowerShell, set the `shell` to `Powershell` and enter your PowerShell script in `command`, for example:

```yaml
              - step:
                  ...
                  spec:
                    shell: Powershell
                    command: Wait-Event -SourceIdentifier "ProcessStarted"
```

:::tip

You can run PowerShell commands on Windows VMs running in AWS build farms.

:::

</TabItem>
  <TabItem value="pwsh" label="Pwsh (PowerShell Core)">

You can run PowerShell Core commands in pods or containers that have `pwsh` installed. For PowerShell Core, set the `shell` to `Pwsh` and enter your PowerShell Core script in `command`. For example, this step runs `ForEach-Object` over a list of events.

```yaml
              - step:
                  ...
                  spec:
                    shell: Pwsh
                    command: |-
                      $Events = Get-EventLog -LogName System -Newest 1000
                      $events | ForEach-Object -Begin {Get-Date} -Process {Out-File -FilePath Events.txt -Append -InputObject $_.Message} -End {Get-Date}
```

</TabItem>
  <TabItem value="sh" label="Sh">

You can use the `Sh` option to run any shell script, provided the necessary binaries are available. For example, this step pulls the latest `python` image and then executes a shell script (`Sh`) that runs `pytest` with code coverage.

```yaml
              - step:
                  ...
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: python:latest
                    shell: Sh
                    command: |-
                      echo "Welcome to Harness CI"
                      uname -a
                      pip install pytest
                      pip install pytest-cov
                      pip install -r requirements.txt

                      pytest -v --cov --junitxml="result.xml" test_api.py test_api_2.py test_api_3.py
```

</TabItem>
  <TabItem value="python" label="Python">

For Python, set the `shell` to `python` and enter your Python commands in `command`, for example:

```yaml
            steps:
              - step:
                  ...
                  spec:
                    shell: Python
                    command: |-
                      print('Hello, world!')
```

</TabItem>
</Tabs>

#### Reference background services

You can reference services started in [Background steps](./manage-dependencies/background-step-settings.md) by using the Background step's **Id** in your Run step's **Command**. For example, a cURL command could call `BackgroundStepId:5000` where it might otherwise call `localhost:5000`. The exact format depends on your build infrastructure. For more information, go to [Background step settings - Name and ID](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings/#name-and-id) and [Background step settings - Port Bindings](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings/#port-bindings).

<figure>

![](./manage-dependencies/static/background-step-settings-call-id-in-other-step.png)

<figcaption>The Background step ID, <code>pythonscript</code>, is used in a cURL command in a Run step.</figcaption>
</figure>

If the Background step is inside a step group, you must include step group ID, such as `StepGroupId_BackgroundStepId:5000`, even if both steps are in the same step group.

#### Scripts that produce output variables

If your script produces an output variable, you must declare the output variable in the Run step's [Output Variables](#output-variables). For example, the following step runs a `python` script that defines an output variable called `OS_VAR`, and `OS_VAR` is also declared in the `outputVariables`.

```yaml
              - step:
                  type: Run
                  name: Run_2
                  identifier: Run_2
                  spec:
                    shell: Python
                    command: |-
                      import os
                      os.environ["OS_VAR"] = value
                    outputVariables:
                      - name: OS_VAR
```

#### Images without a shell

To support Docker images without a shell, the **Command** field is optional. You must provide either **Image**, **Command**, or both. If you provide only **Image**, Harness runs the image entrypoint.

If **Command** is empty or omitted, then Harness ignores **Shell**. The default value for **Shell** is `Sh`; however the presence of **Shell** doesn't require **Command**.

### Report Paths

If relevant to the commands in your Run step, you can specify one or more paths to files that store [test results in JUnit XML format](./run-tests/test-report-ref.md). You can add multiple paths. If you specify multiple paths, make sure the files contain unique tests to avoid duplicates. [Glob](https://en.wikipedia.org/wiki/Glob_(programming)) is supported.

This setting is required for the Run step to be able to [publish test results](./run-tests/viewing-tests.md).

For example, this step runs `pytest` and produces a test report in JUnit XML format.

```yaml
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |-
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

### Environment Variables

You can inject environment variables into the step container and use them in the commands executed in this step. You must input a **Name** and **Value** for each variable.

You can reference environment variables by name in commands. For example, a Bash script would use `$var_name` or `${var_name}`, and a Windows PowerShell script would use `$Env:varName`.

Variable values can be [fixed values, runtime inputs, or expressions](/docs/platform/variables-and-expressions/runtime-inputs). For example, if the value type is expression, you can input a value that references the value of some other setting in the stage or pipeline.

<figure>

![](./static/run-step-settings-04.png)

<figcaption>Using a Harness expression for an environment variable value.</figcaption>
</figure>

:::tip Stage variables

[Stage variables](/docs/platform/pipelines/add-a-stage.md#stage-variables) are inherently available to steps as environment variables.

:::

### Output Variables

<OutVar />
<EnhancedOutVar/>
<!--<details>
<summary>Export output variables to stage or pipeline variables</summary>

You can also export step output variables to stage/pipeline environment variables, because they are available through the pipeline.

For example, if a step exported an output variable called `BUILD_NUM`, you could use the following syntax to reference this variable later in the pipeline:

```
<+pipeline.stages.[stageID].variables.BUILD_NUM>
```

</details>-->

### Additional container settings

Settings specific to containers are not applicable in a stages that use VM or Harness Cloud build infrastructure.

#### Privileged

Enable this option to run the container with escalated privileges. This is equivalent to running a container with the Docker `--privileged` flag.

#### Image Pull Policy

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify an image pull policy:

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it is not already present locally.
* **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

#### Run as User

If you specified a [Container Registry and Image](#container-registry-and-image), you can specify the user ID to use for running processes in containerized steps.

For a Kubernetes cluster build infrastructure, the step uses this user ID to run all processes in the pod. For more information, go to [Set the security context for a pod](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/#set-the-security-context-for-a-pod).

#### Set Container Resources

Maximum resources limits for the resources used by the container at runtime:

* **Limit Memory:** Maximum memory that the container can use. You can express memory as a plain integer or as a fixed-point number with the suffixes `G` or `M`. You can also use the power-of-two equivalents, `Gi` or `Mi`. Do not include spaces when entering a fixed value. The default is `500Mi`.
* **Limit CPU:** The maximum number of cores that the container can use. CPU limits are measured in CPU units. Fractional requests are allowed. For example, you can specify one hundred millicpu as `0.1` or `100m`. The default is `400m`. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).

### Timeout

Set the timeout limit for the step. Once the timeout limit is reached, the step fails and pipeline execution continues. To set skip conditions or failure handling for steps, go to:

* [Step Skip Condition settings](/docs/platform/pipelines/step-skip-condition-settings.md)
* [Step Failure Strategy settings](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)

## Run step logs and test results

During and after pipeline runs, you can find step logs on the [Build details page](./viewing-builds.md).

If your pipeline runs tests, you can [view test reports](./run-tests/viewing-tests.md) on the Build details page.

## Hidden/Invisible Characters
Customers may occasionally encounter unexplained behavior in their scripts caused by hidden or invisible characters. These characters often appear when copying and pasting from non-plain-text sources and can lead to unexpected script errors. Harness includes a feature to display invisible characters, which is enabled by default.

When invisible characters are present, users will see a highlighted space in their scripts.
![](./static/invisiblechr-01.png)

They can hover over the highlight to view the character and click "Adjust settings" to manage the display.
![](./static/invisiblechr-hover.png)

If a selection was accidentally made, the user can right-click within the script area and open the **Command Palette**.
![](./static/invisiblechr-cmdplt.png)

A dialog box will appear, allowing the user to search for and toggle the setting that controls how invisible characters are highlighted.
![](./static/invisiblechr-toggle.png)

## Troubleshoot script execution (Run steps)

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to script execution and using Run steps, such as:

* [Can I use an image that doesn't have a shell in a Run step?](/kb/continuous-integration/continuous-integration-faqs/#can-i-use-an-image-that-doesnt-have-a-shell-in-a-run-step)
* [Is a Docker image required to use the Run step on local runner build infrastructure?](/kb/continuous-integration/continuous-integration-faqs/#is-a-docker-image-required-to-use-the-run-step-on-local-runner-build-infrastructure)
* [When attempting to export an output variable from a Run step using a Python shell, the step fails with "no such file or directory"](/kb/continuous-integration/continuous-integration-faqs/#when-attempting-to-export-an-output-variable-from-a-run-step-using-a-python-shell-the-step-fails-with-no-such-file-or-directory)
* [What does the "Failed to get image entrypoint" error indicate in a Kubernetes cluster build?](/kb/continuous-integration/continuous-integration-faqs/#what-does-the-failed-to-get-image-entrypoint-error-indicate-in-a-kubernetes-cluster-build)
* [Does the Harness Run step overwrite the base image container entry point?](/kb/continuous-integration/continuous-integration-faqs/#does-the-harness-run-step-overwrite-the-base-image-container-entry-point)
* [Why is the default entry point not running for the container image used in the Run step?](/kb/continuous-integration/continuous-integration-faqs/#why-is-the-default-entry-point-not-running-for-the-container-image-used-in-the-run-step)
* [How do I start a service started in a container that would usually be started by the default entry point?](/kb/continuous-integration/continuous-integration-faqs/#since-the-default-entry-point-isnt-executed-for-the-container-image-used-in-the-run-step-how-do-i-start-a-service-started-in-a-container-that-would-usually-be-started-by-the-default-entry-point)
* [How do I run the default entry point of the image used in the Run step?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-run-the-default-entry-point-of-the-image-used-in-the-run-step)
* [Does CI support running Docker-in-Docker images?](/kb/continuous-integration/continuous-integration-faqs/#does-ci-support-running-docker-in-docker-images)
* [Can't connect to Docker daemon with Docker-in-Docker Background step.](/kb/continuous-integration/continuous-integration-faqs/#cant-connect-to-docker-daemon)
* [Concatenated variable values in PowerShell scripts print to multiple lines](/kb/continuous-integration/continuous-integration-faqs/#concatenated-variable-values-in-powershell-scripts-print-to-multiple-lines)
