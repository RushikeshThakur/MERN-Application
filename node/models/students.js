/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('students', {
    Username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    StudentName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    University: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Course: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Year: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Fees: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'students'
  });
};
