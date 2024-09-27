const { StatusCodes } = require("http-status-codes");
const DepartmentService = require("../service/DepartmentService");

class DepartmentController {
	constructor() {
		this.departmentService = new DepartmentService();
	}

	async post(settingsConfig, req, res, next) {
		try {
			const logger = settingsConfig.logger;
			logger.info(`[UserController] : Inside createUser`);

			const newDepartment = await this.departmentService.createDepartment(
				settingsConfig,
				req.body
			);

			res.status(StatusCodes.CREATED).json(newDepartment);
			return;
		} catch (error) {
			next(error);
		}
	}

	async getA(settingsConfig, req, res, next) {
		try {
			const logger = settingsConfig.logger;
			logger.info(`[UserController] : Inside getAllUsers`);

			const queryParams = req.query;
			const { count, rows } = await this.departmentService.getAllDepartment(
				settingsConfig,
				queryParams
			);
			res.set("X-Total-Count", count);
			res.status(StatusCodes.OK).json(rows);
			return res.status(200).send("data fetched");
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new DepartmentController();
