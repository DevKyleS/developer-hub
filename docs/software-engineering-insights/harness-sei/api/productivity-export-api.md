---
title: Developer/Team Productivity Export API - V2
description: Learn how to use the Harness SEI API to programmatically export developer & team productivity raw metrics in CSV format.
sidebar_label: Export Developer/Team Productivity Metrics - V2
sidebar_position: 4
---

## Overview

The Developer Productivity Export API (V2) allows you to programmatically export developer- and team-level productivity metrics from Harness SEI in CSV format.
The API allows you to export aggregated productivity metrics at both:

* Developer level and
* Team level

Exports are generated asynchronously due to potentially large data volumes.

1. **Request an Export:** You submit a job and get an exportId.
2. **Poll for Status:** You check the status until it is completed.
3. **Download Result:** You download the resulting CSV file (gzipped).

## Base URLs

Use the correct base URL based on your environment:

* **PROD2:** `https://app.harness.io/gratis/sei/api/`
* **PROD1:** `https://app.harness.io/prod1/sei/api/`
* **EU:** `https://accounts.eu.harness.io/sei/api/`

## Authentication

All requests require a valid [Harness SEI API](/docs/software-engineering-insights/propelo-sei/sei-administration/sei-api-key) key.

| Header         | Value                |
| -------------- | -------------------- |
| `SEI_API_KEY`    | `<YOUR_SEI_API_KEY>` |
| `Content-Type` | `application/json`   |

Generate your API key from the Harness platform under SEI settings.

## Step 1: Create an Export

### Endpoint

Creates an asynchronous export job.

```bash
POST /v2/insights/productivity/exports
```

### Required Query Parameters

| Parameter           | Description                     |
| ------------------- | ------------------------------- |
| `projectIdentifier` | Harness project identifier      |
| `orgIdentifier`     | Harness organization identifier |

### Request Body

```bash
{
  "scope": {
    "orgTreeName": "Engineering",
    "teamId": "456"
  },
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "metricGroups": ["activity", "velocity", "volume", "quality", "collaboration"],
  "metrics": ["PR_Merged", "Work_Completed"],
  "options": {
    "aggregation": "mean",
    "aggregationLevel": "developer",
    "granularity": "monthly",
    "format": "csv"
  }
}
```

### Scope Configuration

The scope object defines what data is exported.

#### Export Entire Organization

```bash
{
  "scope": {
    "orgTreeName": "Engineering"
  }
}
```

Exports all developers within the specified org tree.

#### Export Specific Team

```bash
{
  "scope": {
    "orgTreeName": "Engineering",
    "teamId": "456"
  }
}
```

Exports only developers within the specified team.

#### Metric Selection

You may provide:

* metricGroups
  * activity
  * velocity
  * volume
  * quality
  * collaboration
* OR metrics
* OR both

If both are provided, the API merges and deduplicates the metrics.

#### Options

| Field              | Supported Values                 |
| ------------------ | -------------------------------- |
| `aggregation`      | `mean`                           |
| `aggregationLevel` | `developer`, `team`              |
| `granularity`      | `weekly`, `monthly`, `quarterly` |
| `format`           | `csv`                            |


:::info IMPORTANT BEHAVIOR

* If aggregationLevel = developer → Each row = Developer + Time Period
* If aggregationLevel = team → Each row = Team + Time Period
* Large exports may be gzipped automatically

:::

### Responses

#### 202 Accepted

Returned when a new export job is created.

```bash
{
  "exportId": "exp_7a8b9c0d",
  "createdAt": "2025-12-29T10:00:00Z",
  "message": "Export created successfully"
}
```

#### 200 OK (Existing Export Reused)

If an identical export already exists:

```bash
{
  "exportId": "exp_7a8b9c0d",
  "createdAt": "2025-12-29T09:58:00Z",
  "message": "Using existing export with identical parameters"
}
```

### cURL Example

```bash
curl -X POST '<HARNESS_BASE_URL>/v2/insights/productivity/exports?projectIdentifier=<HARNESS_PROJECT_ID>&orgIdentifier=<HARNESS_ORG_ID>' \
--header 'SEI_API_KEY: <YOUR_SEI_API_KEY>' \
--header 'Content-Type: application/json' \
--data '{
  "scope": {
    "orgTreeName": "<ORG_TREE_NAME>"
  },
  "dateRange": {
    "start": "2025-10-01",
    "end": "2025-12-31"
  },
  "metricGroups": ["activity", "velocity", "volume", "quality", "collaboration"],
  "options": {
    "aggregationLevel": "developer",
    "granularity": "monthly",
    "aggregation": "mean",
    "format": "csv"
  }
}'
```

