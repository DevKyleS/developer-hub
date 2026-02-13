---
title: Admin Audit Logs
sidebar_position: 2
description: Learn about admin audit logs in Harness FME and legacy Split.
redirect_from:
  - /docs/feature-management-experimentation/management-and-administration/account-settings/audit-logs/admin
---

Admin audit logs capture every change made to objects in Harness FME by users with enhanced permissions. 

These logs provide a record of who made a change, what was changed, and when, helping teams track configuration updates, ensure accountability, and support governance.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="Harness FME (Recommended)">

The following objects in Harness FME are tracked in admin audit logs:

- SDK API keys
- Environments
- Traffic types
- Dimensions
- Security settings
- General settings
- Monitor window and statistics

import { Section, supportedAdminAuditLogs } from '/src/components/Docs/data/fmeAdminAuditlogs';

<Section 
  title="Supported Integrations" 
  items={supportedAdminAuditLogs} 
  perRow={6} 
  rowSpacing="20px" 
  description="Harness FME integrations tracked in admin audit logs allow you to manage changes to your feature flags, environments, and experiment configurations." 
/>

:::tip
Over time, these audit log entries will move to the Harness platform’s [Audit Trails](https://developer.harness.io/docs/platform/governance/audit-trail/) feature, but for now they are only accessible in the FME UI or by FME’s [Audit Log webhook](/docs/feature-management-experimentation/api/webhooks/admin-audit-logs).
:::

</TabItem>
<TabItem value="Legacy Split">

The following objects in legacy Split are tracked in admin audit logs:

- SDK API keys
- Admin API keys
- Environments
- Traffic types
- Dimensions
- Users and their group memberships
- Groups
- Security settings
- General settings
- Monitor window and statistics

<Section 
  title="Supported Integrations" 
  items={supportedAdminAuditLogs} 
  perRow={6} 
  rowSpacing="20px" 
  description="Harness integrations allow you to access and manage your feature flags and experiments directly within the Harness modules your team already uses." 
/>

</TabItem>
</Tabs>

## Viewing changes

<Tabs>
<TabItem value="Harness FME (Recommended)">

Access admin audit logs by navigating to **FME Settings**, select **Security**, and click the **Admin audit logs** tab. You can see a table of all changes that are made by users against the objects listed above.

![](./static/admin-audit-log-1.png)

When hovering over the row for an admin audit log, click on the object name for that change to see more information about each update, including a diff view of what elements of the object were edited.

![](./static/admin-logs-1.png)

</TabItem>
<TabItem value="Legacy Split">

Access Admin audit logs by navigating to **Admin settings**, select **Security**, and click the **Admin audit logs** tab. Admins see a table of all changes that are made by Admins against the objects listed above.

![](./static/admin-logs.png)

When hovering over the row for an audit log, click on the object name for that change to see more information about each update, including a diff view of what elements of the object were edited.

![](./static/admin-audit-log.png)

</TabItem>
</Tabs>

Monitor this data using the user interface to more easily audit every modification made to these administrative settings over time, or to troubleshoot any issues that occur with your integrations. You can also pull out this data using the [outgoing webhook](/docs/feature-management-experimentation/api/webhooks/admin-audit-logs) for analysis within other tools.