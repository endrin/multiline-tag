# multiline-tag

Module providing two tags for ES2015 [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings) which allow to mimic behavior of CoffeeScript's [Multiline and Block strings](http://coffeescript.org/#strings).

## Install

```sh
$ npm install --save multiline-tag
```


## Usage

```javascript
var Multiline = require('multiline-tag').Multiline,
    Block = require('multiline-tag').Block;

var mobyDick = Multiline`
    Call me Ishmael. Some years ago --
    never mind how long precisely -- having little
    or no money in my purse, and nothing particular
    to interest me on shore, I thought I would sail
    about a little and see the watery part of the
    world...`;

console.dir(mobyDick);
// 'Call me Ishmael. Some years ago -- never mind how long precisely -- having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world...'

var html = Block`
      <strong>
        strong text is strong
      </strong>
    `;

console.dir(html);
// '<strong>\n  strong text is strong\n</strong>'

```
