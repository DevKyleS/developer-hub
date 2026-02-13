import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.scss';

export interface Category {
  name: string;
  items: string[];
}

export interface ModuleSummaryData {
  id: string;
  title: string;
  last_updated: string;
  link: string;
  categories: Category[];
}

export interface ModuleSummaryCardProps {
  module: ModuleSummaryData;
}

export const ModuleSummaryCard: React.FC<ModuleSummaryCardProps> = ({ module }) => {
  const hasCategories = module.categories && module.categories.length > 0;

  return (
    <div className={styles.moduleSummaryCard} id={module.id}>
      <div className={styles.cardHeader}>
        <h2 className={styles.moduleTitle}>{module.title}</h2>
        <Link href={module.link} className={styles.viewFullLink}>
          View full release notes →
        </Link>
      </div>

      {module.last_updated && module.last_updated !== 'N/A' && (
        <span className={styles.lastUpdated}>
          Last updated {new Date(module.last_updated).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </span>
      )}

      {hasCategories && (
        <div className={styles.categoriesContainer}>
          {module.categories.map((category, catIndex) => {
            const sectionId = `${module.id}-${category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`;
            return (
              <div key={`category-${catIndex}`} className={styles.section} id={sectionId}>
                <div className={styles.sectionTitle}>{category.name}</div>
                <ul className={styles.bulletList}>
                  {category.items.map((item, itemIndex) => (
                    <li key={`item-${catIndex}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
