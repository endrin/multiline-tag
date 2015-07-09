var chai = require('chai'),
    expect = chai.expect;

var Multiline = require('../lib/multiline-tag').Multiline;

/* jshint -W024 */
/* jshint expr:true */
/* jshint esnext:true */

describe("Multiline tag tests", function () {
  it("Should clean simple aligned strings", function () {
    var example = Multiline`one
                            two`;
    expect(example).to.be.equal("one two");
  });

  it("should keep spaces before slash at the end of the line", function () {
    var example = Multiline`a \
                            b\
                            c  \
                            d`;
    expect(example).to.be.equal("a bc  d");
  });

  it("should remove empty lines inside text", function () {
    var example = Multiline`one

                            two`;
    expect(example).to.be.equal("one two");
  });

  it("should remove empty lines around text", function () {
    var example = Multiline`
                            a
                            b
    `;
    expect(example).to.be.equal("a b");
  });

  it("should support interpolation like usual template string", function () {
    var example = Multiline`
      interpolation ${1}
      follows ${2}  \
      too ${3}\
      !`;
    expect(example).to.be.equal("interpolation 1 follows 2  too 3!");
  });

});

// https://github.com/xixixao/coffee-script/commit/efe8c68c759f5bf9034c0b7ae28c5140b53d7114
// https://github.com/jashkenas/coffeescript/issues/3229
// http://coffeescript.org/#strings
