function encodeAndDecodeSpecialCharacters(str = "", type = "en") {  // en for encode & other than en for decode
  const reverseAsciiValues = { "!": "33", "#": "35", "$": "36", "% ": "37", " & ": "38", "\'": "39", "(": "40", ")": "41", "+": "43", ",": "44", "-": "45", "/": "47", ":": "58", ";": "59", "<": "60", "=": "61", ">": "62", "?": "63", "@": "64", "[": "91", "\\\\": "92", "]": "93", "^": "94", "_": "95", "`": "96", "{": "123", "|": "124", "}": "125", "~": "126" }

  let result = str;
  let temp;

  if (type === 'en') {
    for (const itr of str) {
      if (reverseAsciiValues[itr]) {
        if (itr === '?') {
          temp = /\?/g;
        } else {
          temp = new RegExp(itr, 'g');
        }
        result = result.replace(temp, `___${reverseAsciiValues[itr]}___`);
      }
    }
  } else {
    for (const itr in reverseAsciiValues) {
      temp = `___${reverseAsciiValues[itr]}___`;
      result = result.replace(new RegExp(`${temp}`, 'g'), itr);
    }
  }
  return result;
}
