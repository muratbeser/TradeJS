const Application = require('spectron').Application;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

var electronPath = '';

if (/^win/.test(process.platform)) {
    electronPath = path.join(__dirname, '..', '..', 'dist', 'win-unpacked', 'TradeJS.exe');
} else if (/^darwin/.test(process.platform)) {
    electronPath = path.join(__dirname, '..', '..', 'dist', 'mac', 'TradeJS.app', 'Contents', 'MacOS', 'TradeJS');
} else if (/^linux/.test(process.platform)) {
    electronPath = path.join(__dirname, '..', '..', 'dist', 'linux-unpacked', 'tradejs');
}

// if (process.platform === 'win32') {
//     electronPath += '.cmd';
// }

var appPath = path.join(__dirname, '..');

var app = new Application({
    path: electronPath,
    args: [appPath, 'NODE_ENV=development']
});

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('Window', function () {
    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

    it('opens a window', function () {
        return app.client.waitUntilWindowLoaded()
            .getWindowCount().should.eventually.equal(1);
    });

    it('tests the title', function () {
        return app.client.waitUntilWindowLoaded()
            .getTitle().should.eventually.equal('TradeJS - Practise');
    });
});

describe('Server Connection', function () {
    beforeEach(function () {
        return app.start()
    });

    afterEach(function () {
        return app.stop();
    });

    it('connects to server', function () {
        return app.client.waitUntilWindowLoaded()
            .waitForExist('#debugContainer .circle.ok', 5000);
    });

    // it('shows server connection error link that opens login screen', function () {
    //     return app.client.waitUntilWindowLoaded()
    //         .setNetworkConnection(1) // airplane mode off, wifi off, data off
    //         .waitForExist('#debugContainer status .circle.error', 5000)
    //         .getText('#debugContainer .error-message').should.eventually.equal('No server connection');
    // });
});

describe('Charts', function () {

    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

    it('can open a chart', function () {
        return app.client.waitUntilWindowLoaded()
            .waitForExist('.instrument-list-rows-wrapper tr:first-child', 5000)
            .click('.instrument-list-rows-wrapper tr:first-child td:first-child')
            .waitForExist('.chart-overview-container chart-box', 5000);
    });

    // it('shows server connection error link that opens login screen', function () {
    //     return app.client.waitUntilWindowLoaded()
    //         .setNetworkConnection(1) // airplane mode off, wifi off, data off
    //         .waitForExist('#debugContainer status .circle.error', 5000)
    //         .getText('#debugContainer .error-message').should.eventually.equal('No server connection');
    // });
});

describe('Backtest', function () {

    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

    it('can resize the debugger', function () {
        return app.client.waitUntilWindowLoaded();
    });

    // it('shows server connection error link that opens login screen', function () {
    //     return app.client.waitUntilWindowLoaded()
    //         .setNetworkConnection(1) // airplane mode off, wifi off, data off
    //         .waitForExist('#debugContainer status .circle.error', 5000)
    //         .getText('#debugContainer .error-message').should.eventually.equal('No server connection');
    // });
});

describe('Editor', function () {

    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

    it('can open a chart', function () {
        return app.client.waitUntilWindowLoaded()
    });

    // it('shows server connection error link that opens login screen', function () {
    //     return app.client.waitUntilWindowLoaded()
    //         .setNetworkConnection(1) // airplane mode off, wifi off, data off
    //         .waitForExist('#debugContainer status .circle.error', 5000)
    //         .getText('#debugContainer .error-message').should.eventually.equal('No server connection');
    // });
});

describe('Editor', function () {

    beforeEach(function () {
        return app.start();
    });

    afterEach(function () {
        return app.stop();
    });

    it('Can open the editor window', function () {
        return app.client.waitUntilWindowLoaded()
            .waitForExist('.instrument-list-rows-wrapper tr:first-child', 5000)
            .click('.instrument-list-rows-wrapper tr:first-child td:first-child')
            .waitForExist('.chart-overview-container chart-box', 5000);
    });

    // it('shows server connection error link that opens login screen', function () {
    //     return app.client.waitUntilWindowLoaded()
    //         .setNetworkConnection(1) // airplane mode off, wifi off, data off
    //         .waitForExist('#debugContainer status .circle.error', 5000)
    //         .getText('#debugContainer .error-message').should.eventually.equal('No server connection');
    // });
});
