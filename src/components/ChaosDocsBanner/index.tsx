import React, { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import "./styles.css";

const ChaosDocsBanner: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [bannerType, setBannerType] = useState<"resilience" | "chaos" | null>(null);

  useEffect(() => {
    // Check if we're on chaos or resilience testing docs
    const isResilienceDocs = location.pathname.startsWith("/docs/resilience-testing");
    const isChaosDocs = location.pathname.startsWith("/docs/chaos-engineering");

    if (!isResilienceDocs && !isChaosDocs) {
      setIsVisible(false);
      return;
    }

    // Check localStorage for dismissal
    const dismissedKey = isResilienceDocs ? "resilience-banner-dismissed" : "chaos-banner-dismissed";
    const isDismissed = localStorage.getItem(dismissedKey) === "true";

    if (!isDismissed) {
      setIsVisible(true);
      setBannerType(isResilienceDocs ? "resilience" : "chaos");
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleDismiss = () => {
    const dismissedKey = bannerType === "resilience" ? "resilience-banner-dismissed" : "chaos-banner-dismissed";
    localStorage.setItem(dismissedKey, "true");
    setIsVisible(false);
  };

  if (!isVisible || !bannerType) {
    return null;
  }

  return (
    <div className={`chaos-docs-banner chaos-docs-banner-${bannerType}`}>
      <div className="chaos-docs-banner-content">
        {bannerType === "resilience" ? (
          <>
            <div className="chaos-docs-banner-text">
              <strong>New Resilience Testing Documentation</strong>
              <span>You're viewing the new Resilience Testing docs covering Chaos, Load, and DR Testing. Looking for the old Chaos Engineering docs?</span>
            </div>
            <Link to="/docs/chaos-engineering/overview" className="chaos-docs-banner-link">
              View Old Docs →
            </Link>
          </>
        ) : (
          <>
            <div className="chaos-docs-banner-text">
              <strong>New Resilience Testing Documentation Available</strong>
              <span>We've launched new Resilience Testing docs covering Chaos, Load, and DR Testing.</span>
            </div>
            <Link to="/docs/resilience-testing/overview" className="chaos-docs-banner-link">
              View New Docs →
            </Link>
          </>
        )}
        <button
          className="chaos-docs-banner-close"
          onClick={handleDismiss}
          aria-label="Close banner"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ChaosDocsBanner;
