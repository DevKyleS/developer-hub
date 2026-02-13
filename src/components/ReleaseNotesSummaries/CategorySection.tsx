import React from 'react';
import { ModuleSummaryCard, ModuleSummaryData } from './ModuleSummaryCard';
import styles from './styles.module.scss';

export interface CategoryData {
  name: string;
  modules: ModuleSummaryData[];
}

export interface CategorySectionProps {
  category: CategoryData;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  if (!category.modules || category.modules.length === 0) {
    return null;
  }

  return (
    <section className={styles.categorySection} id={category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}>
      <h2 className={styles.categoryTitle}>{category.name}</h2>
      <div className={styles.modulesGrid}>
        {category.modules.map((module) => (
          <ModuleSummaryCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
};
