const db = require("../../models");
const { validateStringLength } = require("../utils/string");
const { validateUuid } = require("../utils/uuid");
const { Op, Sequelize } = require("sequelize");
class DepartmentConfig {
	constructor() {
		this.fieldMapping = Object.freeze({
			id: "id",
			departmentName: "departmentName",
			departmentSize: "departmentSize",
		});
		this.model = db.department;
		this.modelName = db.department.name;
		this.tableName = db.department.tableName;

		this.columnMapping = Object.freeze({
			id: this.model.rawAttributes[this.fieldMapping.id].field,
			departmentName:
				this.model.rawAttributes[this.fieldMapping.departmentName].field,
			departmentSize:
				this.model.rawAttributes[this.fieldMapping.departmentSize].field,
		});

		this.filters = Object.freeze({
			id: (id) => {
				validateUuid(id, "user config");
				return {
					[this.fieldMapping.id]: {
						[Op.eq]: id,
					},
				};
			},
			username: (username) => {
				validateStringLength(username, "username", undefined, 255);
				return {
					[this.fieldMapping.username]: {
						[Op.like]: `%${username}%`,
					},
				};
			},
			name: (name) => {
				validateStringLength(name, "name", undefined, 255);
				return {
					[this.fieldMapping.name]: {
						[Op.like]: `%${name}%`,
					},
				};
			},
			gender: (gender) => {
				validateStringLength(gender, "gender", undefined, 255);
				return {
					[this.fieldMapping.gender]: {
						[Op.like]: `%${gender}%`,
					},
				};
			},
		});

		this.associations = Object.freeze({
			accountFilter: "accountFilter",
		});
	}
}
const departmentConfig = new DepartmentConfig();
// deepFreeze(userConfig)

module.exports = departmentConfig;
