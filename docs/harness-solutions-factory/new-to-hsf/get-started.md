---
title: Get started with HSF
sidebar_label: Get Started
description: Onboarding guide for HSF
sidebar_position: 20
---

Welcome to the HSF onboarding guide. Discover how Harness accelerates onboarding and adoption by reducing setup time and maintaining best practices

## Pre Deployment of HSF
### Prerequisites

Before beginning, ensure you have: 

- Access to a Harness Account
- Ability to create an admin level token

If you do not meet all these prerequisites but think your organization could benefit from HSF, please reach out to your Harness account team.

## Post Deployment of HSF
Now that HSF has been deployed, what’s next? Below are a couple things to get you started using Harness Solutions Factory:

- Create Organizations and Projects. [This lab](../hands-on-labs/getting-started-lab.md) goes over some details. 
- Add users to the HSF Admin, HSF Users (account level) and HSF Mirror Reviewers (organization level) groups
    - This can be bound to SSO Provider Groups
    - Decide on the notification preferences for HSF Admins (Slack, Email, Teams) 
    - You can also change the mirror schedule by going into Harness Pilot Light and finding the `mirror_schedule` variable 
- Change token configurations
    - You can change the rotation schedule or if it should rotate on a schedule by going into Harness Pilot Light and finding the `should_rotate_on_schedule` and `rotation_schedule` variables
    - By default we create a one year token with a weekly rotation.
- If you want move your [Custom Harness Template Library](../custom-harness-template-library/setup-custom-htl.md) to a SCM of your choice:
    - In Account Variables change the Custom Template Library Connector and Custom Template Library Repo 
- If you want to change your HSF execution to use Kubernetes check out [this document](../configurations/converting-to-kubernetes.md)
- Add credentials to Dockerhub Connector 
    - When HSF is deployed we use an organization level connector (`hsf_dockerhub_connector`) to DockerHub using an anonymous authentication. Be sure to add credentials so you are not rate limited by DockerHub
- If you are using a different container registry:
    - Change the `hsf_pipeline_connector_ref` to the appropriate link
    - If you are using Nexus or Artifactory make sure you include the fully qualified path for the differenet images

There will be a lot of resources that are created into your account once HSF is deployed. Be sure to review [this document](../use-hsf/created-resources.md) to understand what was created and where it all lives. 
