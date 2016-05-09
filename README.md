
# raw-log

[![](https://travis-ci.org/MarkTiedemann/raw-log.svg?branch=master)](https://travis-ci.org/MarkTiedemann/raw-log)

**Tiny and fast debugging and logging tool.**

- **Multiple logging levels with different colors.**
- **`process._rawDebug()` instead of `console.log()`.**
- **Milisecond diff based on `process.hrtime()`.**
- **100% code coverage.**
- **Requires Node 6+.**

## Installation

```
npm i -S raw-log
```

## Quickstart

```
RAW_LOG=true node my-module.js
```

```javascript

const { info, error } = require('raw-log')('my-module')

info('hello world')
// => INFO  | my-module | +0.11ms | <white> hello world </white>

error(new Error('goodbye, cruel world'))
// => ERROR | my-module | +0.71ms | <red> goodbye, cruel world </red>

```

## Levels

- **debug**: grey; while developing
- **info**: white; normal behavior
- **warn**: yellow; incorrect behavior; prints `Error.message`
- **error**: red; something broke; prints `Error.message`

**Note:** Using `RAW_LOG=true` enables all levels. If you want to log only specific levels, e.g. critical levels: use `RAW_LOG=warn,error`.

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
