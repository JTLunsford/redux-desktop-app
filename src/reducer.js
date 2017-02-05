module.exports = (state = {}, action) => {
  switch (action.type) {
    case 'START':
        return {
          ...state,
          commonDataFolder: action.commonDataFolder,
          step: 'checkDefaults'
        }
      break;
    case 'LAUNCH':
        return {
          ...state,
          step: 'launch'
        }
      break;
    case 'DOWNLOAD_CONFIG':
        return {
          ...state,
          step: 'getConfig'
        }
      break;
    case 'DOWNLOAD_NEW_FILES':
        return {
          ...state,
          downloads: action.downloads,
          step: 'getFiles'
        }
      break;
    case 'UPDATE_FILES':
        return {
          ...state,
          updates: action.updates,
          step: 'updateFiles'
        }
      break;
    default:
      return {
        ...state,
        step: 'BAD_ACTION'
      }
  }
  return state
}
