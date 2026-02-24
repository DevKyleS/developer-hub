import { Horizon } from "./roadmapData";
import { DEFAULT_MODULE_THEME } from "./roadmapPalette";

export const ceModuleTheme = { ...DEFAULT_MODULE_THEME, moduleKey: "ce", moduleTitle: "Resilience Testing" };

export const CeData: Horizon = {
  Now: {
    description: "Q1 2026, Feb 2026 - Apr 2026",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "FIPS Compliance",
        description: "Make the Resilience Testing module FIPS compliant.",
      },
      {
        tag: [{ value: "Chaos" }],
        title: "Support for More Azure Chaos Faults",
        description: "Add support for Azure CosmosDB Failover and Redis Cache Reboot.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "AI Extensions for Load Testing",
        description: "Add MCP Server support and Ask AI support for load testing.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "AI Extensions for DR Testing",
        description: "Add MCP Server support and Ask AI support for DR testing.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Risks",
        description: "Introduce the Risks feature for Load and DR tests.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Native Dashboards",
        description: "Introduce basic native dashboards for Resilience Testing built on the Harness UDP platform.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "External Secret Manager",
        description: "Extend support for external secret managers like Vault for all components of the Resilience Testing module.",
      },
    ],
  },
  Next: {
    description: "Q2 2026, May 2026 - Jul 2026",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Passive Risk Detection",
        description: "Add extended support for risk detection.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Harness 3.0 Design Support",
        description: "Add the new UX design support for the Resilience Testing module.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Integrated Risks Management",
        description: "Perform all tests and measure resilience score on behalf of a service, and identify risks on behalf of a service.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Extend AI Recommendations",
        description: "Extend AI recommendations support for load and DR testing.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Testing Policies",
        description: "Add support for notifications based on policies for Chaos, Load, and DR testing.",
      },
    ],
  },
  Later: {
    description: "H2 2026, Q3 2026 and beyond",
    feature: [
      {
        tag: [{ value: "AI" }],
        title: "Incident Management Extensions",
        description: "Provide AI recommendations based on incidents reported in incident management systems.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "JMeter and Grafana K6 Support",
        description: "Add JMeter and Grafana K6 as supported load testing frameworks.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "DR Templates",
        description: "Add out-of-the-box DR templates for achieving end-to-end DR and DR test automation.",
      },
      {
        tag: [{ value: "AI" }],
        title: "APM Insights",
        description: "Extend AI recommendations based on APM insights.",
      },
      {
        tag: [{ value: "AI" }],
        title: "Extended Resilience Insights",
        description: "Provide AI recommendations based on data and events reported on the Harness Knowledge Graph.",
      },
    ],
  },
  Released: {
    description: "What has been released",
    feature: [
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Resilience Testing",
        description: "Upgraded Chaos Engineering module and renamed it as Resilience Testing.",
      },
      {
        tag: [{ value: "Load Testing" }],
        title: "Load Testing Intro - Locust",
        description: "Introduced native load testing capability using Locust.",
      },
      {
        tag: [{ value: "DR Testing" }],
        title: "DR Testing Intro",
        description: "Introduce native DR testing capability using the constructs of pipeline steps: Chaos Fault step and Resilience Probe step.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "New Chaos Studio",
        description: "Enhanced and streamlined approach to chaos experiment design with an improved end-to-end experiment creation experience, available to new customers via the CHAOS_NG_EXPERIENCE feature flag.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Experiment-Level Probes and Actions",
        description: "Advanced probing and action capabilities scoped at the experiment level, enabling validation and custom operations that span across all faults in an experiment.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Templates for Faults, Probes, Actions, and Experiments",
        description: "Reusable templates for faults, probes, actions, and full experiments to standardize chaos engineering practices and scale adoption across teams and applications.",
      },
      {
        tag: [{ value: "Chaos integrations" }],
        title: "APM Probes",
        description: "Application Performance Monitoring probes to validate system health during chaos experiments, with support for Datadog, Dynatrace, New Relic, Prometheus, Splunk, AppDynamics, and GCP Monitoring.",
      },
      {
        tag: [{ value: "Resilience Testing Platform" }],
        title: "Out-of-the-Box Probe Templates",
        description: "Pre-built command probe templates for Kubernetes, AWS, and GCP resource validation during chaos experiments, covering pod status, node health, replica counts, EC2 instance status, ECS service checks, GCP VM status, and more.",
      },
    ],
  },
};
