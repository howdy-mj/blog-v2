import React from 'react';
import metaData from '@config/metaData';

const GoogleAnalytics = () => {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${metaData.gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${metaData.gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
