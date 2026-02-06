---
id: tsdb-to-postgresql-migration
title: Migrate from TimescaleDB to PostgreSQL
sidebar_label: TimescaleDB to PostgreSQL Migration
description: Learn how to migrate Harness SMP from TimescaleDB to PostgreSQL, including prerequisites, migration steps, validation, and post-migration behavior.
tags:
  - SMP
  - Migration
  - PostgreSQL
  - TimescaleDB
  - Upgrade
---

:::note Important
The TimescaleDB to PostgreSQL migration is triggered as part of the Harness SMP upgrade to version 0.36.0 or later.
:::

Harness is transitioning from TimescaleDB to PostgreSQL to enhance the platform and reduce operational overhead. This page outlines the prerequisites for the migration and provides guidance on resolving common issues that may arise during the process.

## Why this migration

- **Alignment with SaaS**: 
Harness SaaS already uses PostgreSQL. Migrating SMP to the same database ensures consistency across environments and allows us to reuse proven configurations, tooling, and operational practices.

- **Reduced operational complexity**: 
TimescaleDB introduced day-to-day operational challenges, particularly related to high WAL generation and storage management. These issues increased the risk during upgrades, deployments, and capacity planning. Standard PostgreSQL removes this added complexity.

- **Improved security and maintenance**:
TimescaleDB has had multiple CVEs, increasing the effort required for upgrades and security patching. Standardizing on PostgreSQL reduces the number of components to manage, simplifies upgrades, and makes it easier to stay up to date with security fixes.

---
## Pre-Migration requirements

Before you begin the migration from TimescaleDB to PostgreSQL, make sure the following requirements are met. These checks help ensure a smooth migration and reduce the risk of disruption during the process.

### PostgreSQL extensions

The target PostgreSQL database must have the following extensions available.

:::note
The versions listed below are the ones tested and validated by Harness.
:::

| Extension    | Version | Purpose                                     |
| ------------ | ------- | ------------------------------------------- |
| `pg_cron`    | 1.6     | Schedules recurring tasks within PostgreSQL |
| `pg_partman` | 5.2.4   | Manages partitioned tables                  |
| `hstore`     | 1.8     | Stores key-value pairs in table columns     |

#### Enabling extensions by provider

| Provider                                    | How to enable                                                                                                                    |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **On-prem PostgreSQL (Harness SMP charts)** | The PostgreSQL image already includes all required extensions.                                                                   |
| **Google Cloud SQL**                        | Enable `pg_cron` by setting the database flag `cloudsql.enable_pg_cron=on`. Refer to the Google Cloud documentation for details. |
| **AWS RDS**                                 | Add `pg_cron` to `shared_preload_libraries` in the DB parameter group. Refer to the AWS documentation for instructions.          |

---

### Database connectivity

Ensure that your PostgreSQL database is configured to handle the migration workload:

1. **Connection capacity**: The database must allow at least 200 concurrent connections.

2. **SSL configuration (if applicable)**
   If SSL is enabled for PostgreSQL connections, make sure the following setting is configured:

   ```yaml
   global:
     database:
       postgres:
         sslMode: "require"
   ```

---

### Infrastructure requirements

The following infrastructure prerequisites must be in place before starting the migration:

1. **TimescaleDB read replica (recommended)**
   Using a read replica as the migration source helps reduce load on the primary TimescaleDB instance.

2. **Storage capacity**
   - **External PostgreSQL**: Allocate at least 1.5× the current TimescaleDB data size.
   - **Internal PostgreSQL**: Plan and provision sufficient persistent volume capacity for both external and internal PostgreSQL deployments.

3. **Kubernetes capacity**
   Ensure sufficient cluster resources to handle pod restarts when services switch from TimescaleDB to PostgreSQL.

4. **OpenShift permissions**
   If running on OpenShift, appropriate RBAC permissions must be granted for the migration components.

---
## Migration

To start the migration, upgrade your Harness SMP deployment to **version 0.36.0** you must set the following flag in the `values.yaml` file:

```bash
ackTsdbMigration: true  # REQUIRED: Must be set to true to acknowledge migration
```

:::note Important
You must explicitly set `ackTsdbMigration: true` to start the migration. Without this flag, the upgrade will fail. This safeguard prevents accidental migrations during chart upgrades.
:::

When the upgrade completes, the migration from TimescaleDB to PostgreSQL begins automatically as a **foreground process**. During this time, the system migrates existing data to PostgreSQL.

