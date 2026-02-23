import routesChunkNames from "@generated/routesChunkNames";
import { Horizon } from "./roadmapData";
import type { ModuleTheme } from "./roadmapPalette";

export const cdModuleTheme: ModuleTheme = {
  moduleKey: "cd",
  moduleTitle: "Continuous Delivery & GitOps",
  palette: {
    light: { bg: "#F6FFF2", text: "#30841F" },
    dark: { bg: "#1E3320", text: "#8ED982" },
  },
};

export const CdData: Horizon = {
  "Now": {
    description: "Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Salesforce Manual Deployments",
        description: "Users can compare and cherry-pick changes between two Salesforce sources, review granular diffs, stage selections for promotion, and deploy to a chosen target — all within the Harness Salesforce deployment experience.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Azure Container Apps (ACA) Support",
        description: "Users can deploy to Azure Container Apps (ACA) using Harness, with support for Blue-Green deployment strategy and ACR as the artifact repository.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Progressive Rollout Strategy",
        description: "Users can deploy new application versions incrementally using percentage-based phasing (e.g., 10% → 25% → 50% → 100%) with manual or automated verification gates between phases, progressively replacing existing pods without doubling infrastructure resources.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native AWS Service Catalog Deployments",
        description: "Users can deploy AWS Service Catalog products natively through Harness, managing both IaC and application services as a single unit with support for advanced deployment strategies like Blue-Green and Canary.",
      },

      {
        tag: [{ value: "GitOps" }],
        title: "Integration with Argo Projects",
        description: "Full CRUD and import support for ArgoCD App Projects in Harness, including UI for managing project settings such as repository access, cluster access, sync windows, and orphaned resources.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Rollback Support for GitOps Applications",
        description: "Users can trigger rollbacks to a previous version of a deployed GitOps application directly from the Harness UI, and as a dedicated GitOps Rollback step in pipelines.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI-Powered GitOps Management",
        description: "Users can leverage AI to query and manage GitOps applications, AppSets, and clusters — including sync status checks, triggering operations, and generating pipeline snippets.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Centralized Notifications for GitOps",
        description: "Users can receive centralized notifications for GitOps application events such as sync start, completion, success, failure, and AppSet create, sync, and error events.",
      },

      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Verify Configuration Agent",
        description: "An AI-powered agent that automates health source setup for Continuous Verification by communicating with MCP servers to populate queries and create Monitored Service templates, reducing configuration toil and increasing CV adoption.",
      },

      {
        tag: [{ value: "Pipeline" }],
        title: "Pipeline Execution from Git Tags",
        description: "Users can trigger pipeline executions using Git tags through Git Experience, with support in both the UI and API.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Dry-Run Validation for Pipeline Changes",
        description: "Users can validate pipeline YAML changes made in GitHub or VS Code using a Language Service add-on, enabling earlier detection of errors without running the pipeline.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support",
        description: "UI and integration enhancements for DAG-based pipeline execution, allowing users to define steps and dependencies as a Directed Acyclic Graph for flexible, non-linear workflows.",
      },

      {
        tag: [{ value: "OPA" }],
        title: "Support for Delete Events",
        description: "Users can enforce OPA policies for delete events.",
      },
    ],
  },
  "Next": {
    description: "Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        tag: [{ value: "GitOps" }],
        title: "AI Powered Imports of Applications",
        description: "Use the power of AI to create and assign related resources to GitOps Applications as they are imported.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "GitX Integration",
        description: "Users can integrate GitX with Continuous Verification (CV).",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Support for runtime contexts",
        description: "Users can create and enforce OPA policies that adapt to runtime contexts.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Improve OPA Onboarding Wizard",
        description: "Users can leverage OPA onboarding wizard to simplify policy creation, configuration, and enforcement.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Agent Based Continuous Verification",
        description: "Users can utilize AI agents for intelligent continuous verification of deployments.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Support for AWS Cloudwatch logs",
        description: "Users can configure AWS CloudWatch logs as a health source for continuous verification.",
      },
    ],
  },
  "Later": {
    description: "Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        tag: [{ value: "GitOps" }],
        title: "Hosted GitOps",
        description: "Users can leverage fully hosted GitOps agents managed by Harness.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Template verification",
        description: "Users can validate and enforce OPA policies for templates.",
      },
      {
        tag: [{ value: "Migrator" }],
        title: "Jenkins -> Harness",
        description: "Users can migrate from Jenkins to Harness.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "OIDC Support",
        description: "Users can enable OIDC authentication for continuous verification health sources.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Prometheus Default Health Source for Continuous Verification",
        description: "Users can deploy with continuous verification using prometheus as a built-in default health source.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Continuous Verification Support for Traffic Shifting Offerings",
        description: "Users can use verify step with Harness Deployment workflows that use traffic shifting.",
      },
    ],
  },
  "Released": {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Deployment" }],
        title: "Salesforce Deployments",
        description: "Users can deploy Salesforce releases using Harness with enhanced capabilities.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "GCP MIG Deployment Support",
        description: "Users can deploy Google VM using Harness.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Native Artifact Registry Support for All CD Steps",
        description: "Native integration of Harness Artifact Registry across all deployment types (Kubernetes, Helm, ECS, Azure WebApps, SSH/WinRM, Serverless, etc.), eliminating the need for external connectors and providing seamless authentication using Harness platform RBAC.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "DAG Support",
        description: "Users can define steps and their dependencies as a Directed Acyclic Graph (DAG), enabling flexible, non-linear, and parallel pipeline execution.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Large-scale Pipelines",
        description: "Users can create and manage large-scale pipelines with improved performance and scalability.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Improved Error Logging",
        description: "Users can access enhanced error logging for better troubleshooting and debugging of pipeline issues.",
      },
      {
        tag: [{ value: "Pipeline" }],
        title: "Dynamic Tags for Execution",
        description: "Users can dynamically assign tags during pipeline execution for better organization and tracking.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Rollouts Support",
        description: "Users can leverage advanced rollout strategies for GitOps deployments.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Improved Imports of Applications",
        description: "Users can import GitOps applications with improved efficiency and accuracy.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "OPA Support",
        description: "Users can enforce Open Policy Agent policies in GitOps workflows.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Project Variables Support",
        description: "Users can define and use project-level variables in GitOps applications.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "AI Supported Remediation",
        description: "Users can leverage AI-powered recommendations to remediate GitOps deployment issues.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "AI Verify for Internal Harness Deployments",
        description: "LLM-powered verification for Harness deployments with agent framework integration and production-quality AI Verify code.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "Notification Events for Verification Step Sub-tasks",
        description: "Enhanced notification events that capture details of verification tasks, data collection tasks, and their durations for better monitoring and observability.",
      },
      {
        tag: [{ value: "Continuous Verification" }],
        title: "OIDC Cross Project GCP Support",
        description: "Cross-project access support for GCP tools when setting up continuous verification with OIDC authentication.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "OPA Execution on Customer Infra",
        description: "Users can execute OPA policies on their own infrastructure for enhanced security and control.",
      },
      {
        tag: [{ value: "OPA" }],
        title: "Project Movement Across Orgs",
        description: "Users can move projects across organizations with OPA policies intact.",
      },
      {
        tag: [{ value: "Usability" }],
        title: "Pipeline Studio Redesign/Usability",
        description: "Users can experience an improved Pipeline Studio with enhanced usability and modern design.",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Azure Steady State",
        description: "Health check status polling for Azure Web Apps. Monitors instance health during deployment for reliable steady state verification.",
        link: "https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial/#health-check-polling-for-steady-state-verification",
      },
      {
        tag: [{ value: "Deployment" }],
        title: "Containerised Step Group Support with VM Pools",
        description: "Users can deploy Containerised Step Groups using VM Pools.",
        link: "https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups/",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Harness Secrets Support in Applications",
        description: "Users can securely manage and utilize Harness Secrets within GitOps applications.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/application/manage-gitops-applications/#harness-secret-expressions-in-application-manifests",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "GitOps ApplicationSets as First-Class Entities",
        description: "Create and manage multiple GitOps applications from a single template with UI wizard support. Includes full CRUD operations and all Argo CD generator types. Requires feature flag GITOPS_APPLICATIONSET_FIRST_CLASS_SUPPORT.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Sync Status Events",
        description: "Enables notifications for key GitOps events like SyncSucceeded, SyncFailed, HealthDegraded, and OutOfSync to help teams stay informed.",
      },
      {
        tag: [{ value: "GitOps" }],
        title: "Improved DR support",
        description: "Automates Argo CD Sync Window management during DR switchover between Primary and Secondary Agents, eliminating manual steps and simplifying failover.",
        link: "https://developer.harness.io/docs/continuous-delivery/gitops/gitops-ref/gitops-disaster-recovery/",
      },
    ]
  }
};
