import { Horizon } from "./roadmapData";

export const CcmData: Horizon = {
  Released: {
    description: "What has been released",
    feature: [
      // January 2025 Releases
      {
        tag: [{value: "AutoStopping"}],
        title: "Granular RBAC",
        description:
          "[Released: January 2025] Granular RBAC in Harness Autostopping introduces fine-grained control over Rules and Connectors as separate resources, enabling more precise permission management.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Anomalies"}],
        title: "Anomaly Detection 2.0 (Beta)",
        description:
          "[Released: January 2025] Enhanced anomaly detection capabilities with drill-down analysis. Includes support for cost category anomalies, customizable workflows, and preferences for setting percentage deviations and minimum cost thresholds.",
        backgroundColor: "var(--green-100)",
      },
      
      // December 2025 Releases
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Nodepools and Nodeclasses Configuration via Harness UI",
        description:
          "[Released: December 2025] UI-based configuration management for Nodepools and Nodeclasses.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Reverse Fallback V2",
        description:
          "[Released: December 2025] Improved failover and fallback mechanisms for Cluster Orchestrator.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Platform"}],
        title: " External Data Ingestion (Beta) ",
        description:
          "[Released: December 2025] Focus compliant external data ingestion to ingest SaaS (Ex. Snowflake, Databricks etc.)",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: " Governance Notifications ",
        description:
          "[Released: December 2025] Alert notifications on evaluations for prompt alerting.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Visibility"}],
        title: "Cost Category Enhancements",
        description:
          "[Released: December 2025] Performance improvements - 2x Query speeds, Support to leverage cost categories across all CCM features: Recommendations, Asset Governance, Budgets",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for EKS",
        description:
          "[Released: December 2025] Workload-driven intelligent node autoscaling with distributed spot orchestration",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator - User Approvals ",
        description:
          "[Released: December 2025] Manual user approval of commitment purchases and exchanges for more granular control",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Multi-Policy Support",
        description:
          "[Released: December 2025] Support to run multiple policies in a single rule to create a workflow of policies",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cloud Asset Governance for GCP",
        description:
          "[Released: December 2025] FinOps-as-code policies for GCP with out-of-the-box recommendations (Docs)",
        backgroundColor: "var(--green-100)",
        link: "https://developer.harness.io/docs/category/governance-for-gcp",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Cost Correlation for GCP Asset Governance",
        description: "[Released: December 2025] Correlate cost impact of policy runs to identify savings",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Visibility"}],
        title: "Azure preferences",
        description: "[Released: December 2025] Support between Actual and Amortized cost in Azure Preferences.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Tags support for Recommendations ",
        description:
          "[Released: December 2025] Tags are supported for recommendations and filtering is allowed.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Governance Cost Correlation support for new resources",
        description:
          "[Released: December 2025] New resources added for all three clouds for Cost Correlation.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Asset Governance"}],
        title: "Custom Recommendations powered by Governance ",
        description:
          "[Released: December 2025] Allows users to generate recommendations for all the type of resources supported for Cost Correlation. ", 
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS (Beta) ",
        description:
          "[Released: December 2025] The Commitment Orchestrator for RDS (Beta) extends our automated savings capabilities to Amazon RDS, helping organizations maximize cost efficiency by optimizing Reserved Instances (RIs) and Savings Plans",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: " Asset Governance" }],
        title: "FInOps AI assistant (Beta)",
        description:
          "[Released: December 2025] The FinOps AI Assistant leverages generative AI to automate the creation and enforcement of cloud governance policies, enabling faster cloud optimization. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendation preferences ",
        description:
          "[Released: December 2025] The Recommendation Preferences feature enables users to customize and save their tuning settings for various resources like Kubernetes workloads, NodePools, ECS services, and AWS VMs.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Platform"}],
        title: " ROI Dashboard ",
        description:
          "[Released: December 2025] The ROI Dashboard provides customers with a centralized view of the return on investment generated by CCM's features. It displays relevant metrics and enables users to craft compelling narratives around the data, making it easier to communicate insights and share the dashboard with stakeholders.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator Inventory ",
        description:
          "[Released: December 2025] Provides a centralized view of all account commitments, including details on Convertible and Standard RIs, Compute and EC2 Savings Plans, and statuses.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Workload Bin-packing for EKS Cluster Orchestrator",
        description:
          "[Released: December 2025] Efficient scheduling and placement of containers onto nodes for optimizing node count and utilization",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Configurable Karpenter Node Time-To-Live (TTL) in Harness UI",
        description:
          "[Released: December 2025] Configurable Karpenter Node Time-To-Live (TTL) allows users to set node lifetimes directly within the interface, simplifying node management.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Spot Orchestration: Reverse Fallback Retry",
        description:
          "[Released: December 2025] Reverse Fallback Retry enables automatic rollback of workloads to their original nodes or environments once they're available, ensuring efficient resource use. ",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Workload Distribution Rule at Workload & Namespace level",
        description:
          "[Released: December 2025] Workload Distribution Rules enable precise control over workload placement within clusters at both workload and namespace levels, enhancing resource balance, policy compliance, and workload isolation across Kubernetes environments.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Overlapping Schedules",
        description:
          "[Released: December 2025] Overlapping schedules allow teams across time zones to define their usage windows for shared resources. By prioritizing these schedules, users can effectively manage conflicts and ensure accurate resource allocation",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Bulk Processing of AutoStopping Rules",
        description:"[Released: December 2025] Bulk processing of Autostopping rules enables users to select and update multiple rules at once to simplify the management of multiple rules simultaneously.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: " Integration with Cluster Orchestrator",
        description:
          "[Released: December 2025] Enhancing Commitment Orchestrator with seamless Cluster Orchestrator integration.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Schedules",
        description:
          "[Released: December 2025] Cluster Orchestrator schedules allowing users to define usage windows for shared resources.",
        backgroundColor: "var(--green-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "VPA Support for Cluster Orchestrator",
        description:
          "[Released: December 2025] VPA Support for Cluster Orchestrator.",
        backgroundColor: "var(--green-100)",
      },
    ],
  },
 Now:{
  description: "Q1 CY'26, Feb 2026 - Apr 2026",
    feature: [
      // BAR (Budgets, Anomalies, Recommendations) Section
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly FinOps AI Assistant ",
        description: "AI-powered insights to help FinOps teams analyze anomalies and notify the right stakeholders.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Budgets 2.0 ",
        description: "Granular budgeting with version control, rule-based alerts, and CSV uploads for dynamic cost tracking along with AI-powered forecasts and budget suggestions",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Variance breakdown by service, team, and cost category",
        description: "Variance breakdown by service, team, and cost category with clear linkage from alert to investigation view.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Budget perspective decouple",
        description: "Decoupling budget perspectives with cost category support.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendation 2.0",
        description: "Complete UX revamp for Recommendations 2.0 with improved user experience.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "IaCM<>CCM integration for automated application of recommendations",
        description: "Integration with IaCM for automated application of recommendations at source - Discovery phase.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Show impact of applied recommendations using perspectives or reports",
        description: "Show impact of applied recommendations using perspectives and reports.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Clear visuals to communicate recommendation formulas",
        description: "Clear visuals to communicate the formulas used to compute recommendations.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Anomaly UI/UX Improvements",
        description: "User interface and experience improvements for anomaly detection.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Whitelisting of RI, SP, Services for anomalies",
        description: "Whitelisting of Reserved Instances, Savings Plans, and Services to exclude them while generating anomalies.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Split anomalies into active/ongoing and one-time",
        description: "Split anomalies into 'active/ongoing' (spike still in effect) and 'one-time' (spike happened and spend came back down).",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Additional tuning options for recommendations",
        description: "Additional tuning options for pass-through and governance recommendations.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Global cost preferences for all recommendation types",
        description: "Global cost preferences needed for all recommendation types (particularly Net Amortized, and list cost) for Azure and GCP.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Include utilization metrics for all recommendations",
        description: "Include utilization metrics for all recommendations and additional metadata for pass-through recommendations.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "First class integration with JIRA and ServiceNow",
        description: "First class integration with JIRA and ServiceNow to raise tickets and delegate actioning of detected anomalies.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Expected cost spike - clear messaging",
        description: "Expected cost spike with clear messaging for users to understand why a certain cost spike was not flagged as an anomaly (due to seasonality, etc.) - Phase 1.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendations 2.0 | Auto-Inference of Savings",
        description: "Auto-inference of savings (partially realized) in Recommendations 2.0.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Generating anomalies multiple times a day",
        description: "Generating anomalies multiple times a day (dependent on multiple times a day ingestion of cloud spend).",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Capture Recommendations Savings in Jira and Snow",
        description: "Capture recommendations savings in Jira and ServiceNow for tracking and reporting.",
        backgroundColor: "var(--yellow-100)",
      },

      // AutoStopping Section
      {
        tag: [{value: "AutoStopping"}],
        title: "Smart Advisor",
        description: "Smart Advisor helps you uncover cost-saving opportunities by identifying underused cloud resources and recommending the ideal Autostopping configurations.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "eBPF support for AutoStopping",
        description: "eBPF support for AutoStopping for Kubernetes",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Azure & AWS Spot support in Autostopping",
        description: "Support for Azure and AWS Spot instances in AutoStopping to optimize cost savings.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "eBPF Complete AutoStopping Support",
        description: "Complete eBPF support for AutoStopping across all environments.",
        backgroundColor: "var(--yellow-100)",
      },

      // Cluster Orchestrator Section
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "RBAC for Cluster Orchestrator",
        description: "Role-based access control to enhance security and governance in Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description: "Cluster Orchestrator support for Azure Kubernetes Service (AKS) including Discovery, Scale up and down, Spot Handling (Interruption, Fallback, Reverse Fallback, Schedule window), Karpenter with Azure Latest version, Nodepool and Nodeclass, Setup.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Onboarding Simplification - Phase 2",
        description: "Phase 2 of simplified onboarding experience for Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator Terraform Module",
        description: "Terraform module support for Cluster Orchestrator deployment and configuration.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator VPA Support Phase 2",
        description: "Phase 2 enhancements for Vertical Pod Autoscaler (VPA) support in Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator log improvements - Provisioning Errors",
        description: "Enhanced logging for provisioning errors in Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orch EKS GA",
        description: "General Availability of Cluster Orchestrator for Amazon EKS.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Observability in Cluster Orchestrator",
        description: "Enhanced observability and monitoring capabilities for Cluster Orchestrator.",
        backgroundColor: "var(--yellow-100)",
      },

      // Commitment Orchestrator Section
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for RDS GA ",
        description: "General Availability of Commitment Orchestrator for Amazon RDS, enabling better cost-efficiency through commitment management for database services.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Set Email Alerts For Expiring RIs and SPs",
        description: "Set email alerts for expiring RIs and SPs to help users proactively manage their commitments and avoid unexpected charges.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator AI Summary Support",
        description: "AI-powered insights to help users analyze their commitments and notify the right stakeholders.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Azure support in Commitment Orchestrator",
        description: "Azure support in Commitment Orchestrator including Utilization, Savings, Coverage, and Permissions visibility.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "AWS Savings Plan Database Discovery/Support",
        description: "Discovery and support for AWS Savings Plans for RDS and ElastiCache databases.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Net new SP and Layering",
        description: "Support for net new Savings Plans and layering strategies.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment V2 GA",
        description: "General Availability of Commitment Orchestrator v2.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "ML Forecasting",
        description: "Machine Learning-powered forecasting for commitment planning.",
        backgroundColor: "var(--yellow-100)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Elasticache Dashboard Support - Phase 2",
        description: "Phase 2 dashboard support for Amazon ElastiCache commitments.",
        backgroundColor: "var(--yellow-100)",
      },

      // Cost Categories Section
      {
        tag: [{value: "Cost Categories"}],
        title: "AI in Cost Categories",
        description: "AI-powered insights to help users analyze their commitments and notify the right stakeholders.",
        backgroundColor: "var(--yellow-100)",
      },
    ],
 },
