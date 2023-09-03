import { Metadata } from 'next';
import metaData from '@config/metaData';

// TODO: SEO
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: `Blog | ${metaData.title}`,
};

export default async function MainPage() {
  return <>Main</>;
}
