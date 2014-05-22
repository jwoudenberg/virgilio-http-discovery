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

module.exports = function virgilioHttpDiscovery(options) {
    var virgilio = this;
    var Promise = virgilio.Promise;
    var routes = [];
    var httpOptions = options.http || {};
    var authRoutes = httpOptions.authRoutes || {};

    virgilio
        .subscribe('http.newRoute', addRoute)
        .defineAction('http.getRoutes', getRoutes);

    function addRoute(path, method) {
        routes.push(path);
    }

    //Returns all the routes a user with a certain sessionId has access to.
    function getRoutes(sessionId) {
        var virgilio = this;
        return Promise.cast(routes)
            .bind(virgilio)
            .filter(function checkRouteAccess(path) {
                var virgilio = this;
                var authRouteInfo = authRoutes[path];
                if (!authRouteInfo) {
                    //This route requires no authentication.
                    return true;
                }
                else if (!sessionId) {
                    //Checking for a user that is not logged in.
                    return false;
                }
                return virgilio
                        .execute('auth.checkSession', sessionId, authRouteInfo)
                        .get('loggedIn');
            });
    }
};
