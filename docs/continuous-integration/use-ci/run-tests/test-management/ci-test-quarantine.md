---
title: Test Quarantine
description: Skip unstable tests to unblock deployments while you investigate
sidebar_position: 4
---

# Test Quarantine

When an unstable test blocks every deployment, quarantine lets you bypass it while you investigate. Quarantined tests still run, so you see if they're fixed, but their failures don't block the pipeline.

:::warning Quarantine is Temporary
Create a tracking issue with a deadline for every quarantined test. Quarantined tests represent untested code paths.
:::

## Enable Quarantine in Your Pipeline

Many test steps are configured to fail the build when any test fails.
When quarantine is enabled, Harness evaluates the test results and **ignores failures from quarantined tests when determining the step status**.

Quarantined tests still run and their results are recorded, but they won’t cause the step to fail.

To enable this behavior, add the following environment variable to your test step:
```yaml
env:
  CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

Full pipeline example:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="python" label="Python" default>

```yaml
- run:
    script: |-
      pytest --junitxml=test-results.xml -v
      hcli test-reports upload test-results.xml
    env:
      CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

  </TabItem>
  <TabItem value="java" label="Java/Gradle">

```yaml
- step:
    type: Run
    name: Run Tests
    spec:
      shell: Sh
      command: |
        ./gradlew clean test
        hcli test-reports upload "build/test-results/test/*.xml"
      envVariables:
        CI_ENABLE_QUARANTINED_TEST_SKIP: "true"
```

  </TabItem>
</Tabs>

## When to Quarantine

| Situation | Quarantine? |
|-----------|-------------|
| Flaky test blocks every deployment | Yes |
| External service is temporarily down | Yes |
| Urgent release needed, will fix tomorrow | Yes |
| Test is slow but always passes | No, optimize it |
| Test fails consistently on all runs | No, fix the bug |

## How Quarantine Works

| Original Result | With Quarantine | Pipeline Impact |
|-----------------|-----------------|-----------------|
| FAIL | PASS (ignored) | Does not block |
| PASS | PASS | No change |
| SKIP | SKIP | No change |

The test still executes, you'll see if it passes or fails—but failures are ignored for pipeline status.

## Quarantine a Test

```bash
hcli test-management quarantine set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="https://github.com/your-org/your-repo.git" \
  --api-key="$HARNESS_API_KEY" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --marking=true
```

## View Quarantined Tests

```bash
hcli test-management quarantine get \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --org-id="$HARNESS_ORG_ID" \
  --project-id="$HARNESS_PROJECT_ID" \
  --repo="https://github.com/your-org/your-repo.git" \
  --api-key="$HARNESS_API_KEY" \
```

Example output:
```
Found 6 quarantined test(s):
  - com.taskmanager.FlakyTest::flakyTest1
  - com.taskmanager.FlakyTest::Flaky Test 2: Timing sensitive
  - com.taskmanager.FlakyTest::Flaky Test 3: Random number comparison
  - com.taskmanager.service.WorkItemServiceTest::Flaky test that randomly fails
Page 1 of 1 (total: 6 tests)
```

## Remove from Quarantine

After fixing the test:  

```bash
hcli test-management quarantine set \
  --account-id="$HARNESS_ACCOUNT_ID" \
  --repo="https://github.com/your-org/your-repo.git" \
  --api-key="$HARNESS_API_KEY" \
  --class-name="com.example.PaymentTest" \
  --test-name="testRefundTimeout" \
  --marking=false
```

## Automate with Policies

Instead of manually quarantining tests, use [policies](./ci-test-policies.md) to automate:

```json
[
  {
    "when": ["test failed"],
    "action": ["mark quarantine"]
  }
]
```

This automatically quarantines any test that fails in the current pipeline execution.

## Best Practices

| Practice | Why |
|----------|-----|
| Create a tracking issue | Every quarantined test needs an owner |
| Set a deadline | Quarantine should be temporary (7 days max) |
| Review weekly | Prevent accumulation of quarantined tests |
| Fix the root cause | Don't just quarantine—investigate and fix |

## Next Steps

- [Set up policies](./ci-test-policies.md) to automate quarantine decisions
- [View flaky tests](./ci-flaky-tests.md) to find quarantine candidates