## Step 2: Check Export Status

Poll this endpoint until the export is complete.

### Endpoint

```bash
GET /v2/insights/productivity/exports/{exportId}
```

### Response Example (Completed)

```bash
{
  "exportId": "exp_7a8b9c0d",
  "status": "completed",
  "createdAt": "2025-12-29T10:00:00Z",
  "completedAt": "2025-12-29T10:02:15Z",
  "download": {
    "url": "/v2/insights/productivity/exports/exp_7a8b9c0d/download",
    "filename": "developer-insights-2024.csv",
    "contentType": "text/csv"
  }
}
```

### Statuses

| Status       | Description             |
| ------------ | ----------------------- |
| `queued`     | Waiting to be processed |
| `processing` | Currently generating    |
| `completed`  | Ready for download      |
| `failed`     | Failed due to error     |
| `cancelled`  | Cancelled by user       |


## Step 3: Download Export

Downloads the generated CSV file.

### Endpoint

```bash
GET /v2/insights/productivity/exports/{exportId}/download
```

The file is returned as a CSV (gzipped if large).

### cURL Example

```bash
curl -X GET "<BASE_URL>/v2/insights/productivity/exports/<EXPORT_ID>/download?projectIdentifier=<HARNESS_PROJECT_ID>&orgIdentifier=<HARNESS_ORG_ID>" \
--header 'authorization: Apikey <SEI_API_KEY>' > ~/<PATH>/<FILE_NAME>.csv.gz
```

## List Exports

Retrieve historical export jobs.

### Endpoint

```bash
GET /v2/insights/productivity/exports
```

### Query Parameters

| Parameter   | Description                          |
| ----------- | ------------------------------------ |
| `status`    | Filter by job status                 |
| `scope`     | `all` (default) or `mine`            |
| `teamId`    | Filter by team                       |
| `createdBy` | Filter by userId                     |
| `dateFrom`  | Created after date                   |
| `dateTo`    | Created before date                  |
| `limit`     | Max 100 (default 50)                 |
| `page`      | Page number (0-based)                |
| `sortBy`    | `createdAt`, `completedAt`, `status` |
| `sortOrder` | `asc`, `desc`                        |


## CSV Output Schema

The CSV columns depend on:

* aggregationLevel
* Selected metrics/metric groups
* Selected granularity

## Error Handling

If the export fails:

```bash
{
  "status": "failed",
  "error": "Invalid teamId"
}
```

**Common causes:**

* Invalid orgTreeName
* Invalid teamId
* Missing or invalid API key
* Insufficient permissions
* Unsupported granularity

## Implementation Example (Python)

```py
import time
import requests

BASE_URL = "<HARNESS_BASE_URL>"
API_KEY = "YOUR_SEI_API_KEY"

HEADERS = {
    "SEI_API_KEY": API_KEY,
    "Content-Type": "application/json"
}

PROJECT = "<HARNESS_PROJECT_ID>"
ORG = "<HARNESS_ORG_NAME>"

payload = {
    "scope": {"orgTreeName": "<ORG_TREE_NAME>"},
    "dateRange": {"start": "2024-01-01", "end": "2024-12-31"},
    "metricGroups": ["activity", "velocity"],
    "options": {
        "aggregation": "mean",
        "aggregationLevel": "developer",
        "granularity": "monthly",
        "format": "csv"
    }
}

# Create export
create_url = f"{BASE_URL}/v2/insights/productivity/exports?projectIdentifier={PROJECT}&orgIdentifier={ORG}"
resp = requests.post(create_url, headers=HEADERS, json=payload)
export_id = resp.json()["exportId"]

# Poll
status_url = f"{BASE_URL}/v2/insights/productivity/exports/{export_id}?projectIdentifier={PROJECT}&orgIdentifier={ORG}"
while True:
    status = requests.get(status_url, headers=HEADERS).json()["status"]
    if status == "completed":
        break
    time.sleep(5)

# Download
download_url = f"{BASE_URL}/v2/insights/productivity/exports/{export_id}/download?projectIdentifier={PROJECT}&orgIdentifier={ORG}"
file_resp = requests.get(download_url, headers=HEADERS)

with open(f"{export_id}.csv", "wb") as f:
    f.write(file_resp.content)
```