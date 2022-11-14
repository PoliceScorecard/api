'use strict'

/**
 * @module models/scorecard_police_violence
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

module.exports = (sequelize, DataTypes) => {
  const ScorecardPoliceViolence = sequelize.define('scorecard_police_violence', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    agency_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      comment: 'Foreign Key to scorecard_agency'
    },
    less_lethal_force_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    less_lethal_force_2022: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_2022: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    police_shootings_per_arrest: {
      type: DataTypes.FLOAT(15, 2).UNSIGNED
    },
    white_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    black_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    hispanic_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    asian_pacific_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    native_american_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    other_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    unarmed_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    vehicle_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    armed_people_killed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    fatality_rate: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    shot_first: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_armed_with_gun: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_gun_perceived: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_unarmed: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_vehicle_incident: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_black: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_white: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_hispanic: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_asian_pacific: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    people_killed_or_injured_other: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    all_deadly_force_incidents: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    percentile_police_shootings_per_arrest: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    taser_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    impact_weapons_and_projectiles_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    neck_restraints_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    chemical_spray_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2013: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2014: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2015: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    K9_deployments_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    }
  }, {
    indexes: [
      {
        fields: ['agency_id']
      }
    ]
  })

  /**
   * Setup Model Associations
   */
  ScorecardPoliceViolence.associate = (models) => {
    /**
     * Connect Police Violence to Agency
     */
    models.scorecard_police_violence.belongsTo(models.scorecard_agency, {
      foreignKey: 'agency_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    })
  }

  return ScorecardPoliceViolence
}
