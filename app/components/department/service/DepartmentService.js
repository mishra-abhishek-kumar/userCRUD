const userConfig = require("../../../model-config/userConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { preloadAssociations } = require("../../../sequelize/association");
const { startTransaction } = require("../../../sequelize/transaction");
const {
	parseFilterQueries,
	parseLimitAndOffset,
	parseSelectFields,
} = require("../../../utils/request");
const departmentConfig = require("../../../model-config/departmentConfig");

class DepartmentService {
	constructor() {}

	async getAllDepartment(settingsConfig, queryParams) {
		const t = await startTransaction();
		try {
			const logger = settingsConfig.logger;
			logger.info(`[DepartmentService] : Inside getAllUsers`);

			const includeQuery = queryParams.include || [];
			let associations = [];
			// const attributesToReturn = {
			//   id: userConfig.fieldMapping.id,
			//   firstName: userConfig.fieldMapping.name,
			//   age: userConfig.fieldMapping.age,
			//   gender: userConfig.fieldMapping.gender,
			//   username: userConfig.fieldMapping.username,
			//   netWorth: userConfig.fieldMapping.netWorth,
			// };
			// let selectArray = parseSelectFields(queryParams, attributesToReturn);
			// if (!selectArray) {
			//   selectArray = Object.values(attributesToReturn);
			// }
			// if (includeQuery) {
			//   associations = this.createAssociation(includeQuery);
			// }
			const data = await departmentConfig.model.findAndCountAll({
				transaction: t,
				...parseFilterQueries(queryParams, userConfig.filters),
				// attributes: selectArray,
				...parseLimitAndOffset(queryParams),
				// ...preloadAssociations(associations),
			});
			logger.info("???????????????????????????", data);
			await t.commit();
			return data;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}

	async createDepartment(settingsConfig, body) {
		const t = await startTransaction();
		try {
			const logger = settingsConfig.logger;
			logger.info(`[DepartmentService] : Inside createDepartment`);

			console.log(body);
			const data = await departmentConfig.model.create(body, {
				transaction: t,
			});
			await t.commit();
			return data;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}

	async getUserById(settingsConfig, userId, queryParams) {
		const t = await startTransaction();
		try {
			const logger = settingsConfig.logger;
			logger.info(`[DepartmentService] : Inside getUserById`);

			const includeQuery = queryParams.include || [];
			// let associations = [];
			// const attributesToReturn = {
			// 	id: userConfig.fieldMapping.id,
			// 	name: userConfig.fieldMapping.name,
			// 	age: userConfig.fieldMapping.age,
			// 	gender: userConfig.fieldMapping.gender,
			// 	username: userConfig.fieldMapping.username,
			// 	netWorth: userConfig.fieldMapping.netWorth,
			// };
			// let selectArray = parseSelectFields(queryParams, attributesToReturn);
			// if (!selectArray) {
			// 	selectArray = Object.values(attributesToReturn);
			// }
			// if (includeQuery) {
			// 	associations = this.createAssociation(includeQuery, selectArray);
			// }
			// console.log(">>>>>>>>>>>",parseFilterQueries(queryParams, userConfig.filters,{id:userId}))

			const data = await userConfig.model.findAll({
				where: { id: userId },
				transaction: t,
			});
			await t.commit();
			return data;
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}

	async updateUser(settingsConfig, userId, body) {
		const t = await startTransaction();
		try {
			const logger = settingsConfig.logger;
			logger.info(`[DepartmentService] : Inside updateUser`);
			// const [parameter, newValue] = Object.entries(body)[0];
			// console.log(`${parameter} : ${newValue} : ${userId}`);

			for (const [parameter, newValue] of Object.entries(body)) {
				let up = undefined;
				switch (parameter) {
					case "firstName":
						up = await userConfig.model.update(
							{ firstName: newValue },
							{ where: { id: userId }, transaction: t }
						);
						break;
					case "lastName":
						up = await userConfig.model.update(
							{ lastName: newValue },
							{ where: { id: userId }, transaction: t }
						);
						break;
					case "gender":
						up = await userConfig.model.update(
							{ gender: newValue },
							{ where: { id: userId }, transaction: t }
						);
						break;
					default:
						throw new Error(`Invalid Parameter: ${parameter}`);
				}

				console.log(`Updated ${parameter}:`, up);
			}

			await t.commit(); // Commit the transaction once all updates are done
			return "Update successful!";
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}

	async deleteUser(settingsConfig, userId) {
		const t = await startTransaction();
		try {
			const logger = settingsConfig.logger;
			logger.info(`[DepartmentService] : Inside deleteUser`);

			const deletedUser = await userConfig.model.destroy({
				where: { id: userId },
				transaction: t,
			});

			if (deletedUser === 0) {
				throw new Error(`User with ID ${userId} not found`);
			}

			await t.commit();
			return { message: "User deleted successfully", deletedUserId: userId };
		} catch (error) {
			await t.rollback();
			throw error;
		}
	}
}

module.exports = DepartmentService;
