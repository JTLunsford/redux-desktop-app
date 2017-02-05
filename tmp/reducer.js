'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'START':
      return _extends({}, state, {
        commonDataFolder: action.commonDataFolder,
        step: 'checkDefaults'
      });
      break;
    case 'LAUNCH':
      return _extends({}, state, {
        step: 'launch'
      });
      break;
    case 'DOWNLOAD_CONFIG':
      return _extends({}, state, {
        step: 'getConfig'
      });
      break;
    case 'DOWNLOAD_NEW_FILES':
      return _extends({}, state, {
        downloads: action.downloads,
        step: 'getFiles'
      });
      break;
    case 'UPDATE_FILES':
      return _extends({}, state, {
        updates: action.updates,
        step: 'updateFiles'
      });
      break;
    default:
      return _extends({}, state, {
        step: 'BAD_ACTION'
      });
  }
  return state;
};