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

    var fullString = template
          .reduce(function (result, line, idx) {
            return result + line + variables[idx];
          }, ''),
        lines = fullString.split('\n'),
        minIndent = lines
          .filter(function (line) { return line.match(/^\s*$/) === null;})
          .reduce(function(result, line) {
            return Math.min(line.match(/^\s*/)[0].length, result);
          }, Infinity),
        clearRX = new RegExp('^\\s{' + minIndent + '}', 'gm');

    return lines
      .map(function (s) { return s.replace(clearRX, ''); })
      .join('\n')
      .trim();
  }
};
