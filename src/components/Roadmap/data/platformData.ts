import { link } from "fs";
import { Horizon } from "./roadmapData";
export const platformData: Horizon = {
  Now: {
    description: "🚧 Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        title: "Knowledge Graph (Beta)",
        description:
          "A connected, graph-based data model that integrates siloed information—such as code repositories, CI/CD pipelines, infrastructure, and vulnerability scans—into a single, queryable, and visual representation.",
        tag: [{ value: "Knowledge Graph" }],
      },
      {
        title: "Dashboards 3.0 (Beta)",
        description:
          "AI powered dashboard creation in addition to manual dashboard builder experience",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Unified Data Platform (Beta)",
        description:
          "A centralized, AI-enabled repository that integrates, manages, and secures data across the entire software development lifecycle (SDLC)",
        tag: [{ value: "UDP" }],
      },
      {
        title: "Product Usage Analytics",
        description:
          "A feature-centric engagement dashboard that reveals the depth of user activity across modules",
        tag: [{ value: "Analytics" }],
      },
      {
        title: "Harness ID (Beta)",
        description:
          "A unified Identity & Access Management (IAM) platform for Harness: one place to define, issue, and verify identity for users, pipelines, services, and AI agents.",
        tag: [{ value: "IAM" }],
      },
      {
        tag: [{ value: "Notify" }],
        title: "Service account token expiration",
        description:
          "Configure service account token expiration notifications through the centralized notification system.",
      },
    ],
  },
  Next: {
    description: "🪄 Q2 2026, May 2026 - July 2026",
    feature: [
      {
        title: "Knowledge Graph (Integration of third party data)",
        description:
          "A connected, graph-based data model that integrates siloed information—such as code repositories, CI/CD pipelines, infrastructure, and vulnerability scans—into a single, queryable, and visual representation.",
        tag: [{ value: "Knowledge Graph" }],
      },
      {
        title: "Dashboards 3.0 (GA)",
        description:
          "AI powered dashboard creation in addition to manual dashboard builder experience",
        tag: [{ value: "Dashboard" }],
      },
      {
        title: "Unified Data Platform (GA)",
        description:
          "A centralized, AI-enabled repository that integrates, manages, and secures data across the entire software development lifecycle (SDLC)",
        tag: [{ value: "UDP" }],
      },
      {
        title: "Harness ID (GA)",
        description:
          "A unified Identity & Access Management (IAM) platform for Harness: one place to define, issue, and verify identity for users, pipelines, services, and AI agents.",
        tag: [{ value: "IAM" }],
      },
    ],
  },
  Later : {
    description: "🔭 Q3 2026, Aug 2026 - Oct 2026",
    feature: [
      {
        title: "Knowledge Graph (GA)",
        description:
          "A connected, graph-based data model that integrates siloed information—such as code repositories, CI/CD pipelines, infrastructure, and vulnerability scans—into a single, queryable, and visual representation.",
        tag: [{ value: "Knowledge Graph" }],
      },
      {
        title: "Centralized certificate management",
        description:
          "Ability for users to add the certificates to delegate to make the call to Harness Manager.",
        tag: [{ value: "Security" }],
      },
      {
        title: "Connectors 2.0",
        description: "Allows users to connect to their code, cloud, and tools more efficiently, with streamlined configuration and enhanced visibility for better governance and control",
        tag: [],
      },
      {
        title: "API/CLI Standardization",
        description:
          "Standardize API and CLI for Harness modules on a single versioning to enhance the developer experience",
        tag: [{ value: "Developer Experience" }],
      },
      {
        title: "AI-Powered Pipeline Troubleshooting & Insights",
        description: "An AI-assisted experience that helps you quickly troubleshoot pipeline failures and gain actionable insights into your workflow performance.",
        tag: [],
      },
    ],
  },
  Released: {
    description: "✅ What has been released",
    feature: [
      {
        title: "Move Project across Organizations (Closed Beta)",
        description:
          "Move a project from one organization to another to support scenarios like ownership change.",
        tag: [{ value: "Platform" }],
        link:"/docs/platform/organizations-and-projects/move-projects/overview"
      },
      {
        title: "Alerting on platform limits",
        description:
          "Users can now set up email alerts to receive notifications when their account reaches 80%, 95%, or 100% of their platform resource limits.",
        tag: [{ value: "Platform" }],
        link: "/docs/platform/notifications/notification-settings/#emails-for-platform-limit-alerts"
      },
      {
        title: "Non-default encryption key in AWS secrets manager",
        description:
          "User can now select their own KMS key when creating or editing inline secrets in AWS Secrets Manager, instead of being limited to the default `aws/secretsmanager` key.",
        tag: [{ value: "Secrets" }],
        link: "/docs/platform/secrets/secrets-management/add-an-aws-secret-manager/#inline-secret-in-aws-secrets-manager"
      },
      {
        title: "Audit logs for user authentication failure",
        description:
          "User can now track authentication failures for their accounts, as Harness now captures unsuccessful login attempts across all authentication methods, providing better visibility into security events while maintaining system performance.",
        tag: [{ value: "Audit Trail" }],
        link: "/docs/platform/authentication/authentication-overview#audit-logs-for-authentication"
      },
      {
        title: "Cross-project access support for GCP Secrets Manager connector",
        description:
          "Users can now reuse a single connector across multiple GCP projects and choose the specific project where secrets are stored.",
        tag: [{ value: "Secrets" }, { value: "Connectors"}],
        link: "/docs/platform/secrets/secrets-management/add-a-google-cloud-secret-manager/#enable-cross-project-access"
      },
      {
        title: "Split *Manage* permission for user groups",
        description:
          "The “Manage” user group permission has been split into multiple granular permissions, allowing users to have fine-grained control over specific tasks they want to execute.",
        tag: [{ value: "Access Control" }],
        link: "/docs/platform/role-based-access-control/rbac-in-harness#split-manage-permissions"
      },
      {
        title: "Hashicorp Vault: JWT enhanced claims",
        description:
          "Allows users to include additional JWT claims (e.g., environment ID) for fine-grained access control and stricter secret isolation, improving security and compliance.",
        tag: [{ value: "Connectors" }],
      },
    ],
  }, 
};
