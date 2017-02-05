'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var redux = require('redux');
var ironbeam = require('iron-beam');
var reducer = require('./reducer');
var createLogger = require('redux-logger');
var loggerConfig = require('./logger.json');
loggerConfig.logger = console;
var logger = createLogger(loggerConfig);

var app = function (_ironbeam$EventEmitte) {
    _inherits(app, _ironbeam$EventEmitte);

    function app() {
        _classCallCheck(this, app);

        var _this = _possibleConstructorReturn(this, (app.__proto__ || Object.getPrototypeOf(app)).call(this));

        _this.state = redux.createStore(reducer, redux.applyMiddleware(logger));
        _this.state.subscribe(function () {
            var state = _this.state.getState();
            _this[state.step](state);
        });
        return _this;
    }

    _createClass(app, [{
        key: 'checkDefaults',
        value: function checkDefaults() {
            //TODO: Check in commondata folder has has data, if not copy in defaults
            this.state.dispatch({ type: 'LAUNCH' });
        }
    }, {
        key: 'launch',
        value: function launch() {
            //TODO: Launch the app, keep the pid for kills,
            //also add listeners for stdout and listen for idles,
            //after kills, remember to clean up listeners(memory leaks)
            this.state.dispatch({ type: 'DOWNLOAD_CONFIG' });
        }
    }, {
        key: 'getConfig',
        value: function getConfig() {
            //TODO: download config, check version, send list and urls to next step
            this.state.dispatch({ type: 'DOWNLOAD_NEW_FILES', downloads: [] });
        }
    }, {
        key: 'getFiles',
        value: function getFiles(state) {
            //TODO: download all the urls and if successful report to state
            console.log(state.downloads);
            this.state.dispatch({ type: 'UPDATE_FILES', updates: [] });
        }
    }, {
        key: 'updateFiles',
        value: function updateFiles(state) {
            //TODO: move the cached files to the 'latest' locations, be aware of user experience interuptions
            console.log(state.updates);
        }
    }]);

    return app;
}(ironbeam.EventEmitter);

var launcher = new app();

var commonDataFolder = void 0;
if (process.env.LIFECYCLE === 'dev') {
    commonDataFolder = './temp/';
} else {
    commonDataFolder = process.env.ALLUSERSPROFILE;
}

launcher.state.dispatch({
    type: 'START',
    commonDataFolder: commonDataFolder
});