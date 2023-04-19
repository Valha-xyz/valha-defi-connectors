export function checkParam (param: string) {

  try {
    var argv = require('minimist')(process.argv.slice(2), {string: ["pool"]});
    return { arg: argv[param], err: null }
  } catch (err) {
    return { arg: null, err }
  }
}