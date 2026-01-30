---
title: Connect with SonarQube
description: Integrate Harness SEI with SonarQube for code quality and security insights.
sidebar_position: 1
sidebar_label: SonarQube
---

:::tip
Security Insights is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

[SonarQube](https://docs.sonarsource.com/) is an open-source platform for continuous inspection of code quality. It performs automatic static analysis to detect bugs, code quality issues, and security vulnerabilities.

On initial setup, Harness SEI backfills up to 6 months of historical code quality findings. Once connected, the Open vulnerabilities by severity metric updates on the Security Insights dashboard in the **Security** tab of the **Insights** page.

Once connected, code quality findings from SonarQube contribute to organization-wide and team-level Security Insights metrics, including total open vulnerabilities.

## Prerequisites

Ensure that you have the [SEI Admin role](/docs/software-engineering-insights/harness-sei/get-started/rbac#sei-admin-account--project-level) and an SonarQube API token.

### Create a SonarQube API token

To configure the SonarQube integration, you must create an API token in SonarQube. The token must be either a **User Token** or a **Global Analysis Token**, and have sufficient permissions to access organization and project-level analysis data. For [SonarQube Cloud](https://docs.sonarsource.com/sonarqube-cloud/managing-your-account/managing-tokens), the token is associated with a user and scoped by that user's organization access.

SonarQube tokens can also be scoped at the **organization** level. For more information about creating scoped organization tokens, see the [official SonarQube documentation](https://docs.sonarsource.com/sonarqube-cloud/administering-sonarcloud/managing-organization/scoped-organization-tokens).

:::info
If your SonarQube instance uses an allowlist, ensure that required Harness IP addresses are permitted. For more information, see [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips).
:::

## Add the integration

To add the integration:

1. From the SEI navigation menu, click **Account Management**.
1. On the **Integrations** page, select the **Available Integrations** tab.
1. Locate the **ArmorCode** integration and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration (for example, `SonarQube Production`) and optionally, add tags.
1. Click **Continue**.
1. Add your SonarQube instance URL (for example, `https://sonarcloud.io`) in the `SonarQube URL` field.
1. Enter your SonarQube API token in the `API Token` field. The token must be a **User Token** or **Global Analysis Token**.
1. Click **Continue**.
1. Optionally, limit ingestion to a specific organization or set of projects by entering a name in the `Organization` field and a project key in the `Project Keys` field. 

   - Project keys are case-sensitive. 
   - Leave the `Project Keys` field empty to ingest all projects.

1. Click **Continue** to validate the connection.
2. Once validation succeeds, click **Finish**.

## Integration monitoring

To monitor ingestion and aggregation activity, navigate to the **Monitoring** tab for the SonarQube integration. This tab displays ingestion logs, which show the status and execution details of each data sync.

You can click the **Filters** button to filter these logs by **Status** (for example: `Success`, `Failed`, `Pending`, or `Scheduled`). These statuses reflect the state of ingestion or aggregation jobs.

### Ingestion Logs

The following information is available for each ingestion and aggregation run.

| Column | Description |
|------|-------------|
| **Scan Range Time** | The time range for which data was fetched during ingestion. |
| **Data Retrieval Process** | The ingestion or aggregation method used to fetch and process data. If multiple aggregations occur, this reflects the most recent aggregation status. |
| **Task Start Time** | The timestamp when the ingestion or aggregation job started. |
| **Status** | The execution status of the job (for example, `Success` or `Failed`). |
| **Time to Complete** | Total time taken for the job to finish execution. |
| **Retries** | Number of times the job was retried before completion. |

:::tip
Use ingestion logs to troubleshoot missing data, validate successful syncs, or identify delays in Security Insights reporting.
:::

## Next steps

After configuring the SonarQube integration, you can:

- Select the SonarQube integration from the `Code Quality Tools` section on the **Integrations** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams?team-settings=security-settings#configure-integrations-for-a-team)
- View organization-wide security metrics in the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/analytics-and-reporting/security)
- Drill down into team-level vulnerabilities by selecting a team in the **Org Tree**
