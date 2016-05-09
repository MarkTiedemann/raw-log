'use strict'

process.env.RAW_LOG=true

const { debug, info, warn, error } = require('.')('example')

debug('debug')
info('info')
warn('warn')
error('error')
