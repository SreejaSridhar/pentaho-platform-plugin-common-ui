/*!
 * Copyright 2010 - 2016 Pentaho Corporation.  All rights reserved.
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
 */
define([
  "./AbstractTreeFilter",
  "require",
  "./Or",
], function(AbstractTreeFilter, require, Or) {
  "use strict";

  /**
   * @name And
   * @memberOf pentaho.data.filter
   * @class
   * @abstract
   * @amd pentaho/data/filter/And
   *
   * @classdesc The `And` class implements a type of AbstractTreeFilter {@link pentaho.data.filter.AbstractTreeFilter}.
   *
   * @example
   * <caption> Create a new <code>And</code> filter.
   *
   * require(["pentaho/data/Table", "pentaho/data/filter/IsIn", "pentaho/data/filter/IsEqual", "pentaho/data/filter/And"], function(Table, IsIn, IsEqual, And) {
   *   var data = new Table({
   *     model: [
   *       {name: "product", type: "string", label: "Product"},
   *       {name: "sales", type: "number", label: "Sales"},
   *       {name: "inStock", type: "boolean", label: "In Stock"}
   *     ],
   *     rows: [
   *       {c: [{v: "A"}, {v: 12000}, {v: true}]},
   *       {c: [{v: "B"}, {v: 6000}, {v: true}]},
   *       {c: [{v: "C"}, {v: 12000}, {v: false}]},
   *       {c: [{v: "D"}, {v: 1000}, {v: false}]},
   *       {c: [{v: "E"}, {v: 2000}, {v: false}]},
   *       {c: [{v: "F"}, {v: 3000}, {v: false}]},
   *       {c: [{v: "G"}, {v: 4000}, {v: false}]}
   *     ]
   *   });
   *
   *
   *  var sales12k = new IsIn("sales", [12000]);
   *  var inStock = new IsEqual("inStock", true);
   *  var combination1 = new And([sales12k, inStock]);
   *  var data1 = combination1.apply(data); //data1.getValue(0, 0) === "A"
   * });
   */
  var And = AbstractTreeFilter.extend("pentaho.data.filter.And", /** @lends pentaho.data.filter.And# */{

    /**
     * @inheritdoc
     * @readonly
     */
    get type() { return "$and";},

    /**
     * @inheritdoc
     */
    contains: function(entry) {
      var memo = true; // true is the neutral element of an AND operation
      var N = this.operands.length;
      for(var k = 0; k < N && memo; k++) {
        memo = memo && this.operands[k].contains(entry);
      }
      return memo;
    },

    /**
     * @inheritdoc
     */
    and: function() {
      var operands = this.operands;
      for(var k = 0, N = arguments.length; k < N; k++) {
        operands.push(arguments[k]);
      }
      return new And(operands);
    },

    /**
     * @inheritdoc
     */
    invert: function() {
      var invertedChildren = this.operands.map(function(child) {
        return child.invert();
      });
      if(!Or) Or = require("./Or");
      return new Or(invertedChildren);
    }
  });

  return And;

});