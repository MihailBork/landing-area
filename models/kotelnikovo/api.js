import api from 'api';

const projectName = `kotelnikovo`;

export const getChildWorks = () => api.get(`/${projectName}/getChildWorks`);
export const getArchitectWorks = () => api.get(`/${projectName}/getArchitectWorks`);
