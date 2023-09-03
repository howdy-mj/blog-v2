import { Metadata } from 'next';

// TODO: SEO
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: 'My Page Title',
};

export default async function MainPage() {
  return <>Main</>;
}
