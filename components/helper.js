import _ from 'lodash';

export const getGlobalPadding = value => {
    return value ? { paddingLeft: `${value}px`, paddingRight: `${value}px`, boxSizing: `border-box` } : {};
};

export const getRefWidth = ref => _.get(ref, `current.offsetWidth`, 0)
export const getRefHeight = ref => _.get(ref, `current.offsetWidth`, 0)