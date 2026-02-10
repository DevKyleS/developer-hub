import React from "react";
import Link from "@docusaurus/Link";
import "./styles.css";

interface DocsBannerProps {
  title: string;
  message: string;
  linkText: string;
  linkUrl: string;
  type?: "info" | "warning" | "tip";
}

const DocsBanner: React.FC<DocsBannerProps> = ({
  title,
  message,
  linkText,
  linkUrl,
  type = "info",
}) => {
  return (
    <div className={`docs-banner docs-banner-${type}`}>
      <div className="docs-banner-content">
        <div className="docs-banner-text">
          <strong className="docs-banner-title">{title}</strong>
          <span className="docs-banner-message">{message}</span>
        </div>
        <Link to={linkUrl} className="docs-banner-link">
          {linkText} →
        </Link>
      </div>
    </div>
  );
};

export default DocsBanner;
