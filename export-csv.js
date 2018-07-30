#!/usr/bin/env node
require('colors')
const { readFileSync } = require('fs')
const [,, inputFile] = process.argv
if (!inputFile) {
  console.log('No input specified')
  process.exit(1)
}

const lines = readFileSync(inputFile, 'utf8').split('\n').filter(
  a => !a.trim().startsWith('#') && a.length > 0
)
console.log('Ime;Trajanje')
lines.forEach(line => {
  if (!/\d+(min|h)/g.exec(line)) return
  const [, time, unit] = /(\d+)(min|h)/g.exec(line)
  const minutesSpent = Number(time) * (unit === 'h' ? 60 : 1)
  console.log(`${
    line.replace(/#\w*/g, '').replace(/(\d+)(min|h)/g, '').trim()
  };${minutesSpent} mins`)
})
