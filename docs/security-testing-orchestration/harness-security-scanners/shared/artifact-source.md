import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>

<TabItem value="Harness" label="HAR" default>

* **Registry:** Select the Harness Registry configured for the Harness Artifact Registry where your artifact is stored.

* **Image:** Enter the name of your image with tag or digest, such as `imagename:tag` or `imagename:digest`.

</TabItem>


<TabItem value="Third-Party" label="Third-Party" default>

The registry type where the image is stored: 

* **Docker v2** A registry that uses the Docker Registry v2 API such as [Docker Hub](https://docs.docker.com/registry/spec/api/), [Google Container Registry](https://cloud.google.com/container-registry), or [Google Artifact Registry](https://cloud.google.com/artifact-registry). STO will automatically pull and scan the container image or OCI/Docker archive.

  - **Image:** Enter the name of your image using either a tag or a digest. For example: `my-docker-org/repo-name:tag` or `my-docker-org/repo-name@sha256:<digest>`

* **[AWS ECR](https://aws.amazon.com/ecr/)** Set your AWS ECR connector with image details. STO will automatically pull and scan the container image or OCI/Docker archive.
   - **Image:** Image: Enter the name of your image with tag or digest. For example: such as `my-docker-repo/my-artifact:latest` or `my-docker-repo/my-artifact@sha256:<digest>`.
   - **Access ID:** The Access ID is the AWS Access Key ID used to authenticate with Amazon ECR.
   - **Access Token:** The Access Token is the AWS Secret Access Key associated with the Access ID.
   - **Region:** The region where the image to scan is located, as defined by the cloud provider such as AWS.

* **[Jfrog Artifactory](https://jfrog.com/artifactory/)** Set your Jfrog Artifactory connector with image details. STO will automatically pull and scan the container image or OCI/Docker archive.
   - **Image:** Specify the fully qualified image name stored in JFrog Artifactory. For example: such as `<registry>/<repository>/<image>:<tag>` or `<registry>/<repository>/<image>@sha256:<digest>`
   - **Access ID/Username:** The username to log in to the image registry.
   - **Access Token:** The access token used to log in to the image registry. This is usually a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).


</TabItem>

<TabItem value="Local" label="Local" default>

* **Local Image in this Stage** Scan a local image built and stored within the context of the current stage (via `/var/run/docker.sock` registered as a stage level volume mount). For this, you will need to [configure Docker-in-Docker](/docs/security-testing-orchestration/sto-techref-category/security-step-settings-reference#configuring-docker-in-docker-dind-for-your-pipeline) as a background step. STO will identify and scan the container image matching the step configuration inside the Docker-in-Docker background within that stage.

* **Local OCI/Docker archive in this Stage** Scan an OCI or Docker archive created and stored within the current stage. STO will scan the archive based on the path configured in the workspace field during the step. Ensure that the path to which the archive is saved is a shared volume mount.

* **Image** Enter the name of your image with tag or digest, such as `imagename:tag`.

</TabItem>

</Tabs>