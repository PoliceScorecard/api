#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const repoRoot = process.cwd()
const updatePath = path.join(repoRoot, 'app/api/v1/domain/update.js')
const modelDir = path.join(repoRoot, 'app/models')
const defaultCsvs = [
  path.join(repoRoot, 'app/data/scorecard.csv')
]

const tableToSection = {
  scorecard_agency: 'agency',
  scorecard_arrests: 'arrests',
  scorecard_homicide: 'homicide',
  scorecard_jail: 'jail',
  scorecard_police_accountability: 'police_accountability',
  scorecard_police_funding: 'police_funding',
  scorecard_police_violence: 'police_violence',
  scorecard_policy: 'policy',
  scorecard_report: 'report'
}

const managedFields = [
  'id',
  'agency_id',
  'country_id',
  'state_id',
  'city_id',
  'county_id',
  'created_date',
  'modified_date',
  'deletedAt'
]

const derivedRowFields = [
  'corrections_budget',
  'health_budget',
  'housing_budget',
  'police_budget',
  'total_budget'
]

const knownLegacyRowFields = [
  'bans_chokeholds_and_strangleholds',
  'calc_overall_disparity_index',
  'currently_updating_union_contract',
  'currently_updating_use_of_force',
  'disqualifies_complaints',
  'duty_to_intervene',
  'erases_misconduct_records',
  'fatality_rate',
  'gives_officers_unfair_access_to_information',
  'has_use_of_force_continuum',
  'limits_oversight_discipline',
  'people_killed_or_injured_asian_pacific',
  'people_killed_or_injured_black',
  'people_killed_or_injured_hispanic',
  'people_killed_or_injured_other',
  'people_killed_or_injured_unarmed',
  'people_killed_or_injured_vehicle_incident',
  'people_killed_or_injured_white',
  'police_union_contract_link',
  'policy_language_bans_chokeholds_and_strangleholds',
  'policy_language_disqualifies_complaints',
  'policy_language_duty_to_intervene',
  'policy_language_erases_misconduct_records',
  'policy_language_gives_officers_unfair_access_to_information',
  'policy_language_has_use_of_force_continuum',
  'policy_language_limits_oversight_discipline',
  'policy_language_requires_city_pay_for_misconduct',
  'policy_language_requires_comprehensive_reporting',
  'policy_language_requires_deescalation',
  'policy_language_requires_exhaust_other_means_before_shooting',
  'policy_language_requires_warning_before_shooting',
  'policy_language_restricts_delays_interrogations',
  'policy_language_restricts_shooting_at_moving_vehicles',
  'policy_manual_link',
  'requires_city_pay_for_misconduct',
  'requires_comprehensive_reporting',
  'requires_deescalation',
  'requires_exhaust_other_means_before_shooting',
  'requires_warning_before_shooting',
  'restricts_delays_interrogations',
  'restricts_shooting_at_moving_vehicles'
]

const optionalFutureRowFields = [
  'civilian_complaints_reported_2025',
  'civilian_complaints_sustained_2025',
  'complaints_in_detention_reported_2025',
  'complaints_in_detention_sustained_2025',
  'criminal_complaints_reported_2025',
  'criminal_complaints_sustained_2025',
  'discrimination_complaints_reported_2025',
  'discrimination_complaints_sustained_2025',
  'use_of_force_complaints_reported_2025',
  'use_of_force_complaints_sustained_2025'
]

const knownUnmappedModelAttrs = {
  scorecard_report: [
    'percentile_of_murders_solved'
  ]
}

function readFile (filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function parseCsvLine (line) {
  const values = []
  let value = ''
  let quoted = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    const next = line[i + 1]

    if (char === '"' && quoted && next === '"') {
      value += '"'
      i += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      values.push(value)
      value = ''
    } else {
      value += char
    }
  }

  values.push(value)
  return values
}

