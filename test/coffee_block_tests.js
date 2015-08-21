var expect = require('chai').expect;

var Block = require('../index').Block;

/* jshint esnext:true */

describe("Block tag tests", function () {
  it("should clean lines with same identation", function () {
    var example = Block`
      basic heredoc
      on two lines
      `;
    expect(example).to.be.equal("basic heredoc\non two lines");
  });


  it("should recognise different levels of indentation", function () {
    var example = Block`
      a
        b
          c
      `;
    expect(example).to.be.equal("a\n  b\n    c");
  });

  it("should skip empty lines and not count them in indentation", function () {
    var example = Block`
      out

      here
    `;
    expect(example).to.be.equal("out\n\nhere");
  });

  it("should keep one-liners as is", function () {
    var example = Block`one-liner`;
    expect(example).to.be.equal("one-liner");
  });

  it("should ignore identation on line 0 (and keep it as is)", function () {
    var example = Block` line 0
      should not be relevant
        to the indent level
    `;
    expect(example).to.be.equal(" line 0\nshould not be relevant\n  to the indent level");
  });

  it("should prevent interpolated values from breaking indentation", function () {
    var different_indent = Block`
      a
        b
    `;
    var example = Block`
      c
        ${different_indent}
        d
    `;
    expect(example).to.be.equal("c\n  a\n  b\n  d");
    // TODO: Currently only first line of multiline variable will have correct indentation. This works same as in Coffee, but doesn't look good. I need to figure how to align all lines in such variables to one level, and then update this test and the Block function.
  });

});
