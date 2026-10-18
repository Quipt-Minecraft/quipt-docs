// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QUIPT Documentation',
  tagline: 'High-utility, multi-platform runtime and developer framework for Minecraft & Discord ecosystems',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.quipt.qsmc.live',
  baseUrl: '/',

  organizationName: 'Quipt-Minecraft',
  projectName: 'quipt',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Quipt-Minecraft/quipt/tree/master/documentation/',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/quipt-social-card.jpg',
      navbar: {
        title: 'QUIPT',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/Quipt-Minecraft/quipt',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://modrinth.com/plugin/QUIPT',
            label: 'Modrinth',
            position: 'right',
          },
          {
            href: 'https://discord.gg/EhfMJmjTXh',
            label: 'Discord Community',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Architecture',
                to: '/architecture',
              },
              {
                label: 'Core Runtime',
                to: '/core/lifecycle-and-runtime',
              },
            ],
          },
          {
            title: 'Services & Infrastructure',
            items: [
              {
                label: 'API Service',
                href: 'https://api.qsmc.live',
              },
              {
                label: 'Jenkins CI',
                href: 'https://ci.qsmc.live',
              },
              {
                label: 'Nexus Maven Repo',
                href: 'https://repo.qsmc.live',
              },
            ],
          },
          {
            title: 'Community & Support',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/EhfMJmjTXh',
              },
              {
                label: 'GitHub Issues',
                href: 'https://github.com/Quipt-Minecraft/quipt/issues',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Modrinth',
                href: 'https://modrinth.com/plugin/QUIPT',
              },
              {
                label: 'Repository',
                href: 'https://github.com/Quipt-Minecraft/quipt',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QuickScythe. Built with Docusaurus for optimal community productivity and clarity.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['java', 'groovy', 'json', 'yaml', 'bash', 'properties', 'toml'],
      },
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
    }),
};

module.exports = config;
