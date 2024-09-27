"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class department extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	department.init(
		{
			departmentName: DataTypes.STRING,
			departmentSize: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "department",
			paranoid: true,
			underscored: true,
		}
	);
	return department;
};
