import api from 'api';

const projectName = `kotelnikovo`;

export const getWorksCount = ({ competition }) => api.get(`/${projectName}/getWorksCount?competition=${competition}`);
export const getWorksPage = ({ competition, page }) => api.get(
  `/${projectName}/getWorksPage?competition=${competition}&page=${page}`,
);
