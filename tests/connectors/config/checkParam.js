function checkParam(string, arg) {
  console.log(string, arg)
  try {
    const SPLIT = string.split(`--${arg}=`)[1];
    if (!SPLIT) {
      return { arg: null, err: null };
    }
    const endCharacter = SPLIT.indexOf('"');
    const param = SPLIT.substring(0, endCharacter);
    if (!param) {
      throw new Error(
        `You did not specify any name for your connector. 
           Run "npm run "test_name" -- --connector=name_of_your_connector"`,
      );
    }
    return { arg: param, err: null };
  } catch (err) {
    return { arg: null, err: err };
  }
}

module.exports = checkParam;
