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
let totalSpent = 0
const tags = {}
lines.forEach(line => {
  if (!/\d+(min|h)/g.exec(line)) return
  const [, time, unit] = /(\d+)(min|h)/g.exec(line)
  const minutesSpent = Number(time) * (unit === 'h' ? 60 : 1)
  totalSpent += minutesSpent
  line.replace(/#(\w+)/g, (_, tag) => {
    tags[tag] = (tags[tag] || 0) + minutesSpent
  })
})

const displayTime = time => {
  if (time < 60) {
    return `${time}min`
  } else {
    return `${Math.floor(time / 60)}h ${time % 60}min`
  }
}
console.log(`Skupaj ${displayTime(totalSpent)}`.green)
console.log(
  Object.entries(tags).sort(
    ([, t1], [, t2]) => t1 > t2 ? -1 : 1
  ).map(
    ([tag, time]) => ('#' + `${tag} `.yellow + displayTime(time))
  ).join('\n')
)
