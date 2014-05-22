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

/* global describe, it*/

var virgilio = require('./discovery');

describe('discovery tests', function() {
    it('shows services for a non-logged-in user', function(done) {
        virgilio.execute('http.getRoutes')
            .then(function(response) {
                response.must.eql(['/test']);
                done();
            })
            .done();
    });
    it('shows services for a logged in user', function(done) {
        virgilio.execute('http.getRoutes', 'admin')
            .then(function(response) {
                response.must.contain('/test');
                response.must.contain('/foo');
                response.must.have.length(2);
                done();
            })
            .done();
    });
});
