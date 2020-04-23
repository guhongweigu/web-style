import _ from 'lodash';

const filters = {
  getName(object) {
    const { data, searchItem } = object;
    return _.get(data, searchItem) === undefined ? '' : _.get(data, searchItem);
  },
};

export default filters;
