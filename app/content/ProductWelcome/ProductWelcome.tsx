import Image from 'next/image';
import styles from './product-welcome.module.scss';
import { openInNewTab } from '@/app/utils/common';

type ProductWelcomeProps = {
  variant: 'kosh' | 'supertrips';
  logo: string;
  brand: string;
  eyebrow: string;
  title: string;
  intro: string;
  cta: {
    label: string;
    href: string;
  };
  highlights: Array<{
    label: string;
    value: string;
  }>;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

export const ProductWelcome = ({
  variant,
  logo,
  brand,
  eyebrow,
  title,
  intro,
  cta,
  highlights,
  sections,
}: ProductWelcomeProps) => (
  <div className={`${styles.container} ${styles[variant]}`}>
    <article className={styles.card}>
      <header className={styles.hero}>
        <div className={styles.brand_row}>
          <Image src={logo} alt={`${brand} logo`} width={40} height={40} />
          <div>
            <p>{eyebrow}</p>
            <strong>{brand}</strong>
          </div>
        </div>
        <h2>{title}</h2>
        <p className={styles.intro}>{intro}</p>
        <button type='button' onClick={() => openInNewTab(cta.href)}>
          {cta.label}
        </button>
      </header>

      <section className={styles.highlights} aria-label={`${brand} highlights`}>
        {highlights.map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </section>

      <section className={styles.sections} aria-label={`${brand} onboarding`}>
        {sections.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </article>
  </div>
);
