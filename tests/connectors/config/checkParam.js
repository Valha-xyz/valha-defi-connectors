function checkParam () {


  try {
    var argv = require('minimist')(process.argv.slice(2));
    if(!argv.connector){
      throw new Error(
        `You did not specify any name for your connector. 
           Run "npm run "test_name" -- --connector=name_of_your_connector"`
      )
    }
    return { arg: argv.connector, err: null }
  } catch (err) {
    return { arg: null, err }
  }
}

module.exports = checkParam
