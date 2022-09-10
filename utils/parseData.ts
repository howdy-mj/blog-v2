export const parseStringToDate = (date: string | undefined) => {
  if (date === undefined) {
    return new Date();
  }
  return new Date(date);
};

export const removeHtmlTagFromString = (htmlString: string) => {
  return htmlString.replace(/(<([^>]+)>)/gi, '');
};
