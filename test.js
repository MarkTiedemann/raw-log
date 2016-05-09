'use strict'

const ava = require('ava')
const RawLog = require('.')

ava (`instantiation without 'new' works`, test => {

    test.plan(1)

    const { info } = require('.')('test')

    test.truthy(info !== undefined)

})

ava('debug() works', test => {

    test.plan(3)

    process.env.RAW_LOG='debug'

    let capture = message => {
        test.truthy(message.startsWith('DEBUG | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | debug'))
    }

    const { debug } = new RawLog('test', capture)

    debug('debug')

})

ava('info() works', test => {

    test.plan(3)

    process.env.RAW_LOG='info'

    let capture = message => {
        test.truthy(message.startsWith('INFO  | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | info'))
    }

    const { info } = new RawLog('test', capture)

    info('info')

})

ava('warn() works with String message', test => {

    test.plan(3)

    process.env.RAW_LOG='warn'

    let capture = message => {
        test.truthy(message.startsWith('WARN  | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | warn'))
    }

    const { warn } = new RawLog('test', capture)

    warn('warn')

})

ava('warn() works with Error message', test => {

    test.plan(3)

    process.env.RAW_LOG='warn'

    let capture = message => {
        test.truthy(message.startsWith('WARN  | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | warn'))
    }

    const { warn } = new RawLog('test', capture)

    warn(new Error('warn'))

})

ava('error() works with String message', test => {

    test.plan(3)

    process.env.RAW_LOG='error'

    let capture = message => {
        test.truthy(message.startsWith('ERROR | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | error'))
    }

    const { error } = new RawLog('test', capture)

    error('error')

})

ava('error() works with Error message', test => {

    test.plan(3)

    process.env.RAW_LOG='error'

    let capture = message => {
        test.truthy(message.startsWith('ERROR | '))
        test.truthy(message.includes(' | test | '))
        test.truthy(message.endsWith(' | error'))
    }

    const { error } = new RawLog('test', capture)

    error(new Error('error'))

})

ava('RAW_LOG=true outputs all levels', test => {

    test.plan(1)

    process.env.RAW_LOG=true

    let count = 0
    let capture = message => { count++ }

    const { debug, info, warn, error } = new RawLog('test', capture)

    debug('debug')
    info('info')
    warn('warn')
    error('error')

    test.is(count, 4)

})


ava('RAW_LOG=false outputs nothing', test => {

    test.plan(1)

    process.env.RAW_LOG=false

    let count = 0
    let capture = message => { count++ }

    const { debug, info, warn, error } = new RawLog('test', capture)

    debug('debug')
    info('info')
    warn('warn')
    error('error')

    test.is(count, 0)

})
