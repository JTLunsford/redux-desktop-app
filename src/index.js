const redux = require('redux')
const ironbeam = require('iron-beam')
const reducer = require('./reducer')
const createLogger = require('redux-logger')
const loggerConfig = require('./logger.json')
loggerConfig.logger = console
const logger = createLogger(loggerConfig)

class app extends ironbeam.EventEmitter {
    constructor() {
        super()
        this.state = redux.createStore(reducer, redux.applyMiddleware(logger))
        this.state.subscribe(() => {
            let state = this.state.getState()
            this[state.step](state)
        })
    }

    checkDefaults() {
        //TODO: Check in commondata folder has has data, if not copy in defaults
        this.state.dispatch({type: 'LAUNCH'})
    }

    launch() {
        //TODO: Launch the app, keep the pid for kills,
        //also add listeners for stdout and listen for idles,
        //after kills, remember to clean up listeners(memory leaks)
        this.state.dispatch({type: 'DOWNLOAD_CONFIG'})
    }

    getConfig() {
        //TODO: download config, check version, send list and urls to next step
        this.state.dispatch({type: 'DOWNLOAD_NEW_FILES', downloads: [] })
    }

    getFiles(state) {
        //TODO: download all the urls and if successful report to state
        console.log(state.downloads)
        this.state.dispatch({type: 'UPDATE_FILES', updates: [] })
    }

    updateFiles(state) {
        //TODO: move the cached files to the 'latest' locations, be aware of user experience interuptions
        console.log(state.updates)
    }
}

const launcher = new app()

let commonDataFolder
if(process.env.LIFECYCLE === 'dev'){
  commonDataFolder = './temp/'
}
else {
  commonDataFolder = process.env.ALLUSERSPROFILE
}

launcher.state.dispatch({
  type: 'START',
  commonDataFolder
})
