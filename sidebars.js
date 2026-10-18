// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'intro',
        'architecture',
        'installation',
      ],
    },
    {
      type: 'category',
      label: 'Core Subsystems',
      collapsed: false,
      items: [
        'core/lifecycle-and-runtime',
        'core/embedded-server',
        'core/configuration-system',
        'core/event-bus',
        'core/heartbeat-scheduling',
        'core/registries-data',
        'core/discord-webhooks',
        'core/charity-engine',
      ],
    },
    {
      type: 'category',
      label: 'Platform Modules',
      collapsed: false,
      items: [
        'modules/paper',
        'modules/fabric',
        'modules/velocity',
        'modules/discord-bot',
        'modules/common',
      ],
    },
    {
      type: 'category',
      label: 'Features & Utilities',
      collapsed: false,
      items: [
        'features/resource-pack-server',
        'features/command-system',
        'features/chat-placeholders',
        'features/party-system',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guides & API',
      collapsed: false,
      items: [
        'developer/creating-bot-plugins',
        'developer/custom-commands',
        'developer/custom-configs',
        'developer/extending-charity',
        'developer/api-reference',
      ],
    },
    {
      type: 'category',
      label: 'Operations & Build',
      collapsed: true,
      items: [
        'operations/building-and-publishing',
        'operations/production-security',
      ],
    },
  ],
};

module.exports = sidebars;