function getHeader (filePath) {
  const data = readFile(filePath)
  const firstLine = data.split(/\r?\n/)[0]
  return parseCsvLine(firstLine)
}

function getScorecardColumns () {
  const src = readFile(updatePath)
  const match = src.match(/const SCORECARD_COLUMNS = \[([\s\S]*?)\n\]/)

  if (!match) {
    throw new Error('Unable to find SCORECARD_COLUMNS in app/api/v1/domain/update.js')
  }

  const columns = []
  const regex = /'([^']+)'/g
  let found

  while ((found = regex.exec(match[1])) !== null) {
    columns.push(found[1])
  }

  return columns
}

function compareArrays (expected, actual) {
  return {
    missing: expected.filter(item => actual.indexOf(item) === -1),
    extra: actual.filter(item => expected.indexOf(item) === -1),
    orderMatches: JSON.stringify(expected) === JSON.stringify(actual)
  }
}

function getYearGroups (columns) {
  const groups = {}
  const regex = /^(.+)_([0-9]{4})$/

  columns.forEach(column => {
    const match = column.match(regex)

    if (!match) {
      return
    }

    const prefix = match[1]
    const year = Number(match[2])

    if (!groups[prefix]) {
      groups[prefix] = []
    }

    if (groups[prefix].indexOf(year) === -1) {
      groups[prefix].push(year)
    }
  })

  Object.keys(groups).forEach(prefix => {
    groups[prefix].sort()
  })

  return groups
}

function getModelAttrs (filePath) {
  const src = readFile(filePath)
  const attrs = []
  const regex = /^    ([A-Za-z0-9_]+): \{/gm
  let match

  while ((match = regex.exec(src)) !== null) {
    attrs.push(match[1])
  }

  return attrs
}

function findMatchingBrace (src, startIndex) {
  let depth = 0
  let inString = false
  let quote = ''
  let escaped = false

  for (let i = startIndex; i < src.length; i += 1) {
    const char = src[i]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        inString = false
      }
      continue
    }

    if (char === '"' || char === '\'' || char === '`') {
      inString = true
      quote = char
      continue
    }

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0) {
        return i
      }
    }
  }

  return -1
}

function getCleanDataSections () {
  const src = readFile(updatePath)
  const marker = 'const cleanData = {'
  const markerIndex = src.indexOf(marker)

  if (markerIndex === -1) {
    throw new Error('Unable to find cleanData object in app/api/v1/domain/update.js')
  }

  const objectStart = src.indexOf('{', markerIndex)
  const objectEnd = findMatchingBrace(src, objectStart)
  const objectSrc = src.slice(objectStart + 1, objectEnd)
  const sections = {}
  const firstSection = objectSrc.match(/\n(\s+)[A-Za-z0-9_]+: \{/)

  if (!firstSection) {
    throw new Error('Unable to find cleanData sections in app/api/v1/domain/update.js')
  }

  const sectionIndent = firstSection[1]
  const keyIndent = sectionIndent + '  '
  const sectionRegex = new RegExp('\\n' + sectionIndent + '([A-Za-z0-9_]+): \\{', 'g')
  let sectionMatch

  while ((sectionMatch = sectionRegex.exec(objectSrc)) !== null) {
    const name = sectionMatch[1]
    const sectionStart = objectSrc.indexOf('{', sectionMatch.index)
    const sectionEnd = findMatchingBrace(objectSrc, sectionStart)
    const body = objectSrc.slice(sectionStart + 1, sectionEnd)
    const keys = []
    const keyRegex = new RegExp('^' + keyIndent + '([A-Za-z0-9_]+):', 'gm')
    let keyMatch

    while ((keyMatch = keyRegex.exec(body)) !== null) {
      keys.push(keyMatch[1])
    }

    sections[name] = keys
  }

  return sections
}

function getRowRefs () {
  const src = readFile(updatePath)
  const refs = []
  const regex = /row\.([A-Za-z0-9_]+)/g
  let match

  while ((match = regex.exec(src)) !== null) {
    if (refs.indexOf(match[1]) === -1) {
      refs.push(match[1])
    }
  }

  refs.sort()
  return refs
}

function formatList (values) {
  return values.length ? values.join(', ') : 'none'
}

function parseArgs () {
  let csvs = defaultCsvs.slice()
  let hasCustomCsv = false
  const args = process.argv.slice(2)

  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--csv' && args[i + 1]) {
      if (!hasCustomCsv) {
        csvs = []
        hasCustomCsv = true
      }

      csvs.push(path.resolve(args[i + 1]))
      i += 1
    }
  }

  return { csvs: csvs }
}

