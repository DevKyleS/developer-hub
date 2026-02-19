---
title: Scanner Severity Override
description: Override the severity level of a vulnerability.
sidebar_label: Scanner Severity Override
sidebar_position: 10
---

## Scanner Severity Override


Scanner Severity Override allows you to configure the scan step to use severity levels reported directly by the security scanner. By default, STO assigns [severity](/docs/security-testing-orchestration/key-concepts/severities) based on numeric scores such as CVSS. When scanner severity override option is enabled, STO bypasses its internal severity mapping and uses the severity levels reported by the scanner (for example, Critical, High, Medium, and Low).

### Enable Scanner Severity Override


You can enable the scanner severity override behavior in either of the following below 2 ways:

1.  In the scan step configuration, enable `Use Raw Scanner Severity` option.
<DocImage path={require('./static/manual-severity.png')} width="60%" height="60%" title="Click to view full size image" />

2. In the scan step configuration, add `ingest_tool_severity: true` in the Settings section.

<DocImage path={require('./static/settings.png')} width="60%" height="60%" title="Click to view full size image" />

### Supported Scanners List

Scanner Severity Override is supported for the following scanners:


- [Checkmarx](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarx-scanner-reference#use-raw-scanner-severity)
- [CheckmarxOne](/docs/security-testing-orchestration/sto-techref-category/checkmarx/checkmarxone-scanner-reference#use-raw-scanner-severity)
- [Anchore](/docs/security-testing-orchestration/sto-techref-category/anchore-enterprise-scanner-reference#scan-tool) 
- [Snyk](/docs/security-testing-orchestration/sto-techref-category/snyk/snyk-scanner-reference#scan-tool)
- [Prisma Cloud(formerly Twistlock)](/docs/security-testing-orchestration/sto-techref-category/prisma-cloud-scanner-reference#scan-tool)

