import React from 'react';

// Helper to chunk an array into rows
function chunkArray(array, size) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return array.reduce((acc, _, i) =>
    i % size ? acc : [...acc, array.slice(i, i + size)], []
  );
}

export const supportedAdminAuditLogs = [
  { name: "Amplitude", img: "/provider-logos/fme-integrations/amplitude-logo.svg", link: "/docs/feature-management-experimentation/integrations/amplitude" },  
  { name: "AppDynamics", img: "/provider-logos/fme-integrations/appdynamics-logo.png", link: "/docs/feature-management-experimentation/integrations/appdynamics" },
  { name: "Datadog", img: "/provider-logos/fme-integrations/datadog-logo.png", link: "/docs/feature-management-experimentation/integrations/datadog" },
  { name: "Email", img: "/provider-logos/fme-integrations/email-logo.png", link: "/docs/feature-management-experimentation/integrations/email" },
  { name: "Jira Cloud", img: "/provider-logos/fme-integrations/jira-logo.png", link: "/docs/feature-management-experimentation/integrations/jira-cloud" },
  { name: "mParticle", img: "/provider-logos/fme-integrations/mparticle-logo.png", link: "/docs/feature-management-experimentation/integrations/mparticle" },
  { name: "New Relic", img: "/provider-logos/fme-integrations/newrelic-logo.png", link: "/docs/feature-management-experimentation/integrations/new-relic" },
  { name: "Rollbar", img: "/provider-logos/fme-integrations/rollbar-logo.png", link: "/docs/feature-management-experimentation/integrations/rollbar" },
  { name: "Slack", img: "/provider-logos/fme-integrations/slack-logo.png", link: "/docs/feature-management-experimentation/integrations/slack" },
  { name: "Sumo Logic", img: "/provider-logos/fme-integrations/sumologic-logo.png", link: "/docs/feature-management-experimentation/integrations/sumologic" },
  { name: "Segment", img: "/provider-logos/fme-integrations/segment-logo.png", link: "/docs/feature-management-experimentation/integrations/segment" },
  { name: "Sentry", img: "/provider-logos/fme-integrations/sentry-logo.png", link: "/docs/feature-management-experimentation/integrations/sentry" },
  { name: "Webhook (Audit Logs)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/audit-logs" },
  { name: "Webhook (Impressions)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/impressions" },
  { name: "Webhook (Admin Audit Logs)", img: "/provider-logos/split-logo.png", link: "/docs/feature-management-experimentation/api/webhook/admin-audit-logs" },
];

export const Section = ({ title, items, perRow = 6, rowSpacing = '32px', description }) => {
  const rows = chunkArray(items, perRow);

  return (
    <section style={{ marginBottom: '64px' /* extra space after section */ }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h2>
      {description && <p style={{ marginBottom: '16px' }}>{description}</p>}

      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', gap: '1rem', marginBottom: rowSpacing }}>
          {row.map(({ name, img, link }) => (
            <a
              key={name}
              href={link}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                width: '140px',
                boxSizing: 'border-box',
              }}
            >
              <img src={img} alt={name} style={{ width: '80px', height: '60px', objectFit: 'contain', marginBottom: '8px' }} />
              <span style={{ textAlign: 'center', lineHeight: '1.2' }}>{name}</span>
            </a>
          ))}
        </div>
      ))}
    </section>
  );
};
