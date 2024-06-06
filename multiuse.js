'use-strict';

var mue = {};
(async function () {
  await includeCDNSync('https://code.jquery.com/jquery-3.7.1.min.js');
  mue.includeCDNSync = includeCDNSync;
  mue.includeStyles = includeCDNSync;
  mue.encodeAndDecodeSpecialCharacters = encodeAndDecodeSpecialCharacters;
  mue.includeSelect2Styles = includeSelect2Styles;
  mue.requestTemplate = requestTemplate;
})();


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

function includeSelect2Styles() {
  const styles = `.select2-container { width: 100% !important; } .select2-container .select2-selection--multiple { border: 1px solid #CFD7DF !important; border-radius: 4px; box-shadow: inset 0 1px 2px 0 rgba(24, 50, 71, 0.05) !important; } .select2-container .select2-selection--multiple .select2-selection__rendered { display: block !important; } .select2-container li.select2-selection__choice { padding: 4px 6px 4px 9px !important; color: #12344D !important; border-radius: 4px !important; background-color: #EBEFF3 !important; font-size: 13px; font-weight: 600; line-height: 20px; border: 0 !important; margin: 4px 5px 4px 0; } .select2-container--focus .select2-selection, .select2-container--open .select2-selection { outline: 0 !important; background: #fff; border: 1px solid transparent !important; box-shadow: 0 0 0 2px #2c5cc5 !important; border-radius: 4px !important; } .select2-container span.select2-selection__choice__remove { float: right; margin: 0 0 0 12px !important; font-size: 17px; color: #183247 !important; position: relative; top: -1px; left: 0px; } .select2-container span.select2-dropdown { border: 0; padding: 8px; box-shadow: 0 2px 18px 0 rgba(18, 52, 77, .16), 0 2px 4px 0 rgba(18, 52, 77, .06); } .select2-container .select2-results__option[aria-selected=true] { background-color: #e5f2fd; color: #2c5cc5 !important; font-weight: 600; } .select2-container li.select2-results__option { cursor: pointer; padding: 6px 30px 7px 8px; font-size: 14px; border-radius: 4px; line-height: 1.3; margin: 5px 0; } .select2-container .select2-results__option--highlighted[aria-selected] { background-color: #ebeff2; color: rgb(24, 50, 71) !important; } span.select2-dropdown { padding: 8px; border: 0 !important; box-shadow: 0 2px 18px 0 rgba(18, 52, 77, .16), 0 2px 4px 0 rgba(18, 52, 77, .06); border-radius: 4px !important; position: relative; top: 2px; } .select2-container .select2-search__field { box-sizing: border-box; border: 1px solid #CFD7DF; border-radius: 4px; background-color: #FFFFFF; box-shadow: inset 0 1px 2px 0 rgba(24, 50, 71, 0.05); margin-top: 5px; } .select2-container .select2-search__field:hover { border: 1px solid #475867 !important; transition: .2s linear; } .select2-container .select2-search__field:focus { outline: 0 !important; background: #fff; border: 1px solid transparent !important; box-shadow: 0 0 0 2px #2c5cc5 !important; } .select2-selection--multiple .select2-search__field:focus { box-shadow: 0 0 0 0 !important; } .select2-selection--single { height: 32px !important; border: 1px solid #CFD7DF !important; border-radius: 4px !important; background-color: #FFFFFF !important; box-shadow: inset 0 1px 2px 0 rgba(24, 50, 71, 0.05); } .select2-selection--single .select2-selection__arrow { top: 4px !important; right: 5px !important; } .select2-container--default .select2-selection--single .select2-selection__rendered { line-height: 31px; } .select2-container--default .select2-selection--single .select2-selection__rendered { color: #12344D; font-size: 14px; font-weight: 500; }`
  includeStyles(styles);
}

function includeStyles(css) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

function includeCDNSync(src, opts = {}) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = function () {
      resolve();
    };
    script.src = src;
    for (let key in opts) {
      if (opts[key]) script[key] = opts[key];
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  })
}

const requestTemplate = async (templateName, opts = {}) => {
  try {
    if (!client) return console.error('Client is not found.');
    const { response } = await client.request.invokeTemplate(templateName, opts);
    return JSON.parse(response);
  } catch (error) {
    return {
      status: false,
      template: templateName,
      data: error
    };
  }
}