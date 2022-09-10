import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

export const formatDate = (date: Date | string) => {
  return dayjs(date).format(DATE_FORMAT);
};
