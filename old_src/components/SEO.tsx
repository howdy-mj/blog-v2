import Head from 'next/head';
import { useRouter } from 'next/router';
import metaData from '@config/metaData';
import { formatDate } from '@utils/formatDate';

type CommonSEOProps = {
  title: string;
  description?: string;
  ogImage?: string;
  twImage?: string;
  ogType: 'website' | 'article';
  canonicalUrl?: string;
};

const CommonSEO = ({
  title,
  description,
  ogImage,
  twImage,
  ogType,
  canonicalUrl,
}: CommonSEOProps) => {
  const router = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${metaData.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={metaData.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={ogImage} key={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={metaData.sns.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${metaData.siteUrl}${router.asPath}`}
      />
    </Head>
  );
};

type PageSEROProps = {
  title: string;
  description?: string;
};

export const PageSEO = ({ title, description }: PageSEROProps) => {
  const ogImageUrl = metaData.siteUrl + metaData.socialBanner;
  const twImageUrl = metaData.siteUrl + metaData.socialBanner;
  return (
    <CommonSEO
      title={title}
      description={description || metaData.description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  );
};

type BlogSEOProps = {
  title: string;
  date: string;
  summary: string;
  thumbnailUrl?: string;
  lastModifiedDate?: string;
  canonicalUrl: string;
};

export const BlogSEO = ({
  title,
  summary,
  date,
  thumbnailUrl,
  lastModifiedDate: _lastModifiedDate,
  canonicalUrl,
}: BlogSEOProps) => {
  const publishedDate = formatDate(date);
  const lastModifiedDate = _lastModifiedDate && formatDate(_lastModifiedDate);

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={thumbnailUrl}
        twImage={thumbnailUrl}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedDate} />}
        {_lastModifiedDate && <meta property="article:modified_time" content={lastModifiedDate} />}
      </Head>
    </>
  );
};
