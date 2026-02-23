import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { tag } from "../data/roadmapData";
import type { ModuleTheme } from "../data/roadmapPalette";
import { getPillColors, getCardHoverBorderColor } from "../data/roadmapPalette";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";

type HorizonCardProps = {
  title: string;
  description: string;
  tag: tag[];
  module: string;
  link?: string;
  backgroundColorCard?: string;
  moduleTheme: ModuleTheme;
};

const HorizonCard = ({
  title,
  description,
  tag,
  module: moduleKey,
  link,
  backgroundColorCard,
  moduleTheme,
}: HorizonCardProps) => {
  const { colorMode } = useColorMode();
  const mode = colorMode === "dark" ? "dark" : "light";
  const modulePalette = moduleTheme.palette[mode];

  const firstTagValue = tag.length > 0 ? tag[0].value : null;
  const firstTagStyle =
    firstTagValue !== null
      ? getPillColors(firstTagValue, mode, modulePalette)
      : null;
  const tagBorderColor = getCardHoverBorderColor(firstTagValue, firstTagStyle);

  const hasValidLink = link != null && link.length > 0;
  const cardClassName = clsx(styles.card, styles[moduleKey]);
  const cardStyle = {
    backgroundColor: backgroundColorCard,
    "--tag-border-color": tagBorderColor,
  } as React.CSSProperties;

  const cardContent = (
    <>
      <div className={styles.tag}>
        {tag.length > 0 &&
          tag.map((tagItem: tag, index) => {
            const { bg, text } = getPillColors(
              tagItem.value,
              mode,
              modulePalette
            );
            return (
              <p
                key={index}
                style={{
                  backgroundColor: bg,
                  color: text,
                }}
              >
                {tagItem.value}
              </p>
            );
          })}
      </div>
      <h4 style={{ color: backgroundColorCard ? "var(--ifm-link-color)" : "" }}>
        {title}
      </h4>
      <p style={{ color: backgroundColorCard ? "black" : "" }}>{description}</p>
    </>
  );

  if (hasValidLink) {
    return (
      <Link to={link} className={cardClassName} style={cardStyle}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={cardClassName} style={cardStyle}>
      {cardContent}
    </div>
  );
};

export default HorizonCard;
