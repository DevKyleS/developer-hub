---
title: Internal Developer Portal Release Notes
sidebar_label: Internal Developer Portal
date: 2024-12-11T22:00
sidebar_position: 12
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/internal-developer-portal/rss.xml" />

Review the notes below for details about recent changes to Harness Internal Developer Portal.

:::info About Harness Release Notes

- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, and Self-Managed Enterprise Edition release notes.

:::

## 📌 Release Deployment Status by Cluster

**Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.

<!-- Let's maintain last 3 here. -->

| **Version** | **prod0** | **prod1** | **prod2** | **prod3** | **prod4** | **prodeu1** |
| ----------- | --------- | --------- | --------- | --------- | --------- | ----------- |
| [2025.07.v1](/release-notes/internal-developer-portal#july---202507v1)                               | ✅        | ✅         | ✅         | ✅          | ✅          | ✅            |
| [2025.06.v1](/release-notes/internal-developer-portal#june---202506v1)  | ✅        | ✅        | ✅        | ✅        | ✅        | ✅          |
| [2025.05.v1](/release-notes/internal-developer-portal#-releasing-harness-idp-20-beta---may-202505v1) | ✅        | ✅        | ✅        | ✅        | ✅        | ✅          |


## July - [2025.07.v1]


###  [New feature] Harness Git Experience (GitX) — Now Bi-Directional

Harness IDP's Git Experience has been upgraded to offer full [**bi-directional sync**](https://developer.harness.io/docs/internal-developer-portal/git-experience/gitx-journey/#bi-directional-sync-between-harness-and-git). You can now manage **Catalog entities and Workflows** directly from your Git repository — while still retaining visibility and control within the IDP UI.

Key highlights:

**New features:**

* When you configure a Git repository for use with GitX, a webhook is automatically added. This enables real-time sync from Git to IDP without requiring manual webhook setup.
* From the Catalog page, you can now switch branches and preview configurations before they go live. This is useful for testing or working with feature branches.
* Any changes made in Git will now be reflected in IDP, provided the webhook is enabled.

**Recap of existing behavior:**

* Changes made via the IDP UI can be pushed back to Git, if Git sync is enabled.
* Only the default branch will be active and reflected in the IDP runtime.

This unlocks GitOps-style workflows, where Git remains the source of truth, and IDP becomes the real-time visual dashboard.

###  [New feature] Visualize Ingested Properties

When you use Catalog Ingestion API to push custom metadata, it is not committed back to the YAML file but is part of the final entity metadata shown in IDP UI. You can now visualize all ingested properties in the entity YAML view.

![](./static/internal-developer-portal/ingested.png)

More details: [Visualizing Ingested Metadata](https://developer.harness.io/docs/internal-developer-portal/git-experience/ingested-metadata)

###  [New feature] Increased Bitbucket API Rate Limits

Bitbucket Git Connector in IDP now also supports API Key Authentication which allows for higher API rate limits when used in syncing files or Scorecards computation.

If you are facing Bitbucket API rate limit issues, please update your Bitbucket connector with a new one using API Key authentication.

You must also upgrade your Harness Delegate used in the Git connector to **version `25.06.86202` or newer**.

### Bug Fixes and Improvements

* **Enhancements to Git Experience (GitX) Entity Views and Behavior**
  Several improvements have been made to streamline how Git-synced entities are displayed and managed within IDP:

  * The **Edit Entity** page now features a refined Git details header for improved clarity.
  * A **branch selector** has been added to the **Entity Details** view, allowing users to view configurations across branches while continuing to treat the default branch as the source of truth.
  * Scorecard computations are now consistently based on the **default branch only**, aligning with runtime behavior.
  * Fixed a bug where `connector_ref` was incorrectly passed as an empty string during **Harness Code Repo** setup; this is now handled safely.
    *\[IDP-5579, IDP-5477, IDP-5493, IDP-5816]*

* **New Default Role: `IDP Workflow Executor`**
  A new out-of-the-box role called **`IDP Workflow Executor`** is now available at all scopes (Account, Org, and Project). This role includes `View` and `Execute` permissions for IDP Workflows and allows platform teams to grant workflow execution access without creating custom roles.
  This change is part of a **Platform/Access Control service release**, not the core IDP module release.
  *\[IDP-5542]*


* **Error Handling for Entity Import from Harness Code Repo**
  Fixed a backend issue that caused entity import to fail when using **Harness Code Repo** with Git Experience enabled by default. The system now gracefully handles this scenario without requiring manual configuration toggles.
  *\[IDP-5855]*

* **YAML Editor Now Shows Latest Saved State**
  Resolved an issue where the UI YAML editor reverted to a stale version after clicking “Save Changes.” This could cause users to overwrite prior edits unintentionally. The editor now properly reflects the latest saved YAML after each update.
  *\[IDP-5851]*

* **Owner Field Display Flicker Resolved in Catalog Table**
  Fixed a UI glitch where user group names in the "owner" field of the Catalog table would intermittently flicker between full text and ellipsis. Styling has been corrected for better consistency.
  *\[IDP-5792]*



## June - [2025.06.v1]

<!-- June 20, 2025 -->

Last month, Harness IDP announced a major **BETA release**: **Harness IDP 2.0**. This release wasn’t just an upgrade — it was a **complete rebuild** of the Internal Developer Portal (IDP), designed to support **enterprise-scale adoption**.

We’re truly overwhelmed by the response we’ve received so far for IDP 2.0 and are incredibly grateful to all the customers and teammates who tried it out and shared valuable feedback.

This month, we're taking it a step further by launching the **Harness IDP Git Experience** — a major feature update aimed at making your IDP 2.0 experience even better. Since the beta launch, we've been heads-down fixing bugs and polishing features based on your feedback.

Let’s dive into what’s new!

### \[New Feature] Introducing Harness IDP Git Experience with IDP 2.0

**\[IDP-4596] | [Docs](/docs/internal-developer-portal/git-experience/gitx-journey)**

---

This release marks a major milestone for IDP 2.0 with the support for **Harness IDP Git Experience**.

In IDP 1.0, users had to manually manage Catalog YAML files for each update. With IDP 2.0, we introduced **inline entities**, removing the hard dependency on YAML. Now, with the Git Experience, we’re bringing back YAML files in Git through **native Git Experience**.

![](./static/internal-developer-portal/harness-idp-gitx.png)

Here’s what you can do with the new Git Experience:

| Feature                                                                            | Status                                          |
| ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Store entity YAML in Git**                                                       | ✅ Available                                    |
| **Import YAML from Git** and create a new entity                                   | ✅ Available                                    |
| **IDP to Git changes**: Make changes in IDP and commit changes to YAML file in Git | ✅ Available                                    |
| **Git to IDP changes**: Make changes to YAML file in Git and update entity in IDP  | 🚧 (Work in Progress) ETA: Week of July 4, 2025 |

You can now also **convert existing inline entities to remote entities** and store their YAMLs in Git, unlocking advanced Git-native workflows. We have also provided a [script](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o#step-7-store-entity-yamls-in-git) for you to convert ALL inline entities to remote in bulk.

Learn more about this feature [here](/docs/internal-developer-portal/git-experience/gitx-journey).

---

### \[New Plugin] GitHub Co-Pilot Plugin

**\[IDP-5571] | [Docs](/docs/internal-developer-portal/plugins/available-plugins/github-copilot)**

We’re excited to introduce support for the **GitHub Co-Pilot** plugin in this release!

The plugin brings **GitHub Copilot Enterprise** usage insights directly into Harness IDP, helping you visualize:

- Suggestion acceptance rates
- Language-wise usage distribution
- Overall Copilot activity

These insights empower engineering teams to evaluate and improve Copilot adoption across their organization.

[Read the plugin guide here](/docs/internal-developer-portal/plugins/available-plugins/github-copilot).

---

### \[New Plugin] BuildKite Plugin

**\[IDP-5531] | [Docs](/docs/internal-developer-portal/plugins/available-plugins/buildkite)**

We’re also launching the **BuildKite plugin**, which allows developers to **view and interact with BuildKite CI/CD pipelines** directly from the Harness IDP.

Key highlights:

- View real-time build statuses
- Trigger rebuilds directly from the portal
- Monitor pipelines entity-wise inside IDP

Perfect for teams looking to bring CI/CD visibility right into their developer portal workflows.

[Read the plugin guide here](/docs/internal-developer-portal/plugins/available-plugins/buildkite).

<!-- Currently there is an issue with Delegate. Check with Sathish. Most likely will be out next week or so.
- Bitbucket Cloud API Token Authentication in Git Integrations:
  We now support API Token based Bitbucket connector in IDP Git Integrations. If you have been struggling with Bitbucket API Rate Limits, you can now update your global IDP git connector to use the API Token based authentication - which has higher rate limits.
  \[IDP-5593] -->

### Bug Fixes and Improvements

- **`get-entities` API Returns Entities Across Scopes by Default:**
  The `get-entities` API now returns entities across all scopes (account, org, and project) by default when no `scope` parameter is provided. Previously, it returned only account-level entities unless explicitly specified. This enhancement aligns the API behavior with that of the UI, ensuring consistent and complete entity listings across use cases. [IDP-5704]

- **Output Variable Extraction now works with `apiKeySecret`:**
  You can now successfully fetch output variables when using `apiKeySecret` as workflow authentication. Previously, this caused token validation failures during execution. The issue has been resolved, and output variables now work seamlessly with `apiKeySecret`.
  \[IDP-5584]

- **Fixed Catalog Crash Due to Unhandled API Errors:**
  Resolved an issue where the Catalog page broke when an invalid `projectIdentifier` or `orgIdentifier` was present in the URL. This was caused by an unhandled 500/404 error response from the backend. A proper catch block has been added in the frontend to gracefully handle such server errors, ensuring the UI now shows a proper zero-state screen instead of failing silently. [IDP-5628]

- **Resolved Entity Breakage When Adding Tags to Services:**
  Fixed an issue where adding a tag to the `catalogapi` service in the demo account caused the entity to break. The backend now correctly processes tagged service updates, ensuring entity integrity is maintained in the catalog. [IDP-5632]

- **Improved Sync Consistency for Entities:**
  Fixed an issue where entities would sporadically disappear from the IDP catalog after updates via the UI. The system now ensures proper sync between the IDP database and the catalog, improving reliability during entity creation and updates.
  \[IDP-5654]

- **Entity Creation Filters Now Load Correctly:**
  Resolved an issue where filters such as `type`, `owner`, etc., were not appearing during entity creation. The root cause was a broken filter endpoint that failed when user preferences or scope information (org/project) were invalid. A fail-safe mechanism has been added to gracefully handle such cases.\[IDP-5666]

- **Tighter schema validation in Kubernetes plugin to prevent downtime:**
  To avoid critical downtime scenarios, IDP now includes schema validation for `authProvider` configuration. Misconfigured values will now be caught early and flagged instead of breaking the deployment. \[IDP-5683]

- **Visual Editor Lifecycle Update Stability**:
  Resolved an issue where updating the Lifecycle field of an entity using the Visual editor caused unexpected errors and led to a broken catalog view. This happened due to `null` score entities returned during scorecard validation. The backend logic has now been updated to handle such cases gracefully, ensuring entity updates via the Visual editor no longer cause save failures or UI disruptions. [IDP-5700]

## 🚀 Releasing Harness IDP 2.0 BETA - May [2025.05.v1]

<!-- May 15, 2025-->

### IDP: Reimagined for Enterprise-Scale Adoption

We’re thrilled to announce the **BETA release of Harness IDP 2.0** — a big step forward in how Harness IDP is imagined, built, and adopted at scale.

**Harness IDP 2.0** isn’t just an upgrade — it’s a complete rebuild of Harness IDP to support adoption at enterprise scale, bring in stronger access control, and a better developer experience. With foundational changes across architecture, security, scalability, and usability, IDP 2.0 marks a new chapter in how Harness IDP is **built, used and managed.**

<DocVideo src="https://www.youtube.com/watch?v=9Rj-jJp3Ehc" />

### Why IDP 2.0?

Harness IDP started as an all-in-one platform to improve the developer experience, built on top of Backstage. While **IDP 1.0** worked well, we saw that as our enterprise customers grew, they faced new challenges at scale — which led us to rethink what an **enterprise-ready IDP** truly looks like. These challenges included limited access control, lack of gradual workflow rollout, the burden of managing YAML files manually, Git rate-limiting issues due to a single connector, and a Catalog UI that couldn’t handle large-scale use cases. The system hierarchy also didn’t align with how customers structure their teams within the Harness platform.

**IDP 2.0** directly addresses these issues. It introduces more **granular access control**, **smoother rollout** capabilities, **easier entity updates without manual YAMLs**, better Git integration, and a redesigned Catalog experience. With these improvements, IDP 2.0 is ready to support enterprise teams with the flexibility and scale they need.

### What’s New in IDP 2.0?

Harness IDP 2.0 introduces core improvements across **architecture, security, scalability**, and **developer experience**, making it easier than ever to manage and scale your internal developer portal.

#### 🔐 **Platform Hierarchy & Granular RBAC**

**[Learn more](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#platform-hierarchy--granular-rbac) | [Docs](/docs/internal-developer-portal/rbac/scopes)**

---

Catalog entities and Workflows can now be created at the **Account**, **Organization**, and **Project** scopes. By default, entities at the Account scope are accessible platform-wide, while Project-level entities are scoped to the users that are added to the Project. This allows teams to manage their own components while sharing approved workflows across the org.

You can define custom roles with fine-grained permissions (Create, Edit, Read, Delete, Execute) using Harness’s native RBAC system and reusable resource groups.

![](./static/internal-developer-portal/workflow-scope.png)

#### 🧩 **UI-Driven Catalog Creation**

**[Learn more](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#ui-driven-catalog-entity-creation) | [Docs](/docs/internal-developer-portal/catalog/manage-catalog#creating-entities-idp-20)**

---

This feature allows you to create and manage entities **directly from the UI** with guided forms and **live YAML previews** (with real-time sync).
Standardized defaults and dropdowns reduce errors and onboarding time.

![](./static/internal-developer-portal/ui-way-creation.png)

#### 🖥️ **Improved UX & Scalability**

**[Learn more](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#improved-scalability--ux) | [Docs](/docs/internal-developer-portal/catalog/manage-catalog#using-scopes--filters-idp-20)**

---

The **Catalog and Workflow UIs** have been completely rebuilt for better visibility and usability:

- Scope-based filters allow users to narrow down to their team’s view.
- Catalog table supports search, sorting and pagination.
- Scorecards are now natively integrated into the Catalog view.
- Entity pages show scope, ownership, and references cleanly in the header.

![](./static/internal-developer-portal/catalog-new-ui.png)

#### 🔄 **New APIs for direct Catalog entity creation & updates**

**[Learn more](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path#api-changes-backstage-catalog-apis--harness-catalog-apis) | [API Docs](https://apidocs.harness.io/tag/Entities)**

---

IDP 2.0 introduces new APIs for direct Catalog entity creation and updates, ensuring responses properly incorporate Role-Based Access Control (RBAC) and entity scope considerations.

- Complete create/read/update/delete operations are accessible via Harness APIs
- New endpoints provide scope-aware operations aligned with Harness RBAC
- Catalog Ingestion APIs remain functional as before, though RBAC will now be enforced on updated entities

### For Existing IDP 1.0 Customers: Why Upgrade?

If you're already using Harness IDP 1.0, here’s why switching to 2.0 is worth it:

- **Harness-native Platform Hierarchy**: Catalog entities and Workflows now support Account, Org, and Project scopes, with built-in granular RBAC.
- **Easier automation without YAML file**: Entities can now be created and modified inline without having to deal with the YAML file git operations and its complexities.
- **New Catalog & Workflow UI**: Newer UX, brand new Catalog table with filters and built-in entity creation UX.
- **Backstage Plugin Support**: Continue using existing plugins without any changes.
- **Automatic Upgrade**: IDP 2.0 can be enabled via a feature flag. Your existing entities will be automatically upgraded to the new model.
- **Default Upgrade Behavior**: Entities will initially live at the Account scope. You can later organize them into Org/Project scopes as needed.

Harness IDP 2.0 is purpose-built for teams ready to scale adoption across the organization — without compromising control or experience.

### Ready to Upgrade?

You’re right — **IDP 2.0 is a significant upgrade**. But we’ve ensured the transition is smooth.

To help you plan and adopt with confidence, we’ve created:

- A detailed **[IDP 2.0 Overview Guide](/docs/internal-developer-portal/idp-2o-overview/2-0-overview-and-upgrade-path)**
- A comprehensive **[Step-by-Step Upgrade Handbook](/docs/internal-developer-portal/idp-2o-overview/migrating-idp-2o)**

Upgrading to IDP 2.0 is a **structured 6-step process**, and our team is here to guide you every step of the way.

## March - Version 0.41.0

<!-- March 25, 2025-->

As we gear up for our major **IDP 2.0 release** (more details this week), this release focuses primarily on improving the efficiency of the product. **Version 0.41.0** includes several bug fixes and feature enhancements. All key details are mentioned below.

Also, stay tuned for more updates on our upcoming IDP 2.0 release.

### [New Feature] GitHub App Support

**[IDP-4827] | [Docs](/docs/internal-developer-portal/flows/harness-pipeline#idp-stage-1)**

---

This release adds support for **GitHub App authentication** in IDP Stage steps. Previously, only **Username-Password** authentication was available. Now, you can authenticate the Harness GitHub connector using a **GitHub App**. To use this au thentication method, you need to create and install a GitHub App, fetch the app's installation ID and app ID, and create a private key for the app. Follow this [guide](https://developer.harness.io/docs/platform/connectors/code-repositories/git-hub-app-support/) for detailed steps.

![](./static/github-app-1.png)

This applies to the following IDP Stage steps:

1. [Git Clone](/docs/internal-developer-portal/flows/harness-pipeline#1-git-clone)
2. [Create Repo](/docs/internal-developer-portal/flows/harness-pipeline#3-create-repo)
3. [Direct Push](/docs/internal-developer-portal/flows/harness-pipeline#5-direct-push)
4. [Register Catalog](/docs/internal-developer-portal/flows/harness-pipeline#6-register-catalog)

👉 **Read more about this feature [here](/docs/internal-developer-portal/flows/harness-pipeline#idp-stage-1).**

### [New Feature] Jenkins Plugin Upgrade

**[IDP-4939] | [Docs](/docs/internal-developer-portal/plugins/available-plugins/jenkins)**

---

With this release, we've upgraded the **Jenkins Plugin** to its latest version. With this upgrade, support for **additional parameters** in your plugin backend configuration has been added. If you already have the plugin enabled, you can now optionally include these new parameters as needed. Here's what these parameters do:

#### 1. [`projectCountLimit`](/docs/internal-developer-portal/plugins/available-plugins/jenkins#1-projectcountlimit)

This parameter sets the **maximum number of Jenkins projects (jobs)** that the plugin will process or retrieve for a given Jenkins instance. It helps manage performance and load by limiting the number of projects fetched.

#### Example:

```yaml
jenkins:
  baseUrl: https://jenkins.example.com
  username: backstage-bot
  projectCountLimit: 100
  apiKey: 123456789abcdef0123456789abcedf012
```

#### 2. [`allowedBaseUrlOverrideRegex`](/docs/internal-developer-portal/plugins/available-plugins/jenkins#2-allowedbaseurloverrideregex)

This parameter specifies a regular expression pattern used to **securely override the `baseUrl`** defined in the configuration using values from the catalog annotations. This provides flexibility while adding security, ensuring only approved URLs can override the base configuration.

👉 **Read more about this feature [here](/docs/internal-developer-portal/plugins/available-plugins/jenkins).**

### [New Plugin] Introducing Wiz Plugin

**[IDP-4868] | [Docs](/docs/internal-developer-portal/plugins/available-plugins/wiz)**

---

We’re excited to introduce support for the **Wiz Plugin** in this release!

**Wiz** is a unified cloud security platform that offers powerful prevention and response capabilities, empowering security and development teams to build faster and more securely.

With this plugin, you can seamlessly integrate Wiz into your IDP, giving you real-time visibility into newly created issues along with their status and severity.

👉 **Read more about the plugin [here](/docs/internal-developer-portal/plugins/available-plugins/wiz).**

### [New Plugin] Introducing DX Plugin

**[IDP-4869] | [Docs](/docs/internal-developer-portal/plugins/available-plugins/dx)**

---

We’re excited to introduce support for the **DX Plugin** as well in this release!

The DX Plugin is built to enhance the overall developer experience by streamlining the development process. It offers actionable insights, essential tools, and seamless integrations — all tailored to improve productivity and optimize your workflow.

👉 **Read more about the plugin [here](/docs/internal-developer-portal/plugins/available-plugins/dx).**

### Feature Improvements

- Harness IDP now supports the use of a **Harness API Key** in the [Register Catalog step](/docs/internal-developer-portal/flows/harness-pipeline#6-register-catalog) (IDP Stage). With this feature, users can configure the API Key by selecting the "API Token" field in the Harness UI. Enabling this ensures that the API Key is utilized for catalog registration in IDP. By integrating the API Key, the pipeline execution remains seamless, ensuring it functions correctly when triggered from another pipeline or through a trigger. **Learn more about the feature [here](/docs/internal-developer-portal/flows/harness-pipeline#6-register-catalog)**. (Please note that this feature was a part of the NGUI release.)

### Bug Fixes

- Added support for **Mermaid diagrams** in TechDocs by integrating the Mermaid Plugin. Customers can now easily add Mermaid diagrams within TechDocs. Here's the [documentation](https://developer.harness.io/docs/internal-developer-portal/techdocs/techdocs-bestpractices/#1-using-mermaid-for-diagrams) to learn more about this use-case. [IDP-4844]
- Resolved an issue causing scorecard custom checks to fail incorrectly, even when in a successful state. Fixed by addressing **JEXL check** failures. [IDP-5002]
- Fixed an issue causing the **"title" field** to appear faded for **read-only parameters** (ui:readonly: true). Previously, users couldn't clearly view fields marked as read-only. [IDP-4766]

  **Before Fix:**
  ![](./static/internal-developer-portal/beforefix.png)

  **After Fix:**
  ![](./static/internal-developer-portal/afterfix.png)

- Fixed a **regex validation** issue occurring while configuring the `baseUrl` in the **SonarQube plugin**. This issue was thoroughly investigated and resolved. [IDP-4948]
- Fixed an issue preventing users from adding **arbitrary input values** when their preferred option wasn't listed in dynamic picker dropdown values. Users can now input arbitrary values into the dynamic picker field. [IDP-4872]
- Resolved a validation logic issue for **Scorecard checks** when using **Harness Code**. Corrected by fixing the parser logic. [IDP-4937]
- Resolved a **redirection URL** issue occurring when an account with a **vanity URL** enabled IDP. Added support for multiple hosts to fix this issue. [IDP-4415]
- Fixed a bug that allowed users to create **duplicate scorecards** using identifiers that already exist. This issue is now resolved. [IDP-4192]

## February - Version 0.40.0

<!-- February 26, 2025-->

:::info
Please note that the following features are behind a **Feature Flag**: `IDP_ENABLE_WORKFLOW_FORM_CONTEXT`.

- [**Updating Fields using Form Context**](/release-notes/internal-developer-portal.md#new-feature-updating-fields-using-form-context)
- [**Live User Validation using API Requests**](/release-notes/internal-developer-portal.md#new-feature-live-user-validation-using-api-requests)

Ensure that it is **enabled in your account** before use. To enable this feature, contact [**Harness Support**](mailto:support@harness.io).
:::

### [New Feature] Updating Fields using Form Context

**[IDP-4154] | [Docs](/docs/internal-developer-portal/flows/dynamic-picker#updating-fields-using-form-context) | [Tutorial](/docs/internal-developer-portal/flows/workflows-tutorials/pull-request-creator)**

---

With the introduction of Conditional API Requests in the last release, you can now create an interactive Workflow with dependent input fields. However, one of the challenges was requiring users to fill in too many text boxes, making it difficult for developers and platform engineers to fully utilize Workflows.

#### 🚀 [Introducing Form Context](/docs/internal-developer-portal/flows/dynamic-picker#updating-fields-using-form-context)

With this new release, we introduce **Form Context**, a global context (active per Workflow session) that allows Workflows to **dynamically update data fields** in the frontend based on user input. Using Dynamic Pickers, you can now configure Workflows to **auto-fill relevant fields** with data from third-party sources based on user selections or inputs.

When a user selects or provides input in a form field, the Form Context **automatically updates** with relevant data. Other fields—typically read-only can **subscribe to this context** and dynamically update based on the latest information.

#### 🚀 Use Case: [Repository Picker Workflow](/docs/internal-developer-portal/flows/workflows-tutorials/pull-request-creator#creating-a-repository-picker)

Previously, in a **repository picker** workflow, when a user entered their **GitHub username** and selected a repository, they still had to manually input details like the default branch and repository metadata.

With **Form Context**, dependent fields in the frontend **automatically update** based on the selection, reducing manual input and improving efficiency.

Here's how the YAML configuration and frontend look for this example:

```YAML {14,16,27,35,43}
parameters:
    - title: Repository Picker
      properties:
        gitUsername:
          title: Github username
          description: Enter your Github username
          type: string
        repoPicker:
          title: GitHub Repositories
          type: string
          description: Pick one of GitHub Repos
          ui:field: SelectFieldFromApi
          ui:options:
            path: proxy/github-api/users/{{parameters.gitUsername}}/repos
            valueSelector: full_name
            setContextData:
              repoName: name
              branch: default_branch
              type: visibility
        repositoryName:
          title: Repo Name
          readonly: true
          description: Repository Name
          type: string
          ui:field: ContextViewer
          ui:options:
            getContextData: {{formContext.repoName}}
        branchName:
          title: Default Branch
          readonly: true
          description: Default Branch
          type: string
          ui:field: ContextViewer
          ui:options:
            getContextData: {{formContext.branch}}
        typeName:
          title: Visibility
          readonly: true
          description: Visibility
          type: string
          ui:field: ContextViewer
          ui:options:
            getContextData: {{formContext.type}}
```

![](./static/internal-developer-portal/reactive-form-context.png)

👉 **Read more about this feature [here](/docs/internal-developer-portal/flows/dynamic-picker#updating-fields-using-form-context).**

---

### [New Feature] Live User Validation using API Requests

**[IDP-4154] | [Docs](/docs/internal-developer-portal/flows/dynamic-picker#live-user-validation-using-api-requests) | [Tutorial](/docs/internal-developer-portal/flows/workflows-tutorials/pull-request-creator)**

---

This release also introduces **live user validation** for input fields in Workflow Dynamic Pickers. This feature enables users to:

- Manually enter input field details for **real-time validation**, instead of selecting from a dynamic picker drop-down.
- Validate and provide **feedback on auto-updated input field** details retrieved from Form Context.

When users input details, an **API call** is triggered in the background, parsing the response and **updating the Form Context** dynamically with validated information. This ensures that input form fields remain up to date while enabling real-time validation.

🚀 **Use Case: [Pull Request Creator Workflow](/docs/internal-developer-portal/flows/workflows-tutorials/pull-request-creator)**

In a Pull Request Creator Workflow, you need the user to **enter the branch name** where changes are implemented. Additionally, a repository picker field dynamically fetches repository details and updates the Form Context as selections are made.

To achieve this, you can add a button that, when clicked:

- Triggers an API call in the background using the user-provided branch details.
- Stores additional data from the API response in the Form Context.
- Sends a POST request to create a pull request.

<img width="500" alt="Image" src="https://github.com/user-attachments/assets/e80eb089-8be0-45d0-ab96-c0f99d2244e9" />

This feature ensures users can validate their inputs dynamically while improving workflow accuracy and efficiency.

👉 **Read more about this feature [here](/docs/internal-developer-portal/flows/dynamic-picker#live-user-validation-using-api-requests).**

---

### Bug Fixes

- Resolved an issue where the **markdown description hyperlink** in Workflows was not rendering correctly. It is now properly displayed. [IDP-4763]
- Fixed the **default behavior** for all missing data points in scorecard checks. [IDP-4732]
- Fixed an issue where the **"All Groups"** field in the Workflow UI was incorrectly displaying the total number of Workflow Groups instead of the total number of Workflows included in these Groups. [IDP-4407]
- Resolved an issue where **Tech Docs URLs** with the same host as where they are deployed were returning a 404 error. This has been fixed. [IDP-4368]
- Fixed an issue where **"View"** permission is now enabled by default for all IDP resources at the **Account** level under the **"Account Viewer"** role. [IDP-4264]
- You can now use the icon for Wiz Scan in your Catalog cards to link to Wiz scan reports. [IDP-4001]
- Updated the regex validation for endpoints configured using the Proxy backend plugin to support TLD endpoints. [IDP-4787]

#### Additional Note

- Renamed **"Request Access"** in the Plugins Marketplace to **"Upvote"** to better reflect its purpose—allowing users to upvote a plugin and help the Harness IDP team prioritize customer requests. [IDP-4503]

---

### New Documentation

#### Reference Docs

We have released new **reference documentation** covering the features introduced in this release. You can find detailed information at the following links:

- [**Updating Fields Using Form Context**](/docs/internal-developer-portal/flows/dynamic-picker#updating-fields-using-form-context)
- [**Live User Validation Using API Requests**](/docs/internal-developer-portal/flows/dynamic-picker#live-user-validation-using-api-requests)

#### Tutorial

This release also includes a comprehensive **tutorial** designed to help you understand and **implement these features** effectively. Check it out here:

- [**Use Dynamic Pickers for a Pull Request Creator Workflow**](/docs/internal-developer-portal/flows/workflows-tutorials/pull-request-creator)

---

## February - Version 0.39.0

<!-- February 04, 2025-->

### [New Feature] Conditional API Requests in Workflow Dynamic Pickers

[IDP-4291]

This release marks a **major milestone** for **Workflow Dynamic Pickers**, and we’re excited to introduce **Conditional API Requests**!

Dynamic Pickers make workflows more interactive by providing real-time options and ensuring validation for workflow creators. However, until now, input fields in **IDP workflows** were **independent** of each other. This lack of dependency made it difficult for users to fully utilize workflows.

🚀 Introducing Conditional API Requests

Workflow Dynamic Pickers now support **conditional API requests** based on user input from prior workflow form fields. This means **one field's values can dynamically depend on another**, enabling:

✔ **Interactive workflows** – Users can dynamically filter results based on prior inputs.
✔ **Customizable API requests** – API URLs in Dynamic Pickers can now include **query parameters** derived from user input.

🚀 Use Case: Repository Picker Workflow

Previously, users could not filter repositories based on different organizations or projects. The repositories were fetched only from a pre-fixed organization and project, limiting flexibility.

With **Conditional API Requests**, users can now specify their GitHub organization and dynamically fetch repositories **without being restricted** to a fixed org.

Here’s how the **UI Picker YAML** looks with Conditional API Requests:

```YAML {13}
parameters:
  properties:
    github_org:
      type: string
      title: Provide GitHub Org
    github_repo:
      type: string
      ui:field: SelectFieldFromApi
      ui:options:
        title: GitHub Repository
        description: Pick one of the GitHub Repositories
        placeholder: "Choose a Repository"
        path: proxy/github-api/orgs/{{ parameters.github_org }}/repos
        valueSelector: full_name
```

![](./static/internal-developer-portal/dynamic-picker-2.png)

This feature makes workflows more flexible, interactive, and user-friendly.

👉 Read more about the feature [here](/docs/internal-developer-portal/flows/dynamic-picker#conditional-api-requests).

### [New Feature] API Key Secret based Pipeline Execution from IDP Workflows

[IDP-4051]

There are now two ways in which **Workflow to Harness Pipeline authentication** works in Harness IDP Workflows. Users can now trigger a Harness Pipeline in an IDP Workflow using a **Harness API Key Secret** instead of a user session token. Previously, authentication relied on the user session token, requiring execution permissions for the pipeline. With this mode:

- A pre-configured **Harness API Key Secret** is used to trigger the Harness Pipeline.
- The user **does not need** direct access to the underlying pipeline(s); however, the **API Key Secret** must have the **execute permissions** for the underlying pipeline(s).
- Platform engineers can generate the necessary API token and configure it within the workflow as default, ensuring **no user** can **access or modify** the pipeline.

This feature enhances security by using dedicated API keys, eliminating the need for user execution permissions.

👉 Read more about the feature [here](/docs/internal-developer-portal/flows/worflowyaml#authentication).

### [New Feature] POST & PUT Method support for Dynamic Pickers

[IDP-4292]

Workflow Dynamic Pickers now supports the **POST method**, extending beyond just GET requests.
This feature is useful for fetching data using **GraphQL APIs**, calling **Lambda functions** with POST requests and handling APIs that require **large inputs via POST**.

Here’s how you can define the POST method:

```YAML
customvalidate:
    title: GitHub Repos Single
    type: string
    description: Pick one of GitHub Repos
    ui:field: ValidateAndFetch
    ui:options:
      path: "catalog/entities/by-refs"
      request:
        method: POST
        headers:
          Content-Type: application/json
        body:
          entityRefs:
            - user:default/autouser1
          fields:
            - kind
            - metadata.name
```

👉 Read more about the feature [here](/docs/internal-developer-portal/flows/dynamic-picker#post-method-support).

#### Upcoming Features

**Update**: These features have been **released as part of Release 0.40.0**. Please refer to the [**release notes**](/release-notes/internal-developer-portal#february---version-0400) for more details.

The following features are currently in progress and are scheduled for release no later than **February 17th**. These features are part of the promised quarterly roadmap and are included in the **new workflow enhancements** introduced in this version.

Here’s what these features do:

- **Fetch additional details and auto-populate form fields based on user selection**: This feature dynamically updates workflow form fields based on user input.
  **For Example**: When a user selects an application, an API request is sent to CMDB to fetch additional details, which are then used to populate the remaining fields automatically.

- **Allow arbitrary values in dynamic pickers**: Users can now manually enter custom text if their desired option is not available in the predefined list.

### Bug Fixes

- Fixed payload creation for template variables and extended support for **pipeline template variables** in `trigger:harness-custom-pipeline` workflow action. [IDP-4492]
- Fixed an issue in **HarnessAutoOrgPicker** where projects with the same ID across different organizations caused conflicts. A dropdown has been added to allow users to **select the appropriate organization** when a project name exists in multiple organizations. [IDP-4168]
- Resolved an issue where negative values could be entered for scorecard weights. Added validation to ensure only **valid, non-negative values** are accepted. [IDP-3721]
- Resolved an issue where text on IDP workflow tiles was breaking across lines due to incorrect styling. This has been fixed to ensure proper text formatting and alignment. [IDP-4193]

## December 2024

### Version 0.38.0

<!-- December 09, 2024 -->

#### New features and enhancements

1. The "My Pull Requests card" on the Developer Homepage now supports **[Harness Code Repository](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization/#2-harness-code-repository)** in addition to GitHub, with no configuration required for Harness Code Repository. [IDP-4184]

![](./static/internal-developer-portal/idp-hcr-card.png)

2. Added a new step in the IDP stage to [update catalog properties](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#9-update-catalog-property), enabling native support for the [Catalog Ingestion API](https://developer.harness.io/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api) within pipelines.[IDP-3603]

![](./static/internal-developer-portal/update-catalog-property.png)

3. Added support for a new [markdown card](/docs/internal-developer-portal/layout-and-appearance/home-page-customization#markdown-card) on IDP Homepage

![](./static/internal-developer-portal/idp-markdown-card.png)

#### Bug fixes

1. Fixed an issue with the `fetch scores by entity` API to ensure consistent results regardless of entity UID casing. [IDP-4310]

2. Fixed an issue where last names with spaces were misclassified as part of the first name when using `<+last_name>` in the Homepage headers. Names are now correctly parsed using a comma as the delimiter. [IDP-4017]

3. Resolved performance and parsing issues when ingesting multiple `harness.io/pipelines` values through the Catalog Ingestion API by increasing column size to 1023. [IDP-3973]

4. Fixed an issue with scorecard checks failing for certain numeric string values in JEXL expressions by ensuring proper handling of numbers and float values. [IDP-3939]

5. Fixed an issue where navigating to Policies via the UI flow `IDP -> Admin -> Project Settings -> Policies` resulted in a "Page Not Found" error. [IDP-3875]

## November 2024

### Version 0.37.0

<!-- November 26, 2024 -->

- **New Videos:** [5 Things You Didn’t Know Were Possible in Harness IDP](https://youtu.be/S8kjTy5GBuQ), [Introducing New Workflows Homepage in Harness IDP](https://youtu.be/dJgf1ZUOs8s), [Catalog Metadata Ingestion API in Harness IDP](https://youtu.be/MB-IWGoYjOo), [How to let any user in your account Execute your Pipeline using Harness RBAC (IDP)](https://youtu.be/ySVEGtQ2uWU)

#### New features and enhancements

- You can now view all your Jira tickets under the [My Tasks card](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization#my-tasks-card) on the Developer Home page, organized by sprints, progress, and other key developer information.

![](./static/internal-developer-portal/idp-jira-task.png)

- Users can now onboard new services anytime using the [Get Started option under the Admin section](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#onboard-services-post-getting-started), even after completing the initial onboarding flow. [IDP-3984]

![](./static/internal-developer-portal/idp-re-onboarding.png)

- Enhanced scorecard functionality by making the harness.io/services annotation optional for Policy Evaluation and STO stages based checks, enabling pipelines to use their last policy check results when defined. [IDP-3992]

- Custom plugins now support arbitrary configurations under `customPlugins`, allowing more flexible plugin setups. [IDP-3911]

```YAML
## Example
customPlugins:
  myPlugin:
    target: abc.com
```

- Enhanced the URL allow list to now validate URLs before storing them for whitelisting. [IDP-3955]

#### Bug fixes

- Fixed issue with Workflows V2 showing older Workflows when performing Layout customizations. [IDP-3969]

- Fixed an issue where the "Add a New Workflow" navigation button did not direct to the correct group when the group had no workflows.[IDP-3968]

- Fixed an issue where score computation was being skipped when no matching entities were found for a specific scorecard. The computation now handles such cases, ensuring consistent processing across all scorecards. [IDP-4256]

- Fixed an issue where values entered using the `HarnessProjectPicker` were not maintaining their state between page navigation in the Workflow Forms. The state is now preserved.[IDP-4023]

- Fixed an issue in the Catalog Ingestion API to handle case insensitivity with entity names, ensuring consistent behavior regardless of the case used in entity definitions. [IDP-4004]

- Fixed an issue where pipelines stayed in a "waiting" status despite successful execution and added support to explicitly mark pipeline executions as Success for both "Success" and "IgnoreFailed" status, ensuring accurate status reporting in workflows. [IDP-3999]

- Fixed an issue that allowed users to save a scorecard without adding all the mandatory fields.[IDP-3970]

### Version 0.36.0

<!-- November 13, 2024 -->

#### New features and enhancements

- You can now view your pull requests under the [My Pull Requests card](/docs/internal-developer-portal/layout-and-appearance/home-page-customization#my-pull-requests-card) on the Developer Homepage. Currently, only GitHub is supported. [IDP-3458]

![](./static/internal-developer-portal/idp-pull-request-github.png)

- We’ve added support for [pipeline templates, stage variables, and step variables](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#support-for-stage-step-variables-and-pipeline-templates) to be used as inputs for workflows with the `trigger:harness-custom-pipeline` action. [IDP-3927]

- The [Plugins Marketplace](https://developer.harness.io/docs/internal-developer-portal/plugins/plugin-marketplace) now offers a single-pane-of-glass view, showing plugins supported under IDP as well as available Backstage Community Plugins, which can be added based on customer requests. [IDP-4010]

![](./static/internal-developer-portal/idp-plugin-marketplace.png)

- Added Audit trails Support for Workflows v2 and Homepage Layout. [IDP-3849, IDP-3848]

- Added support for Harness Code Repository data points under Harness data source for Scorecards. The following data points are added: [IDP-3640]
  - Extract string from a file
  - Does file exist
  - Match string in a file

#### Bug fixes

- Resolved an issue with the Direct Push step on Harness-hosted infrastructure, where secrets data was not populated due to the Git clone step being skipped by default in the IDP stage. [IDP-4000]

- Resolved the issue with removing old layout from IDP. [IDP-3905]

- Resolved an issue with the Kubernetes plugin’s "View Logs" functionality. This feature now correctly requires the `kubernetes.proxy` permission to be set for proxied calls to work as expected. [IDP-3900]

- Resolved an issue with `HarnessAutoOrgPicker` not displaying organizations for some projects. Increased the maximum number of projects from 500 to 1000 to support customer accounts with more than 500 projects. [IDP-4022]

## October 2024

### Version 0.35.0

<!-- October 21, 2024 -->

#### New features and enhancements

- You can now use `mode: Append` in the [Catalog Ingestion API](/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api#5-update-a-single-property-of-a-catalog-entity-without-replacing-existing-values). This feature allows for the ingestion and modification of complex data types in the catalog without overwriting existing values. [IDP-3799]

- You can now [configure runtime inputs](https://developer.harness.io/docs/platform/variables-and-expressions/runtime-input-usage/#configure-execution-inputs) in the [IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage), enabling users to specify inputs during pipeline execution. [IDP-3781]

- New plugins added to the marketplace.
  - [Harness CCM Backstage Plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/harness-ccm). [IDP-3758]

![](./static/internal-developer-portal/harness-ccm-backstage-plugin-screenshot.png)

- You can now add [SimpleIcons](https://developer.harness.io/docs/internal-developer-portal/catalog/add-links-docs#icons) in the Links card on Overview page, the list of supported icons are available in **Admin** -> **Layout** -> **Icons**. [IDP-3763]

#### Bug fixes

- Fixed the issue causing Timeout errors on Workflows execution page, even when the Pipeline execution was successful. [IDP-3580]

- Restored the missing GitHub Scaffolder actions, which is included under Workflows Actions by default along with other [built-in Backstage Scaffolder actions.](https://backstage.io/docs/features/software-templates/builtin-actions/)

- Fixed an issue where Account Level Repo URLs for Harness Code were not functional during the registration of a software component. [IDP-3820]

- Fixed the issue with un-supported content types displayed in [Homepage Layout](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization). [IDP-3783]

- Fixed the issue with usage of `x-api-key` in [IDP APIs](https://developer.harness.io/docs/internal-developer-portal/api-refernces/public-api) headers, the `x-api-token` should be replaced with `x-api-key`. [IDP-3729]

- Fixed an issue where the TechDocs button appeared greyed out in the About Card when the source was Harness Code. This fix restores full functionality to the button, ensuring users can access TechDocs as expected. [IDP-3725]

- Fixed an issue where the IaCM plugin returned a 401 Unauthorized error, even when the user had proper access. [IDP-3653]

### Version 0.34.0

<!-- October 1, 2024 -->

#### New features and enhancements

- We have added the [new Workflows Homepage](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/workflows-page-customization), which helps you to customize the Workflows organization and information associated. This feature is behind the Feature Flag `IDP_ENABLE_WORKFLOWSV2`, contact [harness support](mailto:support@harness.io) to enable it on your account. [IDP-3752]
- We have upgraded to the new backend system of Backstage in Harness IDP. [IDP-3252]
- Enhanced the API Response for Catalog Ingestion API. [IDP-3672]
- New plugins added to the marketplace.
  - [Sysdig Plugin for Backstage](https://github.com/sysdiglabs/backstage-plugin-sysdig)

#### Bug fixes

- Fixed the issue with `mode: append` to support updates to array values, in Catalog Ingestion API. [IDP-3734]
- Fixed the UI issues with Harness Chaos Engineering Plugin. [IDP-3670]
- Fixed the issue with global GitHub OAuth. [IDP-3655]
- Fixed the issue with Catalog APIs with x-api-key in the header.

## September 2024

### Version 0.33.0

<!-- September 17, 2024 -->

#### New features and enhancements

- We have upgraded our Backstage core version to v1.28. [IDP-2870]
- [Catalog Ingestion APIs](https://developer.harness.io/docs/internal-developer-portal/catalog/catalog-ingestion/catalog-ingestion-api) received a huge update with lots of new endpoints and use-cases supported. [IDP-3565]
- Add [mkdocstrings](https://mkdocstrings.github.io/) plugin in TechDocs to generate docs from comments in code blocks. [IDP-3570]
- New plugins added to the marketplace.

  - [Argo-CD Plugin for Backstage](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-argo-cd#argo-cd-plugin-for-backstage)

- We have encountered an issue with usage of `ui:widget: password` which reveals the user token in plain text to the user if the field is not used in the first page of the Workflow definition. We have updated our docs with instructions. Please find more context [here](/kb/internal-developer-portal/articles/secrets-issue) if you see the issue.

#### Bug fixes

- Fixed issue with Jenkins Plugins integration using Delegate. [IDP-3551]
- Fixed `AuthenticationError` issue for templates registered from Harness Code Repo. [IDP-3316]
- Fixed the issue when registering or refreshing IDP workflow would take 10-30 minutes. This now happens instantly.
- Fixed the UI issue when long sidenav in TechDocs sites would cause overlap issues.

## August 2024

### Version 0.32.0

<!-- August 30, 2024 -->

#### New features and enhancements

- You can now create API response based [**Dynamic Workflow Pickers**](https://developer.harness.io/docs/internal-developer-portal/flows/dynamic-picker) for fetching values from a third party APIs and show it to the user. You can use it to provide a pick list of available repositories, projects or integrate with your other data sources. [IDP-3531]
- **IDP Homepage is now customizable!** You can personalize the cards, banners and headers for your homepage. We have also added a new Toolbox card to organize the handy tools that your developers need to see, especially if they are new. Read more about [homepage customization](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/home-page-customization). [IDP-2890]
- Harness Code Integration now supports registering components from Account, Org and Project level repositories. Previously this was limited to only project level repositories. [IDP-3390]
- Harness Code is now available in the Direct Push and Create Repo step under IDP pipeline stage. [IDP-3400]
- New plugins added to the marketplace.
  - [JFrog artifactory Plugin](https://github.com/Vity01/backstage-jfrog-artifactory-libs)
  - [Container Image Registry for JFrog Artifactory Plugin](https://janus-idp.io/plugins/jfrog-artifactory/).

#### Bug fixes

- Fixed issue with Jenkins Plugin not working with delegate proxy. [IDP-3511]
- Updated the Schema Validation for Custom Plugin to support fields like `credentials`, `allowedHeaders` and `pathRewrite` under the Backend Proxy definition. [IDP-3391]
- Fixed issue with fetching data for services, created using Git Sync, in the Harness CI/CD Plugin. [IDP-3566]

### Version 0.31.0

<!-- August 16, 2024 -->

#### New features and enhancements

- You can now see an out of the box [**Adoption Dashboard**](/docs/internal-developer-portal/adoption/how-to-track-adoption) under the platform Dashboards showing a quick insight into the adoption of IDP across different areas. Executive Buyers can now subscribe to this and get a weekly/monthly report.
- New plugins added to the marketplace
  - [Harness Chaos Engineering](/docs/internal-developer-portal/plugins/available-plugins/harness-chaos)
  - [Synk](https://github.com/snyk-tech-services/backstage-plugin-snyk/blob/main/README.md)
  - [New Relic](https://github.com/backstage/community-plugins/blob/main/workspaces/newrelic/plugins/newrelic-dashboard/README.md)
- IDP Pipeline steps now support Harness Code as a git provider. [IDP-3232]
- Secrets stored in customer's infrastructure now also supports GitHub and Google OAuth configurations. [IDP-3364]
- [Harness Projects and Orgs Picker](https://developer.harness.io/docs/internal-developer-portal/flows/custom-extensions/) in Workflows now shows up to a maximum of 750 items in the list. Previously the limit was set to 500. [IDP-3331]
- You can now use periods `.` in the `tags` field of Catalog entities. [IDP-3330]

#### Bug fixes

- Issue with enabling OpsGenie plugin has now been resolved. Please see the [new configuration](/docs/internal-developer-portal/plugins/available-plugins/opsgenie/) of the plugin if you are still facing the issue. [IDP-3334]

## July 2024

### Version 0.30.0

<!-- July 31, 2024 -->

- **New Videos:** [Harness IDP Scorecard Checks using Custom Data Source - Deep Dive ](https://youtu.be/23hlHjhhYsQ)

#### New features and enhancements

- You can now use any custom secret manager to manage secrets in Harness IDP. [IDP-3245]
- Added audit trails support for entity `kind` and `type`. [IDP-3274]
- You can now fetch images from private artifactory hub, for developer portal stages. [IDP-3258]
- In [Bitbucket data source](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources#bitbucket) for [File Exist data point](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources#url-priority-for-branch-name-field-6), we will use the **default branch** for the repository used in source-location, as the default `branchName`. [IDP-3236]
- New Plugins: Add [gRPC playground plugin](https://github.com/zalopay-oss/backstage-grpc-playground) to enhance [gRPC API](https://developer.harness.io/docs/internal-developer-portal/techdocs/add-api-docs/#grpc-docs) view. [IDP-3199]

![](./static/internal-developer-portal/json-format.png)

- You can now ingest [user-group](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) as an entity YAML in Harness IDP.

- Added support to trigger workflows using Harness Pipelines with [git experience](https://developer.harness.io/docs/platform/git-experience/configure-git-experience-for-harness-entities/) in [`trigger:harness-custom-pipeline`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline) custom action. [IDP-3304].

#### Bug Fixes

- Fixed the issue with GitLab rate-limiting, by configuring the catalog refresh processing interval as per account requirements. [IDP-3279]
- Fixed the issue with [pull and run images from private artifactory storage in your pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#pull-images), for developer portal stages. [IDP-3258]
- Fixed the issue regarding the use of templates in IDP Stage. [IDP-3121]
- Fixed the issue with "no git integration added banner" showing even when git integration is in place. [IDP-3157]
- Fixed the issue with max projects fetched by [`HarnessProjectPicker`](/docs/internal-developer-portal/flows/flows-input#3-harnessprojectpicker) UI Picker [IDP-3331].

### Version 0.29.0

<!-- July 18, 2024 -->

In this release we have done few upgrades and bug-fixes which are dependant on [Delegate Version](https://developer.harness.io/release-notes/delegate), hence if you are using Delegates within IDP (for Plugin configurations or Git integrations), **please ensure your delegate version is upgraded to 24.07.83404 or beyond**

#### New features and enhancements

- You can now create a new Catalog Layout for your Custom Entity Types in the IDP Software Catalog. This extends our Catalog model beyond services, websites and libraries to track different types of applications such as micro-frontends, llm models, SDKs and more! [Read more](https://developer.harness.io/docs/category/layout--appearance) on how to do it. [IDP-3045]

![](./static/internal-developer-portal/layout-new-nav.png)

- Added support for JEXL expressions in [catalog-info.yaml](https://developer.harness.io/docs/internal-developer-portal/catalog/yaml-file#support-for-harness-account-variables) and [template.yaml](https://developer.harness.io/docs/internal-developer-portal/flows/service-onboarding-pipelines#support-for-harness-account-variables) (any YAML ingested in IDP). [IDP-2843]

- Added support for [graphviz](https://graphviz.org/) and [plantUML](https://plantuml.com/) in TechDocs. [IDP-3072]

- Custom Plugins

  - You can now add Headers (e.g. Authentication header) when defining your custom plugin’s config. [Docs](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/add-a-custom-plugin/#configurations)[IDP-3060]
  - Improved Error Handling, with detailed error messages at each step.

- UI Framework enhancements with integration of UI Core. [IDP-3055]

- New Plugins
  - [BugSnag](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/bug-snag) - View and monitor Bugsnag errors. [IDP-3009]
  - [Harness IaCM plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/harness-iacm) - This plugin provides an overview of all the resources provisioned through information on active workspaces in your account. [IDP-3191]

#### Bug Fixes

- TechDocs builds were facing issues with Bitbucket and GitHub App authentication when delegate was used in the connector. This is resolved now, ensure to upgrade the delegate version to 24.07.83404 or beyond for the fix. [IDP-3120]
- UI fix to show the correct count of the selected services in Getting Started. [IDP-3112]
- UI Bug fix showing a group is selected under IDP Admin Access Control while no group was actually selected. [IDP-3081]
- Custom plugins - Fixed wrong status showing for custom plugin’s builds. [IDP-3059]
- Deleting a disabled custom plugin now updates metadata properly. [IDP-3058]
- Added more retries to avoid Connection Timeout errors in IDP Workflow Execution. [IDP-2997]
- Removed banner showing no Git Integration setup while Harness Code was enabled. [IDP-3182]
- Harness CI/CD plugin was fixed to support both old and new Harness URLs along with vanity URLs. [IDP-3156]

## June 2024

### Version 0.28.0

<!-- June 18, 2024 -->

Happy Juneteenth and welcome to the June release of IDP. In this release we have added adoption and scalability features like improvements to the Developer Portal Pipeline stage to enhance the self service onboarding.

- **New Docs and Tutorials:** [How to create Jira Projects and Jira Tickets using IDP](https://developer.harness.io/docs/internal-developer-portal/tutorials/how-to-use-catalog-ingestion-api/), [How to write catalog-info.yaml](https://developer.harness.io/docs/internal-developer-portal/catalog/how-to-create-idp-yaml).

#### New features and enhancements

- Enhanced error handling for Custom Plugin. You can now see the latest build status along with the enablement status of your custom plugin.[IDP-2069]

- Added three new steps in Developer Portal stage for Harness onboarding of new application. [IDP-2783]
  1. Create Organization: Creates a Harness Org for the account you have provided Harness API key.
  2. Create Project: Creates a Harness Project in the org provided.
  3. Create Resource: Takes [Terraform Provider Resource Definition](https://developer.harness.io/docs/platform/automation/terraform/harness-terraform-provider-overview/) as input to create Harness Entities like Pipelines, Connectors etc.

![](./static/internal-developer-portal/idp-harness-entities.png)

- Added support to show delegate related errors in Scorecards. For example any GitHub related checks if failed due to an issue in GitHub connector setup using delegate then it will show the same error on scorecard evaluation. [IDP-2940]

- We have upgraded the Harness CI/CD plugin to the latest version which includes support for new nav URL in annotations. [IDP-2936]

- Created a new Catalog Info YAML check for Scorecards which can check if an annotation exists or not. [IDP-2609]

![](./static/internal-developer-portal/idp-checks-annotation-exist.png)

- Added support for view source and TechDocs for Harness Code Integration. [IDP-3030]

- We now have a GET API to fetch all the Custom Catalog Properties. [IDP-2711]

#### Bug Fixes

- Fixed issue with `/` escape character handling in the API body of [Catalog Metadata Ingestion API](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-catalog-properties#catalog-metadata-ingestion-api). [IDP-3000]

- Fixed issue with IDP license utilization reporting. [IDP-2956]

- Fixed the issue with deleted plugins being available on the metadata YAML even after the deletion flow is completed.[IDP-2946]

- Fixed the issue with `trigger:trigger-pipeline-with-webhook` custom action to trigger pipeline even with using already existing webhook instead of creating a new webhook every time. [IDP-2609]

- Fixed the issue with TechDocs remote URL reference. [IDP-3072]

## May 2024

### Version 0.27.0

<!-- May 23, 2024 -->

#### New features and enhancements

- Added the support to JSON stringfy the input values for the custom action [`trigger:trigger-pipeline-with-webhook`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#2-triggertrigger-pipeline-with-webhook) , if the type is object [IDP-2858]

- orgIdentifier is now an optional field in the Create Project Step [IDP-2857]

- Added support for [Harness Code Repository](https://www.harness.io/products/code-repository) as a [git integration](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#connector-setup) [IDP-2724]

- We now support private registry configuration for IDP stage. [IDP-2773]

- Added error handling support for Custom Plugins, users can now view the errors in case of issues with the uploaded packages. [IDP-2527]

- Optimized the user and group entity provider to scale-up the user onboarding. [IDP-2814]

- [Catalog Metadata Ingestion API](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-catalog-properties/#request-body) enhancement: `Properties` are mandatory now, At least one `filter` item should be present in the API body. [IDP-2712]

- Added audit support for scorecard re-run event. [IDP-2150]

- We now have a help panel support in the Onboarding Flow to help users with required information on each page.[IDP-2602]

- Added [Delta Mutation](https://backstage.io/docs/features/software-catalog/external-integrations/#provider-mutations) support for Usergroup sync from Harness Platform to IDP, this improves the performance during onboarding at scale. [IDP-2824]

#### Bug Fixes

- Fixed the issue with new nav URL as annotation for Harness CI/CD plugin. [IDP-2721]
- Fixed the issue with selecting both custom and default checks while creating a scorecard.
- Fixed issue with IDPTelemetryPublisher::recordTelemetry to retry on failure as last sent is updated before attempting to send the license data. [IDP-2654]
- Fixed handling custom plugin config if marketplace config are available by default in IDP. [IDP-2800]

### Version 0.26.0

<!-- May 7, 2024 -->

#### New features and enhancements

- We now have an updated [onboarding flow](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#getting-started) for new users, to onboard your already existing harness services as well as new services into IDP as part of the getting started with the module. This new onboarding flow is async wherein users could skip it and add a [git-integration](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#connector-setup) later under admin section [IDP-2213]

- We have updated the custom action [`trigger:trigger-pipeline-with-webhook`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#2-triggertrigger-pipeline-with-webhook) to trigger workflows based on pipeline [`inputset`](https://developer.harness.io/docs/platform/pipelines/input-sets/#create-input-sets) id. [IDP-2611]

- Added support for [Splunk OnCall Backstage Plugin](https://github.com/backstage/community-plugins/tree/main/workspaces/splunk/plugins/splunk-on-call#splunk-on-call) and [Architecture Decision Records (ADR) Backstage Plugin](https://github.com/backstage/community-plugins/tree/main/workspaces/adr/plugins/adr#architecture-decision-records-adr-plugin). [IDP-2470] [IDP-2594]

- As part of our new infrastructure evolution initiative, we have refactored our present infrastructure to extend support for our customers in EU region.

## April 2024

### Version 0.25.0

<!-- Apr 10, 2024 -->

Welcome to first release of April, and in this release we bring you features like **Catalog Metadata Ingestion APIs**, say goodbye to manual data entry woes. With our new API, effortlessly ingest metadata in scale into the IDP catalog.

- **Blogs:** [Introducing new Catalog Ingestion APIs to make Harness IDP truly yours](https://www.harness.io/blog/introducing-new-catalog-ingestion-apis-to-make-harness-idp-truly-yours)

- **New Docs:** [Get started with IDP](https://developer.harness.io/docs/internal-developer-portal/get-started/), [Harness IDP Overview](/docs/internal-developer-portal/overview), [Catalog Metadata Ingestion API](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-catalog-properties), [Usage of Catalog Metadata Ingestion APIs](https://developer.harness.io/docs/internal-developer-portal/catalog/ccp-for-workflows), [Custom Dashboards](https://developer.harness.io/docs/internal-developer-portal/dashboard/custom-dashboards)

- **New Videos:** Our team presented a talk on "[Architecting Multi-tenant Backstage Instances in a Shared Kubernetes Cluster](https://youtu.be/TPHsBduIvm0?si=wWp9b5kXXNKDGrX0)" at the recently held [Backstagecon Europe](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/backstagecon/).

#### New features and enhancements

- We now support a new [git integration](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#connector-setup) framework, which will allow users to have multiple connectors, with different host name, for a single git provider at once. For eg., Users can now use connectors for both `github.com` and `github enterprise` to fetch entity yaml from both the sources at the same time. [IDP-2213]

- We have added support for a new Workflow UI Picker, [`EntityFieldPicker`](/docs/internal-developer-portal/flows/flows-input#1-entityfieldpicker) using which users can use the data present in catalog as an input for the workflows. [IDP-2441]

- We have added a new plugin, to support [GitHub Codespaces](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/github-codespaces) integration in the software catalog.[IDP-2469]

- Added support for [MkDocs plugins and extensions](https://backstage.io/docs/features/techdocs/faqs/#what-is-the-mkdocs-techdocs-core-plugin) in the TechDocs. Here's the list of plugins added.[IDP-2540]

  - [mkdocs-glightbox](https://github.com/blueswen/mkdocs-glightbox)
  - [mkdocs-git-authors-plugin](https://github.com/timvink/mkdocs-git-authors-plugin)
  - [mkdocs-git-revision-date-localized-plugin](https://github.com/timvink/mkdocs-git-revision-date-localized-plugin)
  - [mkdocs-video](https://pypi.org/project/mkdocs-video/)
  - [mkdocs-material-extensions](https://pypi.org/project/mkdocs-material-extensions/)
  - [mkdocs-redirects](https://github.com/mkdocs/mkdocs-redirects)
  - [mkdocs-awesome-pages-plugin](https://pypi.org/project/mkdocs-awesome-pages-plugin/2.6.1/)
  - [mkdocs-minify-plugin](https://pypi.org/project/mkdocs-minify-plugin/0.7.1/)

- We have enhanced the [`harness:delete-secret`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#4-harnessdelete-secret) custom action to support deletion of secrets added as runtime inputs. [IDP-2492]

- We now have Audit trails support for all the git integrations. [IDP-2419]

- [Custom Dashboards](https://developer.harness.io/docs/internal-developer-portal/dashboard/custom-dashboards) are now available to use in IDP. We have support for few OOTB dashboards as well. [IDP-1456]

#### Bug Fixes

- Fixed issues, with empty string & null entries for user groups, in access control. [IDP-2509]
- Fixed issues with Entities marked as secret to be visible to owners only. [IDP-2182]

## March 2024

### Version 0.24.0

<!-- Mar 22, 2024 -->

#### New features and enhancements

- We have improved the permission framework, wherein the support user won't be able to view the docs. [IDP-2477]

- User can now provide the repository url to verify for repository read permission with the given host and credentials before saving the git integration, while creating the connectors. [IDP-2213]

- We have added support for [sub-groups](https://docs.gitlab.com/ee/user/group/subgroups/) in the GitLab Datasources. [IDP-2510]

- We now have support for custom properties, to push append or update arbitrary metadata associated with Catalog entities (services, libraries, websites, etc.) and will help users to automate the process of `catalog-info.yaml` creation, we provide an API that users can call from their pipeline or even manually to add or modify properties in the metadata field for any catalog entity(s). [IDP-2228]

#### Bug Fixes

- Fixed the issue for broken API Plugin, now all plugin data would be loading seamlessly for users once configured. [IDP-2461]
- Fixed the issue with plugin icon on plugins page. [IDP-2431]
- Fixed the issue with URL allow list, now host name field is marked mandatory to add the URL. [IDP-2414]

### Version 0.23.0

<!-- Mar 11, 2024 -->

Continuing with the increased adoption of self-service flows, this release we're happy to introduce an intuitive minimalistic UI for the workflows page along with support for output variables on workflows page, to streamline user experiences seamlessly.

- **Blogs:** [Why Harness IDP, powered by Backstage, is Your Gateway to Effortless Developer Portal Excellence](https://www.harness.io/blog/why-harness-idp-powered-by-backstage-is-your-gateway-to-effortless-developer-portal-excellence)

- **New Docs:** [Custom Card Plugin](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-card), [Catalog Entity YAML Examples](https://developer.harness.io/docs/internal-developer-portal/catalog/yaml-file)

- **New Videos:** [Custom Card Plugin](https://youtu.be/Qi1PIWSPves), [Workflow Upgrades](https://youtu.be/aethqdKmZOo)

#### New features and enhancements

- Now we have a [new UI](https://youtu.be/aethqdKmZOo) for the Workflows page, as part of the Backstage Upgrades. [IDP-2355]

![](./static/internal-developer-portal/new-template.png)

- We have added a new custom processor to convert the email-id used under `owner` field in `catalog-info.yaml` to an `user` incase the username is part of the email-id. [IDP-2369]

- We have added a new [Custom Card Plugin](https://developer.harness.io/docs/internal-developer-portal/catalog/custom-card) to help users display the information, stored under the root fields of `catalog-info.yaml`, on a card in the overview tab. [IDP-2352]

- We have added a new [Evaluate expression](https://developer.harness.io/docs/internal-developer-portal/scorecards/checks-datasources#catalog) datapoint under the Catalog datasource to match input values for all the root fields `apiVersion`, `kind`, `metadata`, and `spec` only and the supported values under the root field. [IDP-2111]

- Now you can configure the output of `trigger:harness-custom-pipeline` to display the pipeline [output variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#input-and-output-variables), by setting the `showOutputVariables: true` under `inputs`and adding `output` as shown in the example below: [IDP-2328]

```YAML
...
output:
  text:
    - title: Output Variable
      content: |
        Output Variable **test2** is `${{ steps.trigger.output.test2 }}`
    - title: Another Output Variable
      content: |
        Output Variable **test1** with fqnPath is `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}`
...
```

There are two ways in which you can add the output variable to the template syntax.

1. You can directly mention the output variable name `${{ steps.trigger.output.test2 }}`, here `test2` is the output variable name we created in the pipeline.

2. You can copy the JEXL expression of the output variable and remove the JEXL constructs, `${{ steps.trigger.output['pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1'] }}`, here the part `pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test1` comes from `<+pipeline.stages.testci.spec.execution.steps.Run_1.output.outputVariables.test2>` copied from execution logs.

![](./static/internal-developer-portal/output-variables.png)

#### Bug Fixes

- Fixed the issue with missing labelSelector annotation resulting in scorecards checks failure message not getting displayed for some k8s related checks. [IDP-2270]

## February 2024

### Version 0.22.0

<!-- Feb 22, 2024 -->

Given the interest of our users to know more about our IDP and what's coming up next, we have released a detailed [roadmap](https://developer.harness.io/roadmap/#idp) for IDP. Also we would further like to hear the feedback of users on our [ideas platform](https://ideas.harness.io/) regarding how they envision their developer portal to be and what improvements they would like to see in our IDP especially the suggestions for Plugins and support for new integrations.

- **New Docs:** [Use Harness IDP for self serviced Harness CI/CD onboarding](https://developer.harness.io/docs/internal-developer-portal/flows/self-service-onboarding-pipeline-tutorial), [How to build Frontend Backstage Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/build-a-frontend-plugin), [Custom Dashboards](https://developer.harness.io/docs/internal-developer-portal/get-started/custom-dashboards)

- **New Videos:** [Create a New Python Lambda app using Harness IDP in 5 minutes](https://youtu.be/JMjbqAilJHU)

#### New features and enhancements

- We have added support for displaying warning message on connector page, when a connector or secret is deleted. [IDP-2018]
- You can now optionally remove the pipeline url used to orchestrate the workflow, from the workflow execution logs displayed as output while using the custom action [trigger:harness-custom-pipeline](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#1-triggerharness-custom-pipeline). For this you need to use the boolean property `hidePipelineURLLog` and set the value as `true`. [IDP-2183]

```YAML
## Example
steps:
- id: trigger
    name: Creating your react app
    action: trigger:harness-custom-pipeline
    input:
    url: "Pipeline URL"
    hidePipelineURLLog: true
    inputset:
        project_name: ${{ parameters.project_name }}
    apikey: ${{ parameters.token }}
```

- The Custom field extension **`HarnessAutoOrgPicker`**, which auto populates org id on project selection, would now pick project field value from the key that is mentioned under `projectPickerRef` as dependencies, if it's name is other than `projectId`. When properties have the project key and are named as `projectId` in that case you don't need to add the dependencies. [IDP-2243]

```YAML
## Example where projectId is mentioned under project_name
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: your-workflow
  ...
spec:
  ...
  parameters:
    - title: Details
       properties:
         project_name:
           title: Project Identifier
           description: Harness Project Identifier
           type: string
           ui:field: HarnessProjectPicker
         orgId:
           title: Org Identifier
           description: Harness org Identifier
           type: string
           ui:field: HarnessAutoOrgPicker
           dependencies:
            projectPickerRef:
              - 'project_name'
```

### Version 0.21.0

<!-- Feb 8, 2024 -->

We are seeing a lot of excitement among our customers around Self Service Workflows to derive value for their developers. This release is especially for you if you are using IDP workflows for user/service onboarding.

- **New Docs:** [API Docs](https://apidocs.harness.io/tag/IP-Allowlist), [How to write IDP templates](https://developer.harness.io/docs/internal-developer-portal/flows/service-onboarding-pipelines#how-to-write-idp-templates), [List of on-hold Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/on-hold-plugins)
- **New Videos:** [Ignoring Developer Experience is Hurting Your Organization: DX is Critical](https://youtu.be/ka6kHPMGGpc?si=MCcVZdvP2bGCCI3h)

#### New features and enhancements

- The project picker in IDP workflows [`HarnessProjectPicker`](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#harness-specific-custom-extensions) now shows the org as well. There is no change in the input/output values. [IDP-2048]

![](./static/internal-developer-portal/idp-projpicker-newview.png)

- Added support for a new Custom field extension **`HarnessAutoOrgPicker`**, which auto populates on project selection. So now when you select an project id as an input the org id gets selected automatically if required as an input. [IDP-2099]

```YAML
# Example template.yaml file
apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: your-workflow
  ...
spec:
  ...
  parameters:
    - title: Details
       properties:
         projectId:
           title: Project Identifier
           description: Harness Project Identifier
           type: string
           ui:field: HarnessProjectPicker
         orgId:
           title: Org Identifier
           description: Harness org Identifier
           type: string
           ui:field: HarnessAutoOrgPicker
```

In the above example the the `Project Identifier` field once selected auto populates the `Org Identifier` field as shown below.

![](./static/internal-developer-portal/idp-proj-picker.png)

- Two new plugins [Azure Devops](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/azure-devops) [IDP-2078] and [Rootly](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/rootly) [IDP-1693] are available to use now!
- Users can now add email as an input for Slack Notify step in the IDP Stage. When used with `<+pipeline.triggeredBy.email>`, your service onboarding pipeline can now notify the user! [IDP-1943].
- All IDP APIs are now available on our public API docs.[IDP-2113]

#### Bug Fixes

- Added support for word-wrap to ensure words are not broken on screen. [IDP-1972]
- Fixed the string input value to ignore leading slash for file path input value in scorecard checks[IDP-2084].
- Enhanced error handling for steps under developer portal stage. You should now see more meaningful errors [IDP-2105, IDP-2098, IDP-2087, IDP-2086, IDP-1943].

## January 2024

### Version 0.20.0

<!-- Jan 25, 2024 -->

🐣 "Easter Came Early This Year! 🚀 In our latest update, we're egg-cited to unveil the delightful additions of **custom plugins** – features you've eagerly anticipated. Here are some of the Docs and Tutorials to help you get started.

- **Docs:** [Custom Plugins](https://developer.harness.io/docs/category/custom-plugins), [Roadmap](https://developer.harness.io/docs/internal-developer-portal/roadmap/), [Harness IDP vs Self Managed Backstage - In-depth Feature Comparison](https://developer.harness.io/docs/internal-developer-portal/roadmap/harness-vs-backstage)

- **Video Tutorial:** [How to Add Custom Plugins In Harness IDP](https://youtu.be/6ab9xQY7kSE)

#### Early access features

- We have added support for [custom plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/custom-plugins/overview), which enables users to upload their own frontend backstage plugins to Harness IDP. This feature is behind the feature flag `IDP_ENABLE_CUSTOM_PLUGINS`. To enable the feature, please reach out to IDP team or contact [Harness Support](mailto:support@harness.io). [IDP-771]

![](./static/internal-developer-portal/layout.png)
![](./static/internal-developer-portal/custom-plugin-view.png)

- Added the support to push code to the existing main branch of git providers in the [Create Repo step](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#3-create-repo) under [Developer Portal Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage). To enable the feature, please reach out to IDP team contact [Harness Support](mailto:support@harness.io). [IDP-1944]

#### New features and enhancements

- Added support for Workflow Executions in Audit trails. [IDP-1989]
- Added support for CSV Downloads in Scorecards and Checks overview pages. [IDP-1932]

![](./static/internal-developer-portal/export-csv-checks.png)

#### Bug Fixes

- Fixed deletion of env variable while adding the new env variable during config updates. [IDP-2031]
- Fixed the incorrect redirect from the getting started page, this now won't allow users to get into IDP overview page without completion of the onboarding steps. [IDP-1993]
- Fixed the Scaffolder Backend Caching issue, this now would allow users to execute workflow templates with all default values without any authentication failure. [IDP-2001]

### Version 0.19.0

<!-- Jan 19, 2024 -->

🎁 In our latest release, we've added improvements to scorecards✨ and the clarity of audit trails 📊 – features you've been eagerly waiting for.

- **Docs:** [Governance](https://developer.harness.io/docs/category/governance), [Rafay Plugins](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/rafay-kubernetes)
- **Tutorial:** [Create a service onboarding pipeline (using IDP Stage)](/docs/internal-developer-portal/tutorials/service-onboarding-with-idp-stage)

#### New features and enhancements

- Added support for [Audit Trails](https://developer.harness.io/docs/internal-developer-portal/governance/audit-trails). [IDP-1280]
- Added support for a new plugin [Rafay Kubernetes Operations Platform](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/rafay-kubernetes). [IDP-1979]
- Added support for connector types in Git based steps under IDP stage, which will allow users to toggle between public and private repositories. [IDP-1982]
- Added support for entities `annotation` and `harnessData` from `catalog-info.yaml` to be added as variable(JEXL format) input in Scorecard Checks. eg., `<+metadata.harnessData.branch>` will fetch the value for the branch in the following YAML as `catalog-info.yaml`. [IDP-1964]

```YAML
...
metadata:
  name: idp-module
  harnessData:
    branch: develop
    path: idp
    priority: P0,P1
  annotations:
    jira/project-key: IDP
...
```

#### Bug Fixes

- Fixed the issue with side Nav items display, when user switches from old to new Nav using "New Navigation Design (Beta)" toggle. [IDP-1964]
- Fixed the issue with scaffolder task missing "created by" with adding a migration that will correct the data eventually. [IDP-1961]
- Fixed the issue with Backstage Permissions Sync Job Bug. [IDP-1980]

### Version 0.18.0

<!-- Jan 11, 2024 -->

🎉 Happy New Year to all our fantastic users! 🎉
Since it's the first release of the year, we've wrapped up some interesting features for you, including a new Devtools Plugin and revamped access control permissions.

- **Docs:** [Configuring Layout of IDP Catalog pages](https://developer.harness.io/docs/internal-developer-portal/layout-and-appearance/catalog) [Role-based access control (RBAC)](https://developer.harness.io/docs/internal-developer-portal/rbac/resources-roles)

- **Videos:** [How to set the Owner of a Software Component](https://youtu.be/pQvqWBrXIhk?si=LqkJBDo63we929L4)

#### New features and enhancements

- Added Support for New [Devtools Plugin](https://github.com/backstage/backstage/blob/master/plugins/devtools/README.md)

![](./static/internal-developer-portal/devtools.png)

- Added support for [new custom action](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions#2-triggertrigger-pipeline-with-webhook), that can execute pipeline with custom webhook based triggers.

- Access Control is revamped with new roles (IDP Admin and IDP Platform Engineering) and permissions.

![](./static/internal-developer-portal/idp-roles.png)

- Added support for persistent platform favorites, which allows users to star their most visited pages and also it gives information on the recently visited pages.

- Enhanced the custom project picker to increase the hard limit of 50.

- Added support for regex in file name input in Scorecards.

![](./static/internal-developer-portal/checks-idp.png)

- We now have a new intuitive Plugins Page.

![](./static/internal-developer-portal/new-plugin-page.png)

## December 2023

### Version 0.17.0

<!-- Dec 21, 2023 -->

Jingle bells, jingle bells, jingle all the way to Harness IDP's End-of-Year Release! 🛷 As we close the chapter on a year of incredible milestones, we want to express our heartfelt thanks to our amazing customers and prospects. Your support, feedback, and enthusiasm have been the North Star 🌟 guiding us in enhancing and evolving Harness IDP. The debut of our new module and the strides we've made together are testaments to your invaluable collaboration and spirit.

In this release, we're excited to unveil features like the HTTP actions support in the scaffolder-backend 🌐, the innovative Developer Portal stage for seamless self-service flows 🚀, and the integration of OPA/Governance policies to ensure streamlined and secure management 🛡️. Plus, we've squashed some pesky bugs 🐛 to make your experience smoother than ever!

- **Docs:** [Supported Custom Actions](https://developer.harness.io/docs/internal-developer-portal/flows/custom-actions), [Supported OPA Policies in IDP](/docs/internal-developer-portal/scorecards/opa-implementation), [New IDP Stage](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage)

- **Tutorial:** [Harness Policy As Code for Services using Scorecards](/docs/internal-developer-portal/scorecards/opa-implementation)

#### Early access features

- Added a [new stage](/docs/internal-developer-portal/flows/harness-pipeline), specifically for IDP, knows as Developer Portal to help with the self service flows (presently this feature is behind a Feature Flag) [IDP-1425]

![](./static/internal-developer-portal/idp-stage.png)

- Added a [Cookiecutter step](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#2-cookiecutter) to enable use of cookiecutter based templates in the IDP stage.[IDP-1437]
- Added a [step](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#6-register-catalog) to register software components in IDP catalog.[IDP-1438]
- Added a [step](https://developer.harness.io/docs/internal-developer-portal/flows/idp-stage#3-create-repo) to create a repository in your git provider and push contents along with catalog-info.yaml. [IDP-1436]

#### New features and enhancements

- Added support for [http actions](https://roadie.io/backstage/plugins/scaffolder-http-requests/) in the scaffolder-backend. [IDP-1853].
- Added [OPA/Governance policies](/docs/internal-developer-portal/scorecards/opa-implementation) for Backstage entities. [IDP-1514]

#### Bug Fixes

- Fixed support for special character “-”(hyphen) in the URLs.[IDP-1804]
- Fixed URL replace in JIRA Plugin to fetch host details.[IDP-1863]
- Fixed display of Secret deleted error message added on OAuth Page. [IDP-1811]

### Version 0.16.0

<!-- Dec 8, 2023 -->

🌟 "Ho, ho, ho! Santa's elves aren't the only ones delivering gifts this season! 🎅 In our latest release, we're decking the IDP with some shiny new home page and jolly additions to our scorecards.

- **Blogs:** [Harness SRM Plugin - Release Announcement](https://www.harness.io/blog/announcing-the-harness-srm-backstage-plugin)
- **Docs:** [Key Concepts](https://developer.harness.io/docs/internal-developer-portal/key-concepts)
- **Tutorial:** [How to track migrations using Scorecards](/docs/internal-developer-portal/tutorials/how-to-track-migrations)

#### New features and enhancements

- New Plugin support added for [Dynatrace Plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/dynatrace) [IDP-1759]
- New intuitive Homepage with added [Home Plugin](https://backstage.spotify.com/marketplace/spotify/plugin/home/) support [IDP-1694].

![](./static/internal-developer-portal/homepage-idp.png)

- New Parser for file contents of git providers(GitLab and Bitbucket) to support new data points in git-providers datasource. [IDP-1691]
- New data points added to extract, filter and match file contents in git providers data sources.[IDP-1682]

#### Fixed Issues

- Fixed data non-availability in Bar charts for single-component scorecards.[IDP-1698]

## November 2023

### Version 0.15.0

<!-- Nov 23, 2023 -->

Since last release, we have released some interesting docs and video tutorials to help you get started with Harness IDP:

- **Video Tutorial:** [How to use self-service-onboarding](https://youtu.be/0GoK3SD1rxs?si=1Z28hvZ9nihYtdmL), [How to register your software components in Software Catalog](https://youtu.be/YgtIMDGMzJE?si=wiFzozj8Zo9dEEOF)
- **Tutorial:** [How to add API docs in Harness IDP](https://developer.harness.io/docs/internal-developer-portal/get-started/add-api-docs)
- **Docs:** [Software System Model](/docs/internal-developer-portal/catalog/data-model), [API Spec Reference](https://developer.harness.io/docs/category/api-references)

#### New features and enhancements

- We have added a new overview page for [Scorecards](https://developer.harness.io/docs/internal-developer-portal/features/scorecard#scorecard-overview-page) and [Individual checks](https://developer.harness.io/docs/internal-developer-portal/features/checks-datasources#checks-overview) in the scorecards.[IDP-1480] [IDP-1481]

![](./static/internal-developer-portal/check-component-overview.png)
![](./static/internal-developer-portal/component-overview.png)

- The new overview pages for Scorecards and Checks have API support added to it.[IDP-1482]
- Added support for two new Plugins [OpsGenie](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/opsgenie) and [Datadog](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/datadog) Plugin.[IDP-1662] [IDP-1351]
- We have released a new [Harness Service Reliability Backstage Plugin](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/harness-srm), that tracks the SLOs and Error Budgets for monitored services in Harness SRM module

#### Fixed Issues

- Improved error scenario Handling in HarnessProcessor, with removal of irrelevant raw error metadata. [IDP-1663]
- Resolved the error related to creation of a new check having the same name as a deleted check. [IDP-1450]

### Version 0.14.0

<!-- Nov 7, 2023 -->

[Backstagecon](https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/co-located-events/backstagecon/) & Kubecon is round the corner, consider catching up with Harness' team in the event at **Booth B15**. Also here's a [sneak peak](https://www.harness.io/blog/road-to-backstagecon-2023-a-sneak-peek-into-an-exciting-lineup-a-recap-of-2022) of what's happening in this year's edition of the event. Here's some of the content updates:

- **Himanshu's(Product Manager for IDP) Backstagecon Talk:** [What Does Backstage Really Offer?](https://www.youtube.com/watch?v=4FTkeJY2Hcc)
- **Docs:** [Updated Onboarding Guide](/docs/internal-developer-portal/get-started/setup-git-integration/), [Public API](/docs/internal-developer-portal/api-refernces/public-api)
- **Tutorial:** [How to add Links in Software Components](/docs/internal-developer-portal/catalog/software-catalog)

#### New features and enhancements

- We've introduced more explicit error messages when removing secrets to ensure users are fully aware and cautious of this action. [IDP-1520]
- Backstage, powering the IDP platform has been upgraded to v1.17, take a look at the [release notes](https://backstage.io/docs/releases/v1.17.0) to find out the updates in this version.[IDP-1179]

#### Fixed Issues

- Fixed text overflows on the “Create Scorecards” page. [IDP-1417]
- Fixed page navigation for IDP get-started page by adding the exit icon. [IDP-1524]

## October 2023

### Version 0.13.0

<!-- Oct 26, 2023 -->

Post-Limited GA, we've taken your genius tips and mixed them into the Internal Developer Portal. Also, we've fixed a few bugs along the way. Dive in and see what's new! But before that here are some links of recently released tutorials and docs to help you get started with IDP.

- **Blogs:** [Got Monorepos Instead of Microservices? This is How Harness IDP Has Got You Covered](https://www.harness.io/blog/mono-repos-harness-idp)
- **Video Tutorial:** [Scorecards](https://youtu.be/jvLDdWS3rFE?si=EBoE9TXh4HCVNU3i)
- **Tutorial:** [How to register Software Components in Catalog](/docs/internal-developer-portal/get-started/catalog-2o)
- **Docs:** [Scorecards](https://developer.harness.io/docs/internal-developer-portal/features/scorecard) and [Data Sources](https://developer.harness.io/docs/internal-developer-portal/features/checks-datasources)

#### New features and enhancements

- Scorecards now support additional data points for GitHub data source, to support advanced GitHub Security features and GitHub Actions [IDP-1408]

  - Advanced GitHub Security
    - Open Dependabot Pull Requests
    - Code Scanning
    - Security Scanning

  ![](./static/internal-developer-portal/idp-scorecards.png)

  - GitHub Actions
    - Workflow Count
    - Successful Workflows
    - Time to complete Workflows
  - Other
    - Number of open pull requests by author

- Improved Error message for DSL response to handle multiple input values [IDP-1410]

#### Fixed Issues

- Fixed connector selection issue in the onboarding wizard. [IDP-1363]
- Fixed the Operator for Jira Default Expression as `jira.issuesCount > 5` in Jira Plugin.[IDP-1357]
- Fixed Datapoint identifier mismatch[IDP-1152]

### Version 0.12.0

<!-- Oct 16, 2023 -->

IDP has now graduated from Beta. During [Unscripted](https://www.unscriptedconf.io/) in September, we made a series of announcements. Here are some quick links for your recap.

- [Launch Demo in Keynote](https://youtu.be/6OuK_sl3mLE?feature=shared&t=2065) by Jyoti Bansal and Eric Minick.
- [Platform Engineering Demo](https://youtu.be/c04F98kS96U?feature=shared&t=534) by Alex Valentine.
- [Announcement Blog Post](https://www.harness.io/blog/internal-developer-portal-public-preview) by Himanshu Mishra.

#### New features and enhancements

- Scorecards are now launched for everyone. It contains several data sources and data points within the framework. There are default checks for you to use. You can create custom checks as well. [Read more](https://developer.harness.io/docs/internal-developer-portal/features/scorecard), Watch this [video tutorial](https://youtu.be/jvLDdWS3rFE?feature=shared) to know more.
- Backstage is now upgraded to [v1.16](https://backstage.io/docs/releases/v1.16.0).
- [EntityRelationWarning](https://backstage.io/docs/reference/plugin-catalog.entityrelationwarning) is now available to be used in Layout. You can add this in your layout so that a warning alert is displayed if the entity has relations to other entities, which don't exist in the catalog. See **example**. [IDP-993]

```yaml
contents:
  - component: EntityRelationWarning
```

- New Plugins support available in IDP
  - Grafana - Associate alerts and dashboards to components. Read more [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/grafana) [IDP-915]
  - SonarQube - Components to display code quality metrics from SonarCloud and SonarQube. Read more [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/sonarqube) [IDP-1249]
- Every plugin page now has a plugin docs available. [IDP-923]

#### Fixed Issues

- Improved Error message when pipeline is configured wrong in IDP Software Templates. [IDP-1230]

## September 2023

### Version 0.8.0

<!-- Sept 25, 2023 -->

#### New features and enhancements

- IDP now includes the [GitHub Catalog Discovery](/docs/internal-developer-portal/plugins/available-plugins/github-catalog-discovery) plugin. You can use this to automatically discover `catalog-info.yaml` files from your GitHub organizations and repositories. [IDP-887]

- The following UI pickers are now available for use in software templates:

  - `HarnessOrgPicker`
  - `HarnessProjectPicker`

  You can use these UI pickers in service onboarding workflows for developers to easily select a Harness project and organization. Take a look at this [example](https://github.com/bhavya-sinha/scaffolder-sample-templates/blob/5f52718ec49cb2c27a87e2fbeae075873701911c/fieldExtension.yaml#L78-L85). [IDP-868]

## July 2023

### Version 0.7.0

<!-- July 27, 2023 -->

#### What's new

- IDP now includes the Confluence search plugin to include results from Confluence spaces. (IDP-845)
- The `harness:create-secret` and `harness:delete-secret` template actions are now available for use in IDP software templates. You can use these actions to receive a secret from a developer, create a Harness secret, and then use it as a pipeline variable to provide runtime input. For more information, go to the [tutorial](/docs/internal-developer-portal/tutorials/using-secret-as-an-input) (IDP-780)
- The interval at which IDP polls Git repositories associated with the software catalog has increased from 5 minutes to 15 minutes. (IDP-749)

#### Fixed issues

- When you used a delegate to connect to a Git provider, the Docs tab failed to load, and the following message was displayed: `Failed to build the docs page: TAR_BAD_ARCHIVE: Unrecognized archive format`. (IDP-687)

  This issue is now fixed.

- If you used a GitHub connector that used a Github App for API authentication and if the private key was a text secret, the catalog import in IDP failed. The failure was caused by Harness Secrets Manager not storing the specified private key with line breaks, which IDP expects along with proper indentation. (IDP-850, ZD-47845)

  Harness Secrets Manager now formats text secrets properly for text secrets used with IDP.

### Version 0.6.0

<!-- July 12, 2023 -->

#### What's new

- You can now access IDP catalog APIs by using the Harness X-API-Key. For more information, go to [API access](/docs/internal-developer-portal/catalog/software-catalog#api-access). (IDP-768)
- A newer version of the Harness CI/CD plugin has been added with new annotations support. It's now possible to filter pipelines across projects and orgs. For more information, go to the [plugin's readme](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-ci-cd). (IDP-758)
- The Harness Feature Flags [plugin](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-feature-flags) is now available in IDP. (IDP-778)
- The `trigger:harness-custom-pipeline` action on the software template `template.yaml` is now synchronous with pipeline execution. The action keeps running during pipeline execution, and it shows the current status of the pipeline.
- Since the `trigger:harness-custom-pipeline` is now synchronous, you can use the `catalog:register` action in a template and register the newly generated software component's `catalog-info.yaml`.

#### Fixed issues

- Fixed a bug with access control around de-registering a software component. (IDP-757)

## June 2023

### Version 0.5.0

#### What's new

- The Backstage version has been upgraded to [1.14](https://backstage.io/docs/releases/v1.14.0). (IDP-632)
- The following GitHub-based plugins are now available in IDP:
  - [GitHub Actions](https://github.com/backstage/community-plugins/tree/main/workspaces/github-actions/plugins/github-actions#github-actions-plugin)
  - [GitHub Insights](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-github-insights)
  - [GitHub Pull Requests](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-github-pull-requests).
- IDP now includes support for GitHub and Google OAuth applications. You can configure a GitHub or Google OAuth application in the IDP Admin view. These applications are used by the GitHub-based plugins to use the logged-in user's credentials when making API requests. (IDP-676, IDP-661, IDP-647)
- IDP now supports a URL allowlist. If the `catalog-info.yaml` references API definitions that are hosted on a provider other than your Git provider, add the URL to the allowlist. (IDP-648)

#### Fixed issues

- Improvements have been made to reduce the time required for onboarding to the IDP module. (IDP-649)
