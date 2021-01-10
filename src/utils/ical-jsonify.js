var _keyMap;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var NEW_LINE = /\r\n|\n|\r/;
var EVENT = 'VEVENT';
var EVENT_START = 'BEGIN';
var EVENT_END = 'END';
var START_DATE = 'DTSTART';
var END_DATE = 'DTEND';
var DESCRIPTION = 'DESCRIPTION';
var SUMMARY = 'SUMMARY';
var LOCATION = 'LOCATION';
var ATTENDEE = 'ATTENDEE';
var ALARM = 'VALARM';
var keyMap =
  ((_keyMap = {}),
  _defineProperty(_keyMap, START_DATE, 'startDate'),
  _defineProperty(_keyMap, END_DATE, 'endDate'),
  _defineProperty(_keyMap, DESCRIPTION, 'description'),
  _defineProperty(_keyMap, SUMMARY, 'summary'),
  _defineProperty(_keyMap, LOCATION, 'location'),
  _defineProperty(_keyMap, ATTENDEE, 'attendee'),
  _keyMap);

var clean = function clean(string) {
  return string;
  // return unescape(string).trim();
};

export default function jsonify(icsData) {
  var array = [];
  var currentObj = {};
  var lastKey = '';
  var lines = icsData.split(NEW_LINE);
  var isAlarm = false;

  for (var i = 0, iLen = lines.length; i < iLen; ++i) {
    var line = lines[i];

    // a way to start multiple line
    if (line.startsWith('"') && line.endsWith('"')) {
      line = line.substring(1, line.length - 1);
    }

    console.log(line);

    var lineData = line.split(':');

    if (lineData.length < 2) {
      // must not be a key and a value, append
      if (lastKey !== undefined && lastKey.length) {
        currentObj[lastKey] += clean(line);
      }
    }

    var key = lineData[0];
    var value = lineData[1];

    if (key.indexOf(';') !== -1) {
      var keyParts = key.split(';');
      key = keyParts[0]; // Maybe do something with that second part later
    }

    // here lineData.length >= 2
    if (key.startsWith(' ')) {
      if (lastKey !== undefined && lastKey.length) {
        currentObj[lastKey] += clean(line);
      }
      continue;
    } else {
      lastKey = keyMap[key];
    }

    switch (key) {
      case EVENT_START:
        if (value === EVENT) {
          currentObj = {};
        } else if (value === ALARM) {
          isAlarm = true;
        }

        break;

      case EVENT_END:
        isAlarm = false;
        if (value === EVENT) array.push(currentObj);
        break;

      case START_DATE:
        currentObj[keyMap[START_DATE]] = value;
        break;

      case END_DATE:
        currentObj[keyMap[END_DATE]] = value;
        break;

      case DESCRIPTION:
        if (!isAlarm) currentObj[keyMap[DESCRIPTION]] = clean(value);
        break;

      case SUMMARY:
        currentObj[keyMap[SUMMARY]] = clean(value);
        break;

      case LOCATION:
        currentObj[keyMap[LOCATION]] = clean(value);

      case ATTENDEE:
        currentObj[keyMap[ATTENDEE]] = [
          ...(currentObj[keyMap[ATTENDEE]] || []),
          clean(value),
        ];

      default:
        continue;
    }
  }

  return array;
}
