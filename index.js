'use strict'

const { grey, white, yellow, red } = require('chalk')

const nanos = process.hrtime
const stdout = process.stdout

function RawLog (name, capture) {

    // allow calling the function without 'new'

    if (!new.target)
        return new RawLog(name, capture)

    // allow capturing of log messages if a capture function is provided
    // this mechanism was, for example, used to test this module

    const log = capture || process._rawDebug

    const time = () => {
        const diff = nanos(this.time)
        return ((diff[0] * 1e9 + diff[1]) * 1e-6).toFixed(2)
    }

    let env = process.env.RAW_LOG || ''

    // RAW_LOG=true means that all logging levels should be active

    if (env === 'true')
        env = 'debug,info,warn,error'

    if (env.includes('debug')) {
        this.debug = message => {
            log(`DEBUG | ${name} | +${time()}ms | ${grey(message)}`)
        }
    } else this.debug = () => {}

    if (env.includes('info')) {
        this.info = message => {
            log(`INFO  | ${name} | +${time()}ms | ${white(message)}`)
        }
    } else this.info = () => {}

    if (env.includes('warn')) {
        this.warn = err => {
            if (err instanceof Error) log(`WARN  | ${name} | +${time()}ms | ${yellow(err.message)}`)
            else log(`WARN  | ${name} | +${time()}ms | ${yellow(err)}`)
        }
    } else this.warn = () => {}

    if (env.includes('error')) {
        this.error = err => {
            if (err instanceof Error) log(`ERROR | ${name} | +${time()}ms | ${red(err.message)}`)
            else log(`ERROR | ${name} | +${time()}ms | ${red(err)}`)
        }
    } else this.error = () => {}

    // when using process._rawDebug() for the first time, it will be at cursor position 0
    // otherwise it will be at position 1, so move the cursor before the first log
    // but only do this, if a cursor is available - it won't be available if run form a
    // npm script, for example

    if (stdout.cursorTo) stdout.cursorTo(1)

    // init time last so it is most accurate

    this.time = nanos()

}

module.exports = RawLog
