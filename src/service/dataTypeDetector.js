const _ = require('lodash');

const detectType = (input) => {
  if (_.isArray(input)) return 'ARRAY';
  if (typeof input === 'boolean') return 'BOOLEAN';
  if (typeof input === 'object') return 'OBJECT';
  if (typeof input === 'string' &&
    input.substr(0, 8) === '[string]') return 'STRING';
  const dateReg = /(\d{4})(-)(\d{1,2})(-)(\d{1,2})/;
  const fractionReg = /^(\d+)[\/|\\](\d+)$/;
  const urlReg = /(https:\/\/)+/;
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (dateReg.test(input)) return 'DATE';
  if (fractionReg.test(input)) return 'FRACTION';
  if (urlReg.test(input)) return 'URL';
  if (emailReg.test(input)) return 'EMAIL';
  return 'STRING';
};

export default detectType;
