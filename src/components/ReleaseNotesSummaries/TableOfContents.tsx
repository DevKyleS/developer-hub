import React from 'react';
import { CategoryData } from './CategorySection';
import styles from './toc.module.scss';

interface TableOfContentsProps {
  categories: CategoryData[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ categories }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const getCategoryId = (categoryName: string) => {
    return categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  };

  return (
    <div className={styles.tableOfContents}>
      <div className={styles.tocHeader}>On this page</div>
      <ul className={styles.tocList}>
        {categories.map((category) => {
          const categoryId = getCategoryId(category.name);
          return (
            <li key={category.name} className={styles.tocCategory}>
              <a
                href={`#${categoryId}`}
                className={styles.tocCategoryHeader}
                onClick={(e) => scrollToSection(e, categoryId)}
              >
                {category.name}
              </a>
              {category.modules && category.modules.length > 0 && (
                <ul className={styles.tocModuleList}>
                  {category.modules.map((module) => (
                    <li key={module.id} className={styles.tocModule}>
                      <a
                        href={`#${module.id}`}
                        className={styles.tocModuleLink}
                        onClick={(e) => scrollToSection(e, module.id)}
                      >
                        {module.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
