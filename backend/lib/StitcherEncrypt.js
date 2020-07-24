// Based on https://gitlab.com/adduc-projects/stitcher-password

export const encrypt = (deviceID, password) => {
  const sequence =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  const passwordLength = password.length;
  const deviceIdLength = deviceID.length;
  const sequenceLength = sequence.length;
  var counter = 0;
  var result = '';

  while (counter < passwordLength) {
    let passwordCodePoint = ord(password[counter]);
    let bits = passwordCodePoint - ((passwordCodePoint >> 4) << 4);
    let deviceIdPos = (counter * 2) % deviceIdLength;
    let sequencePos =
      ((passwordCodePoint >> 4) + ord(deviceID[deviceIdPos])) % sequenceLength;
    result += sequence[sequencePos];
    deviceIdPos = (counter * 2 + 1) % deviceIdLength;
    sequencePos = (bits + ord(deviceID[deviceIdPos])) % sequenceLength;
    result += sequence[sequencePos];
    counter += 1;
  }
  return result;
};

export const decrypt = (deviceID, encryptedPassword) => {
  const sequence =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  const encryptedPasswordLength = encryptedPassword.length;
  const deviceIdLength = deviceID.length;
  const sequenceLength = sequence.length;

  var result = '';

  for (var counter = 0; counter < encryptedPasswordLength; counter += 2) {
    let sequencePos = strpos(sequence, encryptedPassword[counter]);
    let deviceIdPos = deviceID[counter % deviceIdLength];
    let piece_1 = sequencePos + sequenceLength - ord(deviceIdPos);
    piece_1 = piece_1 % sequenceLength << 4;

    deviceIdPos = deviceID[(counter + 1) % deviceIdLength];
    sequencePos = strpos(sequence, encryptedPassword[counter + 1]);
    let piece_2 = (sequencePos + sequenceLength - ord(deviceIdPos)) % 16;

    result += String.fromCharCode(piece_1 + piece_2);
  }

  return result;
};

function ord(str) {
  return str.charCodeAt(0);
}

function strpos(haystack, needle, offset) {
  var i = (haystack + '').indexOf(needle, offset || 0);
  return i === -1 ? false : i;
}
