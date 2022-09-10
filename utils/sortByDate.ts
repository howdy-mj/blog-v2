import { parseStringToDate } from '@utils/parseData';
import { Content } from '@utils/getFiles';

const dateSortDesc = (a: Date, b: Date) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

export const sortByLastModDate = (files: Content[]) => {
  return files.sort((prev, next) => {
    const hasLastMod = (file: Content) => !!file.frontMatter.lastMod;
    const prevDate = hasLastMod(prev)
      ? parseStringToDate(prev.frontMatter.lastMod)
      : parseStringToDate(prev.frontMatter.date);
    const nextDate = hasLastMod(next)
      ? parseStringToDate(next.frontMatter.lastMod)
      : parseStringToDate(next.frontMatter.date);
    return dateSortDesc(prevDate, nextDate);
  });
};

export const sortByDate = (files: Content[]) => {
  return files.sort((prev, next) => {
    return dateSortDesc(
      parseStringToDate(prev.frontMatter.date),
      parseStringToDate(next.frontMatter.date)
    );
  });
};
