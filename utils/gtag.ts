import metaData from '@config/metaData';

declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}

type GTagPageView = {
  url: string;
  title: string;
};
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = ({ url, title }: GTagPageView) => {
  window.gtag('config', metaData.gaId, {
    page_path: url,
    page_title: title,
  });
};

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value: number;
};
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
