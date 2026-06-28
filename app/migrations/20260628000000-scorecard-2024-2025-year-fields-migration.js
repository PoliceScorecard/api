'use strict'

const addColumns = (queryInterface, tableName, columns) => {
  return queryInterface.describeTable(tableName).then(table => {
    return columns.reduce((promise, column) => {
      if (table[column.name]) {
        return promise
      }

      return promise.then(() => queryInterface.addColumn(tableName, column.name, column.attribute))
    }, Promise.resolve())
  })
}

const removeColumns = (queryInterface, tableName, columns) => {
  return queryInterface.describeTable(tableName).then(table => {
    return columns.reduce((promise, column) => {
      if (!table[column.name]) {
        return promise
      }

      return promise.then(() => queryInterface.removeColumn(tableName, column.name))
    }, Promise.resolve())
  })
}

const buildColumns = (DataTypes) => {
  const integer = () => ({
    type: DataTypes.INTEGER(10).UNSIGNED
  })

  const bigInteger = () => ({
    type: DataTypes.BIGINT(20).UNSIGNED
  })

  return {
    scorecard_police_violence: [
      'less_lethal_force_2024',
      'less_lethal_force_2025',
      'police_shootings_2024',
      'police_shootings_2025',
      'taser_2024',
      'taser_2025',
      'impact_weapons_and_projectiles_2024',
      'impact_weapons_and_projectiles_2025',
      'neck_restraints_2024',
      'neck_restraints_2025',
      'chemical_spray_2024',
      'chemical_spray_2025',
      'K9_deployments_2024',
      'K9_deployments_2025'
    ].map(name => ({
      name: name,
      attribute: integer()
    })),
    scorecard_police_funding: [
      'total_officers_2024',
      'total_officers_2025',
      'total_budget_2024',
      'total_budget_2025',
      'fines_forfeitures_2024',
      'fines_forfeitures_2025',
      'housing_budget_2024',
      'housing_budget_2025',
      'health_budget_2024',
      'health_budget_2025',
      'police_budget_2024',
      'police_budget_2025',
      'corrections_budget_2024',
      'corrections_budget_2025'
    ].map(name => ({
      name: name,
      attribute: bigInteger()
    })),
    scorecard_police_accountability: [
      'civilian_complaints_reported_2024',
      'civilian_complaints_reported_2025',
      'civilian_complaints_sustained_2024',
      'civilian_complaints_sustained_2025',
      'use_of_force_complaints_reported_2024',
      'use_of_force_complaints_reported_2025',
      'use_of_force_complaints_sustained_2024',
      'use_of_force_complaints_sustained_2025',
      'discrimination_complaints_reported_2024',
      'discrimination_complaints_reported_2025',
      'discrimination_complaints_sustained_2024',
      'discrimination_complaints_sustained_2025',
      'criminal_complaints_reported_2024',
      'criminal_complaints_reported_2025',
      'criminal_complaints_sustained_2024',
      'criminal_complaints_sustained_2025',
      'complaints_in_detention_reported_2024',
      'complaints_in_detention_reported_2025',
      'complaints_in_detention_sustained_2024',
      'complaints_in_detention_sustained_2025'
    ].map(name => ({
      name: name,
      attribute: integer()
    }))
  }
}

module.exports = {
  up: (queryInterface, DataTypes) => {
    const columns = buildColumns(DataTypes)

    return addColumns(queryInterface, 'scorecard_police_violence', columns.scorecard_police_violence)
      .then(() => addColumns(queryInterface, 'scorecard_police_funding', columns.scorecard_police_funding))
      .then(() => addColumns(queryInterface, 'scorecard_police_accountability', columns.scorecard_police_accountability))
  },
  down: (queryInterface, DataTypes) => {
    const columns = buildColumns(DataTypes)

    return removeColumns(queryInterface, 'scorecard_police_accountability', columns.scorecard_police_accountability)
      .then(() => removeColumns(queryInterface, 'scorecard_police_funding', columns.scorecard_police_funding))
      .then(() => removeColumns(queryInterface, 'scorecard_police_violence', columns.scorecard_police_violence))
  }
}
