const db = require("../../models")
const user = require("../../models/user")
const { validateStringLength } = require("../utils/string")
const { validateUuid } = require("../utils/uuid")
const { Op, Sequelize } = require("sequelize")
class UserConfig {
    constructor() {
        this.fieldMapping = Object.freeze(
            {
                id: "id",
                firstName: "firstName",
                lastName: "lastName",
                email: "email",
                gender: "gender",
                age: "age",
                dob: "dob",
                profession: "profession",
            }
        )
        this.model = db.User
        this.modelName = db.User.name
        this.tableName = db.User.tableName

        this.columnMapping = Object.freeze({
            id: this.model.rawAttributes[this.fieldMapping.id].field,
            firstName: this.model.rawAttributes[this.fieldMapping.firstName].field,
            lastName: this.model.rawAttributes[this.fieldMapping.lastName].field,
            email: this.model.rawAttributes[this.fieldMapping.email].field,
            gender: this.model.rawAttributes[this.fieldMapping.gender].field,
            age: this.model.rawAttributes[this.fieldMapping.age].field,
            dob: this.model.rawAttributes[this.fieldMapping.dob].field,
            profession: this.model.rawAttributes[this.fieldMapping.profession].field,
          })
   
        this.filters = Object.freeze({
            id: (id) => {
                validateUuid(id, "user config")
                return {
                    [this.fieldMapping.id]: {
                        [Op.eq]: id
                    }
                }
            },
            username: (username) => {
                validateStringLength(username, "username", undefined, 255)
                return {
                    [this.fieldMapping.username]: {
                        [Op.like]: `%${username}%`
                    }
                }
            },
            name: (name) => {
                validateStringLength(name, "name", undefined, 255)
                return {
                    [this.fieldMapping.name]: {
                        [Op.like]: `%${name}%`
                    }
                }
            },
            gender: (gender) => {
                validateStringLength(gender, "gender", undefined, 255)
                return {
                    [this.fieldMapping.gender]: {
                        [Op.like]: `%${gender}%`
                    }
                }
            },
        })

        this.associations = Object.freeze({
            accountFilter:'accountFilter',
        })
    }
}
const userConfig = new UserConfig()
// deepFreeze(userConfig)

module.exports = userConfig
