if(typeof window !=='undefined')console.error('You SHOULD NOT require proxy-table.js in client-side js!!!');
module.exports = {
  a1: {
    portal: "http://a1-api.{{host}}.com"
  },
  a2: {
    portal: "http://a2-api.{{host}}.com"
  },
  a3: {
    portal: "http://a3-api.{{host}}.com"
  },
  prod: {
    portal: "http://api.{{host}}.com"
  }
}
