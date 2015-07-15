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
  }
};