Later:{
    description: "Q2 2026 and beyond",
    feature: [

      {
        tag: [{value: "AutoStopping"}],
        title: "AutoStopping Onboarding Assistant for EKS",
        description:
          "A smart onboarding assistant for AutoStopping that automates resource identification, rule creation, and bulk configuration for Kubernetes-based environments.",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Azure Spot support in Autostopping",
        description:
          "Support for Azure Spot support in Autostopping.",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "AutoStopping"}],
        title: "Autostopping Global Schedules",
        description:
          "Global schedules for Autostopping allowing users to define usage windows for shared resources.",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "Innovation"}],
        title: " FinOps Workflows ",
        description:
          "Automated workflows to simplify and scale the adoption of FinOps practices and CCM features across organizations.",
        backgroundColor: "var(--blue-50)",
      },
       {
        tag: [{value: "Cluster Orchestrator"}],
        title: " Cluster Orchestrator for EKS (GA) ",
        description:
          "Workload-driven intelligent K8s node auto scaling with distributed spot orchestration and advanced bin packing",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "Cluster Orchestrator"}],
        title: "Cluster Orchestrator for AKS",
        description:
          "Automates AKS cluster provisioning, scaling, and node pool management with policy-driven orchestration",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "Commitment Orchestrator"}],
        title: "Commitment Orchestrator for Azure",
        description:
          "Exentding capabilities of Commitment Orchestrator for Azure.",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Intelligence for thresholds - account and CC level",
        description: "Intelligent threshold setting for anomalies at account and cost category level.",
        backgroundColor: "var(--blue-50)",
      },
      {
        tag: [{value: "BAR (Budgets, Anomalies, Recommendations)"}],
        title: "Recommendations OPA Policy - CD integration",
        description: "Recommendations OPA Policy with CD integration - Discovery phase.",
        backgroundColor: "var(--blue-50)",
      },
    ],
  }
};
