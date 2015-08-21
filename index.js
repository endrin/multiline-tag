module.exports = {
  Multiline: function () {
    var template = arguments[0].raw,
        variables = Array.prototype.slice.call(arguments, 1).concat('');

    return template
      .reduce(function (result, line, idx) {
        return result +
          line.replace(/\\[\r\n]\s*/g, '').replace(/\s*[\r\n]\s*/g, ' ') +
          variables[idx];
      }, '')
      .trim();
  },
  Block: function () {
    var template = arguments[0],
        variables = Array.prototype.slice.call(arguments, 1).concat('');

    var rawLines = template.join('#').split('\n'),
        minIndent = rawLines
          .slice(1)
          .filter(function (line) { return line.match(/^\s*$/) === null;})
          .reduce(function(result, line) {
            return Math.min(line.match(/^\s*/)[0].length, result);
          }, Infinity),
        clearRX = new RegExp('^\\s{' + minIndent + '}', 'gm');

    return template
      .reduce(function (result, line, idx) {
        return result + line + variables[idx];
      }, '')
      .split('\n')
      .map(function (s) { return s.replace(clearRX, ''); })
      .join('\n')
      .replace(/^\n|\n\s*$/g,'');
  }
};
