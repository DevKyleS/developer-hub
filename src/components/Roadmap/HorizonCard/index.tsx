import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { tag } from "../data/roadmapData";
import Link from "@docusaurus/Link";

const HorizonCard = ({ title, description, tag, module, link, backgroundColorCard }) => {
  const colorMap = new Map([
    [
      "red",
      {
        color: "var(--red-200)",
        textColor: "var(--red-800)",
      },
    ],
    [
      "blue",
      {
        color: "var(--primary-2)",
        textColor: "var(--primary-8)",
      },
    ],
    [
      "yellow",
      {
        color: "var(--yellow-200)",
        textColor: "var(--yellow-800)",
      },
    ],
    [
      "green",
      {
        color: "var(--green-200)",
        textColor: "var(--green-800)",
      },
    ],
    [
      "gray",
      {
        color: "var(--gray-200)",
        textColor: "var(--gray-800)",
      },
    ],
  ]);

  // Map category names to CSS class names and border colors
  const categoryStyleMap = new Map([
    ["Platform", { className: "tagPlatform", borderColor: "#6BB0EB" }],
    ["Operations", { className: "tagOperations", borderColor: "#AFA0FF" }],
    ["Governance", { className: "tagGovernance", borderColor: "#EB7970" }],
    ["Integration", { className: "tagIntegration", borderColor: "#6DD4A5" }],
    ["Reporting", { className: "tagReporting", borderColor: "#6DD7F1" }],
    ["AI", { className: "tagAI", borderColor: "#9F95F4" }],
    ["Developer Experience", { className: "tagDeveloperExperience", borderColor: "#FFC270" }],
  ]);

  // Get the first tag's style info for the border
  const firstTagStyle = tag.length > 0 ? categoryStyleMap.get(tag[0].value) : null;
  const firstTagBorderColor = firstTagStyle?.borderColor || null;

  return (
    <Link 
      to={link} 
      className={clsx(styles.card, styles[module])} 
      style={{
        backgroundColor: backgroundColorCard,
        '--tag-border-color': firstTagBorderColor
      } as React.CSSProperties}
    >
      <div className={styles.tag}>
        {tag.length > 0 &&
          tag.map((tagItem: tag, index) => {
            const categoryStyle = categoryStyleMap.get(tagItem.value);
            const colorSet = colorMap.get(tagItem.color);

            // Use category class if available, otherwise fall back to inline styles
            if (categoryStyle) {
              return (
                <p key={index} className={styles[categoryStyle.className]}>
                  {tagItem.value}
                </p>
              );
            }

            // Fallback to inline styles for legacy color codes
            const textColorTag = colorSet ? colorSet.textColor : tagItem.textColor;
            const backgroundColorTag = colorSet ? colorSet.color : tagItem.color;

            return (
              <p
                key={index}
                style={{
                  color: textColorTag,
                  backgroundColor: backgroundColorTag,
                }}
              >
                {tagItem.value}
              </p>
            );
          })}
      </div>
      <h4 style={{ color: backgroundColorCard ? ' var(--ifm-link-color)' : '' }}>{title}</h4>

      <p style={{ color: backgroundColorCard ? 'black' : '' }}>{description}</p>
    </Link>
  );
};

export default HorizonCard;
