import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const ServiceList = [
  {
    title: 'API Service',
    href: 'https://api.qsmc.live',
    linkText: 'Access API Gateway',
    description: (
      <>
        Central REST and webhook backend infrastructure managing real-time telemetry,
        charity campaign synchronization (ExtraLife, Tiltify), and service orchestration.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="13 14 17 10 13 6" />
      </svg>
    ),
  },
  {
    title: 'Jenkins CI',
    href: 'https://ci.qsmc.live',
    linkText: 'View Build Pipelines',
    description: (
      <>
        Automated continuous integration and build orchestration cluster executing compile checks,
        automated test suites, and multi-module artifact delivery.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    title: 'Nexus Maven Repo',
    href: 'https://repo.qsmc.live',
    linkText: 'Browse Repositories',
    description: (
      <>
        Dedicated Sonatype Nexus artifact repository hosting official releases, snapshots,
        and dependency packages for Gradle and Maven builds.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const FeatureList = [
  {
    title: 'Multi-Platform Parity',
    to: '/architecture',
    linkText: 'Explore Architecture',
    description: (
      <>
        Unified abstractions and shared APIs across Paper, Fabric, Velocity, and standalone
        Discord bot runtimes for seamless multi-environment deployments.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: 'Embedded Services & Configs',
    to: '/core/lifecycle-and-runtime',
    linkText: 'View Core Runtime',
    description: (
      <>
        In-process Jetty HTTP server container, dynamic reflection-driven configurations (JSON/YAML/TOML/QPT),
        and prioritized asynchronous event bus.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Developer Tooling & Automation',
    to: '/developer/api-reference',
    linkText: 'API & Developer Guide',
    description: (
      <>
        Git-synced resource pack server, fluent Brigadier command builders, Adventure text formatting,
        and extensible Discord bot plugin loading.
      </>
    ),
    icon: (
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

function CardItem({title, description, icon, href, to, linkText}) {
  return (
    <div className={clsx('col col--4', styles.cardCol)}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>{icon}</div>
        <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
        <p className={styles.cardDescription}>{description}</p>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}>
            {linkText || 'Open Link'} &rarr;
          </a>
        ) : (
          <Link to={to} className={styles.actionLink}>
            {linkText || 'Learn More'} &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={clsx('text--center', styles.sectionHeader)}>
            <Heading as="h2" className={styles.sectionTitle}>
              Infrastructure &amp; Ecosystem Services
            </Heading>
            <p className={styles.sectionSubtitle}>
              Connected infrastructure powering development, automated builds, and server integrations
            </p>
          </div>
          <div className="row">
            {ServiceList.map((props, idx) => (
              <CardItem key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={clsx('text--center', styles.sectionHeader)}>
            <Heading as="h2" className={styles.sectionTitle}>
              Framework Capabilities
            </Heading>
            <p className={styles.sectionSubtitle}>
              High-performance modular utilities built for modern Minecraft networks
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <CardItem key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
