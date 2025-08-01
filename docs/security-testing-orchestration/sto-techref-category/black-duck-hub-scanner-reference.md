---
title: Black Duck step configuration
description: Scan code repositories and container images with Black Duck.
sidebar_label: Black Duck step configuration
sidebar_position: 70
---

<DocsTag   text="Code repo scanners"  backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#code-repo-scanners"  />
<DocsTag   text="Artifact scanners" backgroundColor= "#cbe2f9" textColor="#0b5cad" link="/docs/security-testing-orchestration/whats-supported/scanners?view-by=target-type#artifact-scanners"  />
<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

You can scan your repositories and container images using [Black Duck Hub](https://sig-product-docs.synopsys.com/bundle/bd-hub/page/Welcome.html) and ingest the results into Harness STO. 

<!-- https://sig-product-docs.synopsys.com/bundle/bd-hub/page/Administration/Hub101.html -->

## Important notes for running Black Duck Hub scans in STO


- You need to add a [Docker-in-Docker background step](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) to scan container images on Kubernetes or Docker build infrastructures. 
  - Blackduck only supports scanning older images, so the Docker-in-Docker step must be compatible with the version mentioned in the [BDH support](https://community.synopsys.com/s/article/Black-Duck-docker-inspector-scan-Exception-thrown-while-getting-image-packages-null). If scanning a tar file, ensure it is generated using a Docker version that is compatible with this requirement.

- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).

import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/more-information.md';

<StoMoreInfo />


## Black Duck Hub step settings for STO scans

The recommended workflow is to add a BlackDuck step to a Security or Build stage and then configure it as described below.


### Scan

#### Scan Mode

import StoSettingScanMode from './shared/step-palette/scan/type.md';
import StoSettingScanModeOrch from './shared/step-palette/scan/mode/orchestration.md';
import StoSettingScanModeDataload from './shared/step-palette/scan/mode/extraction.md';
import StoSettingScanModeIngest from './shared/step-palette/scan/mode/ingestion.md';

<!-- 
add Dataload support per DOC-2794 
-->

<!-- StoSettingScanMode / -->
<StoSettingScanModeOrch />
<StoSettingScanModeDataload />   
<StoSettingScanModeIngest />

<a name="scan-config"></a>

#### Scan Configuration

import StoSettingProductConfigName from './shared/step-palette/scan/config-name.md';

<StoSettingProductConfigName />

### Target


#### Type

import StoSettingScanTypeRepo     from './shared/step-palette/target/type/repo.md';
import StoSettingScanTypeCont from './shared/step-palette/target/type/image.md';

<StoSettingScanTypeRepo />
<StoSettingScanTypeCont />


#### Target and Variant Detection 

import StoSettingScanTypeAutodetectRepo from './shared/step-palette/target/auto-detect/code-repo.md';
import StoSettingScanTypeAutodetectContainer from './shared/step-palette/target/auto-detect/container-image.md';
import StoSettingScanTypeAutodetectNote from './shared/step-palette/target/auto-detect/note.md';

<StoSettingScanTypeAutodetectRepo/>
<StoSettingScanTypeAutodetectContainer/>
<StoSettingScanTypeAutodetectNote/>


#### Name 

import StoSettingTargetName from './shared/step-palette/target/name.md';

<StoSettingTargetName />


#### Variant

import StoSettingTargetVariant from './shared/step-palette/target/variant.md';

<StoSettingTargetVariant  />


#### Workspace

import StoSettingTargetWorkspace from './shared/step-palette/target/workspace.md';

<StoSettingTargetWorkspace  />

### Container image


#### Type

The registry type where the image is stored: 

* **Docker v2** A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry).

* **[AWS ECR](https://aws.amazon.com/ecr/)** 

* **[Jfrog Artifactory](https://jfrog.com/artifactory/)** 

* **Local Image in this Stage** Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount).

* **Local OCI/Docker archive in this Stage** Scan an OCI or Docker archive that has been created and stored within the current stage. The path to the archive can be specified via the workspace field, and ensure that the path to which the archive is saved is a shared volume mount.


#### Domain (_extraction_)

import StoSettingImageDomain from './shared/step-palette/image/domain.md';

<StoSettingImageDomain />


#### Name

import StoSettingImageName from './shared/step-palette/image/name.md';

<StoSettingImageName />


#### Tag

import StoSettingImageTag from './shared/step-palette/image/tag.md';

<StoSettingImageTag />

### Ingestion


#### Ingestion File

import StoSettingIngestionFile from './shared/step-palette/ingest/file.md';

<StoSettingIngestionFile  />

### Authentication

#### Domain

import StoSettingAuthDomain from './shared/step-palette/auth/domain.md';

<StoSettingAuthDomain />


#### Enforce SSL

import StoSettingProductSSL from './shared/step-palette/auth/ssl.md';

<StoSettingProductSSL />


#### API Version

import StoSettingApiVersion from './shared/step-palette/auth/api-version.md';

<StoSettingApiVersion />


#### Type

import StoSettingAuthType from './shared/step-palette/auth/type.md';

<StoSettingAuthType />


<!-- 

#### Access ID (_orchestration_)

import StoSettingAuthAccessID from './shared/step-palette/auth/access-id.md';

<StoSettingAuthAccessID />

-->


#### Access Token

import StoSettingAuthAccessToken from './shared/step-palette/auth/access-token.md';

<StoSettingAuthAccessToken />



### Scan Tool

#### Project Name

import StoSettingToolProjectName from './shared/step-palette/tool/project/name.md';

<StoSettingToolProjectName />

#### Project Version

import StoSettingToolProjectVersion from './shared/step-palette/tool/project/version.md';

<StoSettingToolProjectVersion />


### Log Level

import StoSettingLogLevel from './shared/step-palette/all/log-level.md';

<StoSettingLogLevel />

### Additional CLI flags

Use this field to run the [`synopsis detect` scanner](https://blackducksoftware.github.io/synopsys-detect) with flags such as: 

`-detect.tools.excluded {DETECTOR, SIGNATURE}`

This string [excludes some detectors from a scan](https://community.synopsys.com/s/article/Allow-only-certain-Detect-tools-to-take-effect).

import StoSettingCliFlagsCaution from '/docs/security-testing-orchestration/sto-techref-category/shared/step-palette/all/cli-flags-caution.md';

<StoSettingCliFlagsCaution />


### Fail on Severity

import StoSettingFailOnSeverity from './shared/step-palette/all/fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step-palette/all/settings.md';

<StoSettingSettings />



### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from '/docs/security-testing-orchestration/sto-techref-category/shared/proxy-settings.md';

<ProxySettings />

## Troubleshooting Black Duck Hub

### Scan fails with message "Could not connect to addon client after max retries"

This message indicates that indicates that the container running the BlackDuck scan step is terminated abruptly due to insufficient resources. Harness recommends that you increase the resource allocation using an iterative approach: Run the scan again with `memory: 1Gi` and `cpu: "1.0"`, monitor the results, and adjust the resource allocation until the scanner runs successfully.

For more information, go to [Optimize STO pipelines](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/optimize-sto-pipelines).

