import metaData from '@config/metaData';

type PagesProps = {
  name: string;
  link: string;
  readonly isActive: boolean;
};

export const ROUTES = Object.freeze({
  BLOG: '/',
  BLOG_PAGE: '/page',
  SNIPPETS: '/snippets',
  ABOUT: '/about',
});

export const pages: PagesProps[] = [
  {
    name: 'Blog',
    link: ROUTES.BLOG,
    isActive: true,
  },
  { name: 'Snippets', link: ROUTES.SNIPPETS, isActive: metaData.isActive.snippets },
  {
    name: 'About',
    link: ROUTES.ABOUT,
    isActive: metaData.isActive.about,
  },
];
