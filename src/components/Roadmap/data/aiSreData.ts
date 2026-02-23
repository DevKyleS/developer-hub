import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const aisreModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "aisre", moduleTitle: "AI SRE" };

export const AiSreData: Horizon = {
  Now: {
    description: "Q1 FY26 (Feb - Apr 2026)",
    feature: [
      {
        tag: [{ value: "On-Call" }],
        title: "Additional International On-Call Support",
        description: "On-call timezone support for India, Shanghai, and Amsterdam regions.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Google Chat Support",
        description: "Google Chat integration to support creating incident spaces and ingesting messages.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Status Update & Stakeholder Communication",
        description: "Structured status updates and stakeholder communication system for incidents.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call System Migration",
        description: "Migration tooling with sandbox validation for transitioning from legacy on-call systems like Opsgenie, PagerDuty, and xMatters.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "ServiceNow Change Integration in AI RCA",
        description: "ServiceNow change records integrated into AI RCA Investigator for enhanced root cause analysis context.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Custom Dashboards for Reporting",
        description: "Reporting capabilities leveraging custom Harness dashboards for incident metrics, trends, and analytics.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Service Paging Webhook",
        description: "Webhook endpoint for external systems to trigger on-call paging directly to services.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "AI-Native Post-Mortem Experience",
        description: "AI-powered post-mortem generation and management with automated insights and action item tracking.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Named Alert Rules",
        description: "Add ability to name and organize alert rules.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "RBAC for On-call",
        description: "Better RBAC for on-call schedules and escalations.",
        backgroundColor: "#E6F4EA",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Escalation Policy Rotation Targeting",
        description: "Escalation policies can target specific rotations within a schedule for more granular paging.",
        backgroundColor: "#E6F4EA",
      },
    ],
  },
  Later: {
    description: "Q2 FY 2026 (May - Jun 2026)",
    feature: [
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Surface Related Previous Incidents",
        description: "AI-powered suggestion of similar historical incidents during active incidents.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Alert Signal in Investigator",
        description: "Incorporate alert data as a signal source in AI RCA Investigator.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Tool Calling as part of Ask AI SRE",
        description: "Enable AI SRE to execute tools and actions as part of investigation.",
      },
      {
        tag: [{ value: "AI & Intelligence" }],
        title: "Multi-lingual Transcription Support",
        description: "Support for transcribing incident calls in multiple languages.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "MS Teams App",
        description: "Native Microsoft Teams application for incident management and on-call workflows.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Scheduled Maintenance Windows",
        description: "Schedule maintenance windows in advance to automatically suppress escalations during planned maintenance.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Slack Slugs for Runbooks",
        description: "Slack slugs for easy execution of runbooks in Slack.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Default Project Time Zone",
        description: "Project-level default timezone for notifications and scheduling.",
      },
      {
        tag: [{ value: "Platform" }],
        title: "Terraform Support for Core IR",
        description: "Terraform provider support for managing IR resources as code.",
      },
    ],
  },
  Released: {
    description: "What has been released recently",
    feature: [
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Automated Paging Feature Parity",
        description: "Full paging capability parity with legacy systems, including automated paging for all incident activity types.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "On-Call Notification Fallback System",
        description: "Multi-channel notification fallback ensuring on-call responders are reached via SMS, push, or voice if primary channel fails.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Custom Severity and Priority Options",
        description: "Admin-configurable severity and priority levels for incidents, replacing fixed defaults with org-specific values.",
      },
      {
        tag: [{ value: "Incident Management" }],
        title: "Action Items in Incident Details",
        description: "Track and manage action items directly within incident details, with assignment and completion tracking.",
      },
      {
        tag: [{ value: "On-Call" }],
        title: "Individual Users in Escalation Policies",
        description: "Escalation policies can now target individual users in addition to schedules and rotations.",
      },
      {
        tag: [{ value: "Integrations" }],
        title: "Jira Dynamic Fields Integration",
        description: "Enhanced Jira integration with dynamic field mapping for issue creation and updates.",
      },
    ],
  },
};
