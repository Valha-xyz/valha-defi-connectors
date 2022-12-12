async function checkWombatV1Share() {
  try {
    return { data: 1, err: null };
  } catch (err) {
    console.log(err);
    return { data: null, err: err };
  }
}

module.exports = checkWombatV1Share;
