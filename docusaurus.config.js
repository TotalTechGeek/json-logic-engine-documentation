/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'JSON Logic Engine',
  tagline: 'For implementing safe & complex persistable logic.',
  url: 'https://jessemitchell.me',
  baseUrl: '/json-logic-engine/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TotalTechGeek', // Usually your GitHub org/user name.
  projectName: 'json-logic-engine', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'JSON Logic Engine',
      logo: {
        alt: 'JSON Logic Engine',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
      
        {
          href: 'https://github.com/TotalTechGeek/json-logic-engine',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Related',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/TotalTechGeek',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JSON-Logic-Engine Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-bootstrap',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/TotalTechGeek/json-logic-engine-documentation/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/TotalTechGeek/json-logic-engine-documentation/edit/master/website/blog/',
        },
      },
    ],
  ],
};
