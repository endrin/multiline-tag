var expect = require('chai').expect;

var Block = require('../lib/multiline-tag').Block;

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

    // a = '''
  //        a
  //      b
  //    c
  //     '''
  // ok a is "    a\n  b\nc"
  //
  // a = '''
  // a
  //
  //
  // b c
  // '''
  // ok a is "a\n\n\nb c"
  //
  // a = '''more"than"one"quote'''
  // ok a is 'more"than"one"quote'
  //
  // a = '''here's an apostrophe'''
  // ok a is "here's an apostrophe"
  //
  // a = """""surrounded by two quotes"\""""
  // ok a is '""surrounded by two quotes""'
  //
  // a = '''''surrounded by two apostrophes'\''''
  // ok a is "''surrounded by two apostrophes''"
  //
  // # The indentation detector ignores blank lines without trailing whitespace
  // a = """
  //     one
  //     two
  //
  //     """
  // ok a is "one\ntwo\n"
  //
  // eq ''' line 0
  //   should not be relevant
  //     to the indent level
  // ''', ' line 0\nshould not be relevant\n  to the indent level'
  //
  // eq """
  //   interpolation #{
  //  "contents"
  //  }
  //   should not be relevant
  //     to the indent level
  // """, 'interpolation contents\nshould not be relevant\n  to the indent level'
  //
  // eq ''' '\\\' ''', " '\\' "
  // eq """ "\\\" """, ' "\\" '
  //
  // eq '''  <- keep these spaces ->  ''', '  <- keep these spaces ->  '
  //
  // eq '''undefined''', 'undefined'
  // eq """undefined""", 'undefined'
  //
});

// test "#3249, escape newlines in heredocs with backslashes", ->
//   # Ignore escaped newlines
//   eq '''
//     Set whitespace      \
//        <- this is ignored\
//            none
//       normal indentation
//     ''', 'Set whitespace      <- this is ignorednone\n  normal indentation'
//   eq """
//     Set whitespace      \
//        <- this is ignored\
//            none
//       normal indentation
//     """, 'Set whitespace      <- this is ignorednone\n  normal indentation'
//
//   # Changed from #647, trailing backslash.
//   eq '''
//   Hello, World\
//
//   ''', 'Hello, World'
//   eq '''
//     \\
//   ''', '\\'
//
//   # Backslash at the beginning of a literal string.
//   eq '''\
//       ok''', 'ok'
//   eq '''  \
//       ok''', '  ok'
//
//   # Same behavior in interpolated strings.
//   eq """
//     interpolation #{1}
//       follows #{2}  \
//         too #{3}\
//     !
//   """, 'interpolation 1\n  follows 2  too 3!'
//   eq """
//
//     #{1} #{2}
//
//     """, '\n1 2\n'
//
//   # Handle escaped backslashes correctly.
//   eq '''
//     escaped backslash at EOL\\
//       next line
//   ''', 'escaped backslash at EOL\\\n  next line'
//   eq '''\\
//
//      ''', '\\\n'
//
//   # Backslashes at beginning of lines.
//   eq '''first line
//       \   backslash at BOL''', 'first line\n\   backslash at BOL'
//   eq """first line\
//       \   backslash at BOL""", 'first line\   backslash at BOL'
//
//   # Backslashes at end of strings.
//   eq '''first line \ ''', 'first line  '
//   eq '''
//     first line
//     second line \
//   ''', 'first line\nsecond line '
//   eq '''
//     first line
//     second line
//     \
//   ''', 'first line\nsecond line'
//   eq '''
//     first line
//     second line
//
//       \
//
//   ''', 'first line\nsecond line\n'
//
//   # Edge cases.
//   eq '''lone
//
//           \
//
//
//
//         backslash''', 'lone\n\n  backslash'
//   eq '''\
//      ''', ''
//
// test '#2388: `"""` in heredoc interpolations', ->
//   eq """a heredoc #{
//       "inside \
//         interpolation"
//     }""", "a heredoc inside interpolation"
//   eq """a#{"""b"""}c""", 'abc'
//   eq """#{""""""}""", ''
//
// test "trailing whitespace", ->
//   testTrailing = (str, expected) ->
//     eq CoffeeScript.eval(str.replace /\|$/gm, ''), expected
//   testTrailing '''"   |
//       |
//     a   |
//            |
//   "''', 'a'
//   testTrailing """'''   |
//       |
//     a   |
//            |
//   '''""", '  \na   \n       '
//
// #647
// eq "''Hello, World\\''", '''
// '\'Hello, World\\\''
// '''
// eq '""Hello, World\\""', """
// "\"Hello, World\\\""
// """
//
// test "#1273, escaping quotes at the end of heredocs.", ->
//   # """\""" no longer compiles
//   eq """\\""", '\\'
//   eq """\\\"""", '\\\"'
//
