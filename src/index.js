import X2JS from './externals/xml2json';
import StringMatcher from './matchers/StringMatcher';
import DurationMatcher from './matchers/DurationMatcher';
import DateTimeMatcher from './matchers/DateTimeMatcher';
import NumericMatcher from './matchers/NumericMatcher';

const matchers = [
  new DurationMatcher(),
  new DateTimeMatcher(),
  new NumericMatcher(),
  new StringMatcher()   // last in list to take precedence over NumericMatcher
];

const converter = new X2JS({
  escapeMode:         false,
  attributePrefix:    '',
  arrayAccessForm:    'property',
  emptyNodeForm:      'object',
  stripWhitespaces:   false,
  enableToStringFunc: true,
  ignoreRoot:         true,
  matchers:           matchers
}); 

const parse = (data, baseUri) => {
  const manifest = converter.xml_str2json(data);

  manifest.protocol = 'DASH';

  manifest.baseUri = baseUri;

  manifest.loadedTime = new Date();

  return manifest;
}

const load = (url, { methods = 'GET', headers } = {}) => {
  
  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.headers && Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })

    xhr.onload = () => {
      const baseUri = url.replace(/([^\/])+?$/, '')
      const manifest = parse(xhr.responseText, baseUri)
      resolve(manifest)
    }
    
    xhr.onerror = (e) => {
      reject(e)
    }

    xhr.open(methods, url, true);

    xhr.send();

  });

}


export default {
  parse,
  load
}