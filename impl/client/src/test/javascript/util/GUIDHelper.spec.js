/*!
 * Copyright 2010 - 2017 Hitachi Vantara.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
define(["cdf/lib/Base", "common-ui/util/GUIDHelper"], function(Base, GUIDHelper) {

  describe("GUIDHelper", function() {

    var guidHelper = new GUIDHelper();

    it("should generate a valid GUID", function() {
      var guid = guidHelper.generateGUID();
      expect(guid).toBeDefined();
      expect(guid >= 0).toBeTruthy();
      expect(guid).toBeLessThan(100000);
    });

    it("should reset the list of assigned guids", function() {
      guidHelper.reset();
      expect(guidHelper._assignedGUIDs).toEqual({});
    });

  });

});