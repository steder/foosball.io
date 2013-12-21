if (window.location.search === "?test") {
  document.write(
    '<div id="qunit"></div>' +
    '<div id="qunit-fixture"></div>' +
    '<div id="ember-testing-container">' +
    '  <div id="ember-testing"></div>' +
    '</div>' +
    '<link rel="stylesheet" href="/static/tests/runner.css">' +
    '<link rel="stylesheet" href="/static/tests/vendor/qunit-1.12.0.css">' +
    '<script src="/static/tests/vendor/qunit-1.12.0.js"></script>' +
    '<script src="/static/tests/tests.js"></script>'
  )
}