function main () {
  const args = parseArgs()
  const scorecardColumns = getScorecardColumns()
  let hasHeaderMismatch = false

  console.log('Scorecard column audit')
  console.log('======================')
  console.log('SCORECARD_COLUMNS:', scorecardColumns.length)
  console.log('')

  args.csvs.forEach(csvPath => {
    if (!fs.existsSync(csvPath)) {
      console.log(path.relative(repoRoot, csvPath) + ': missing')
      return
    }

    const header = getHeader(csvPath)
    const comparison = compareArrays(scorecardColumns, header)

    if (!comparison.orderMatches) {
      hasHeaderMismatch = true
    }

    console.log(path.relative(repoRoot, csvPath))
    console.log('  header columns:', header.length)
    console.log('  order matches SCORECARD_COLUMNS:', comparison.orderMatches)
    console.log('  missing from CSV:', formatList(comparison.missing))
    console.log('  extra in CSV:', formatList(comparison.extra))
  })

  console.log('')
  console.log('Year-suffixed column groups')
  console.log('---------------------------')

  const groups = getYearGroups(scorecardColumns)
  Object.keys(groups).sort().forEach(prefix => {
    const years = groups[prefix]
    console.log(prefix + ': ' + years[0] + '-' + years[years.length - 1] + ' (' + years.length + ')')
  })

  console.log('')
  console.log('Model vs cleanData mapping')
  console.log('--------------------------')

  const cleanDataSections = getCleanDataSections()

  Object.keys(tableToSection).forEach(table => {
    const section = tableToSection[table]
    const modelFile = path.join(modelDir, table + '.js')
    const modelAttrs = getModelAttrs(modelFile)
    const mappedAttrs = cleanDataSections[section] || []
    const knownMissing = knownUnmappedModelAttrs[table] || []
    const missingInMapping = modelAttrs.filter(attr => managedFields.indexOf(attr) === -1 && mappedAttrs.indexOf(attr) === -1 && knownMissing.indexOf(attr) === -1)
    const mappedNotInModel = mappedAttrs.filter(attr => modelAttrs.indexOf(attr) === -1 && managedFields.indexOf(attr) === -1)

    console.log(table + ' -> ' + section)
    console.log('  model attrs:', modelAttrs.length)
    console.log('  cleanData attrs:', mappedAttrs.length)
    console.log('  known model attrs not mapped:', formatList(knownMissing))
    console.log('  model attrs not mapped:', formatList(missingInMapping))
    console.log('  mapped attrs not in model:', formatList(mappedNotInModel))
  })

  console.log('')
  console.log('row.* references not in SCORECARD_COLUMNS')
  console.log('-----------------------------------------')

  const rowRefs = getRowRefs()
  const allowedRowRefs = derivedRowFields.concat(knownLegacyRowFields).concat(optionalFutureRowFields)
  const unknownRowRefs = rowRefs.filter(ref => scorecardColumns.indexOf(ref) === -1 && allowedRowRefs.indexOf(ref) === -1)
  console.log('known legacy refs:', knownLegacyRowFields.length)
  console.log('optional future refs:', optionalFutureRowFields.length)
  console.log(formatList(unknownRowRefs))

  if (hasHeaderMismatch) {
    process.exitCode = 1
  }
}

main()
