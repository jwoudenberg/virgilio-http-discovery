// Copyright (C) 2014 IceMobile Agency B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var options = {
    http: {
        authRoutes: {
            '/foo': 'admin',
            '/bar': 'user'
        }
    },
    //Disable logging (it's annoying when testing).
    logger: {
        name: 'virgilio',
        streams: []
    }
};
module.exports = require('virgilio')(options)
    //reguire virgilio-http-discovery.
    .loadModule(require('../'))
    //Ordinarily, the auth.checkSession would be provided by an
    //authentication extension. For testing purposes we define
    //a simple one ourselves.
    .defineAction('auth.checkSession', checkSession)
    //Ordinarily, http.newRoute will be called by a http module.
    //For testing purposes we call it here ourselves.
    .publish('http.newRoute', '/foo')
    .publish('http.newRoute', '/bar')
    .publish('http.newRoute', '/test');

function checkSession(sessionId, authRouteInfo) {
    var result = (sessionId === authRouteInfo);
    var response = {
        result: result,
        reason: result ? null : 'fail'
    };
    return response;
}