After the migration finishes, you can verify the migration status by following the steps in the **Post-migration validation** section.

---

## Post-migration validation

### Migration status tracking

Throughout the migration, the migrator continuously tracks and maintains detailed state information. This allows the system to reliably monitor progress and determine whether the migration has completed successfully.

### Automatic actions after migration

Once the migration completes successfully, the migrator automatically performs the following actions:
- Updates service endpoints:
    - Updates `url`, `host`, and `port` in ConfigMaps from TimescaleDB to PostgreSQL
    - Updates Deployments and StatefulSets to reference PostgreSQL secrets instead of TimescaleDB secrets
- Scales down the **TimescaleDB StatefulSet** to zero replicas (when `TSDB_SCALE_DOWN=true`)
- Scales down the **migrator StatefulSet** to zero replicas (when `MIGRATOR_SCALE_DOWN=true`)
- Updates the ConfigMap to set `MIGRATION_COMPLETED=true`

These actions help clean up unused components and clearly mark the migration as complete.

---

## Frequently Asked Questions

### What are the migration steps?

The migration is carried out in three main phases:
  - Database preparation and data migration - Schema extraction, function recreation, hypertable setup, and full data dump/restore from TimescaleDB to PostgreSQL
  - Update endpoints - Automatic update of ConfigMaps, Deployments, and StatefulSets to switch from TimescaleDB to PostgreSQL connections
  - Incremental sync - Synchronization of any new data written during cutover to minimize data loss

### Why is my ArgoCD showing OutOfSync after migration?

The migrator automatically updates ConfigMaps, Deployments, and StatefulSets at runtime to switch from TimescaleDB to PostgreSQL. These changes are not reflected in Git, causing ArgoCD to show OutOfSync status.

### Will this migration corrupt my existing data?

No. The migrator connects to TimescaleDB in read-only mode. It never modifies or deletes data in your source database. All writes occur only in the target PostgreSQL database.

### What happens if the migration fails partway through?

The migration process is idempotent, which means it can be safely restarted without duplicating data.
    - If the migration fails before cutover, your applications continue running against TimescaleDB with no impact.
    - If the migration fails after cutover, most of the data has already been transferred. You can verify the remaining tables and retry the synchronization.

### Is there a risk of data loss?

The migration is designed to achieve **near-zero data loss** using incremental synchronization.

:::note Note
 During Helm upgrades, incremental sync is skipped to prioritize upgrade speed. To minimize the risk of small data gaps during this window, we recommend:
    * Scheduling the migration during off-peak hours
    * Reviewing migration logs immediately after cutover
:::

### Can I rerun the migration after it has completed?

Yes—but with important data loss implications.

Once the migration is complete (`MIGRATION_COMPLETED=true`), it does not run again automatically. You can force a rerun, but doing so will overwrite PostgreSQL data.

:::warning Warning
Forcing a rerun will **delete all data written to PostgreSQL after cutover**. Only force a rerun if you do not need post-cutover data in PostgreSQL. Historical data can only be reloaded from TimescaleDB.
:::

#### Steps to force a rerun

1. Scale up TimescaleDB (required as the migration source)

   ```bash
   kubectl scale statefulset timescaledb-single-chart --replicas=2 -n <namespace>
   ```

2. Scale up the migrator

   ```bash
   kubectl scale statefulset tsdb-to-psql-migrator --replicas=1 -n <namespace>
   ```

3. Back up the migration status file

   ```bash
   kubectl cp <namespace>/tsdb-to-psql-migrator-0:/migration-data/migration-status.json ./migration-status.json
   ```

4. Remove the migration status file

   ```bash
   kubectl exec -n <namespace> tsdb-to-psql-migrator-0 -- rm /migration-data/migration-status.json
   ```

5. Reset the migration flag in the ConfigMap

   ```bash
   kubectl patch configmap tsdb-to-psql-migrator -n <namespace> \
     --type='json' -p='[{"op": "replace", "path": "/data/MIGRATION_COMPLETED", "value": "false"}]'
   ```

6. Delete the migrator pod

   ```bash
   kubectl delete pod tsdb-to-psql-migrator-0 -n <namespace>
   ```

This triggers a fresh migration run.

### Can I roll back to an older version after migration?

Yes, with limitations.

You can roll back to a Harness version that uses TimescaleDB. However, any data written to PostgreSQL after the cutover will be lost. If you later decide to migrate again, you must force a rerun of the migration (see the previous question).

