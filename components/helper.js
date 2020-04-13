import _ from 'lodash';

export const getGlobalPadding = (value) => (
  value ? { paddingLeft: `${value}px`, paddingRight: `${value}px`, boxSizing: `border-box` } : {}
);

export const getRefWidth = (ref) => _.get(ref, `current.offsetWidth`, 0);
export const getRefHeight = (ref) => _.get(ref, `current.offsetWidth`, 0);

export const parseResponse = ({
  response,
  dataPath = `data`,
  normalize,
  defaultError = `Во время запроса произошла ошибка`,
}) => {
  const status = _.get(response, `status`);
  const responseError = _.get(response, `data.error`);
  const error = responseError || defaultError;
  if (status !== 200 || responseError) throw error;
  const data = _.get(response, `data.${dataPath}`);

  return _.isFunction(normalize) ? normalize(data) : data;
};

export const formatAge = (age) => {
  if (!age || !_.toString(age).length) return age;
  const lastSymbol = _.toString(age).substr(-1);
  const lastDigit = _.toFinite(lastSymbol);
  if (lastDigit === 1) return `${age} год`;
  return (lastDigit > 1 && lastDigit < 4) ? `${age} года` : `${age} лет`;
};

export const normalizeChildWorks = (items) => _.map(items, (item) => ({
  person: _.get(item, `name`),
  age: formatAge(_.get(item, `age`)),
  studyPlace: _.get(item, `study_place`),
  aboutWork: _.get(item, `work_about`),
  work: _.get(item, `work_file`),
}));

export const normalizeArchitectWorks = (items) => _.map(items, (item) => ({
  photo: _.get(item, `photo_file`),
  person: _.get(item, `name`),
  age: formatAge(_.get(item, `age`)),
  studyPlace: _.get(item, `study_place`),
  aboutWork: _.get(item, `work_about`),
  work: _.get(item, `work_file`),
}));
