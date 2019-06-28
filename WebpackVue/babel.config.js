// babel.config.js
const path = require('path')

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {"useBuiltIns": "usage"}
    ]
  ]
}