:::tip Best Practice
Always test the migration thoroughly in a **non-production environment** before running it in production.
:::

---

## Troubleshooting

This section helps you diagnose common issues, tune performance, and gather the information needed to get additional support during or after the migration.

### Accessing migrator pod logs

To investigate issues during migration, start by reviewing the migrator pod details and logs. These logs provide visibility into migration progress, errors, and retries.

Describe the pod:

```bash
kubectl describe pod <migrator-pod> -n <namespace>
```

View pod logs:

```bash
kubectl logs <migrator-pod> -n <namespace>
```

### Performance Issues

If the migration is progressing slowly, review the following:
    - Increase parallelism: Increase `MAX_PARALLEL_JOBS` to allow more parallel dump and restore operations.
    - Check PostgreSQL capacity: Ensure PostgreSQL allows sufficient concurrent connections to support parallel jobs.
    - Review resource limits: Verify that the migrator pod has adequate CPU and memory limits to handle the workload.

If you need additional assistance:

1. Review migration logs, logs are stored inside the migrator PVC:

   ```bash
   kubectl cp <migrator-pod>:/migration-data/logs/. ./logs
   ```

2. Check migration status

   ```bash
   kubectl exec <migrator-pod> -- cat /migration-data/migration-status.json
   ```

:::note Note
If the issue persists, please share the master log file along with the migration status details when contacting the [Harness Support](mailto:support@harness.io) team.
:::

---

## Migrator configuration reference

This section describes all supported configuration options for installing, controlling, and tuning the migrator.

### Installation

To install and enable the migrator in your Harness SMP deployment, set the following Helm values:

```yaml
global:
  database:
    tsdbtopsqlmigrator:
      enabled: true
      ackTsdbMigration: true  # REQUIRED: Explicit acknowledgment
```

### SSL Configuration for External PostgreSQL

If your external PostgreSQL instance requires SSL connections, configure the SSL mode as follows:

```yaml
global:
  database:
    postgres:
      sslMode: "require"
```

### Migration Control

To automatically start the migration after installation, enable the following environment variable:

```yaml
extraEnvVars:
  - name: MIGRATION_ENABLED
    value: "true"
```

### Performance Tuning

Use these settings to control parallelism, compression, and retry behavior:

```yaml
extraEnvVars:
  # Parallel processing
  - name: MAX_PARALLEL_JOBS
    value: "8"

  - name: RESTORE_PARALLEL_WORKERS
    value: "8"

  # Compression
  - name: DUMP_COMPRESSION_LEVEL
    value: "7"

  # Retry behavior
  - name: MAX_RETRIES
    value: "3"

  - name: RETRY_DELAY_SECONDS
    value: "30"
```

### Storage Configuration

Configure persistent storage for migration artifacts such as logs, dumps, and backups:

```yaml
persistence:
  size: "50Gi"
  storageClass: "standard-rwo"
```

---

## Kubernetes RBAC Requirements

The migrator requires specific Kubernetes permissions to automate the migration process. The tsdb-to-psql-migrator service account must have the following RBAC access.

### Pods

The migrator requires access to pods to monitor its runtime behavior and ensure the migration is progressing as expected. This access enables health monitoring and visibility into active pods within the namespace.

**Permissions:** `get`, `list`, `watch`

### Deployments and StatefulSets

To complete the migration and cutover, the migrator interacts with Deployments and StatefulSets to update database endpoints and manage component scaling during and after migration.

This access is used to:

* Switch application connections from TimescaleDB to PostgreSQL
* Scale down the TimescaleDB StatefulSet after migration
* Scale down the migrator StatefulSet after completion
* Identify workloads that reference TimescaleDB

**Permissions:** `get`, `list`, `watch`, `patch`

**Subresource (statefulsets/scale)**: `patch`

### Secrets 

The migrator reads Secrets to access TimescaleDB and PostgreSQL credentials required to establish database connections.

**Permissions**: `get`, `list`

### ConfigMaps

The migrator updates ConfigMaps to switch applications from TimescaleDB to PostgreSQL and to record migration state. This ensures a consistent and automated cutover.

This access is used to:

* Read TimescaleDB and PostgreSQL credentials
* Update PostgreSQL connection details
* Set the `MIGRATION_COMPLETED` flag
* Replace TimescaleDB references with PostgreSQL

**Permissions:** `get`, `list`, `update`, `patch`
