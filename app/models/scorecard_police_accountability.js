'use strict'

/**
 * @module models/scorecard_police_accountability
 * @version 1.0.0
 * @author Peter Schmalfeldt <me@peterschmalfeldt.com>
 */

module.exports = (sequelize, DataTypes) => {
  const ScorecardPoliceAccountability = sequelize.define('scorecard_police_accountability', {
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
    civilian_complaints_reported: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_reported_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    civilian_complaints_sustained_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_reported_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    use_of_force_complaints_sustained_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_reported_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    discrimination_complaints_sustained_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_reported_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    criminal_complaints_sustained_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_reported_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2016: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2017: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2018: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2019: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2020: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    complaints_in_detention_sustained_2021: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    years_of_complaints_data: {
      type: DataTypes.STRING(50)
    },
    civilian_complaints_source: {
      type: DataTypes.STRING(100)
    },
    civilian_complaints_source_link: {
      type: DataTypes.STRING(255)
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
  ScorecardPoliceAccountability.associate = (models) => {
    /**
     * Connect Police Accountability to Agency
     */
    models.scorecard_police_accountability.belongsTo(models.scorecard_agency, {
      foreignKey: 'agency_id',
      targetKey: 'id',
      foreignKeyConstraint: true
    })
  }

  return ScorecardPoliceAccountability
}
