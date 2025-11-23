/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("clase", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            title: {
                type: Sequelize.STRING(1000),
            },
            description: {
                type: Sequelize.TEXT("long"),
            },
            start_datetime: {
                type: Sequelize.DATE,
            },
            end_datetime: {
                type: Sequelize.DATE,
            },
            diapositivas: {
                type: Sequelize.JSON,
            },
            files: {
                type: Sequelize.JSON,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            link_clase: {
                type: Sequelize.STRING(3000),
            },
            is_choose_users: {
                type: Sequelize.BOOLEAN,
            },
            is_obligatorio: {
                type: Sequelize.BOOLEAN,
            },
            clase_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "clase_type",
                    key: "id",
                },
            },
            curso_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "curso",
                    key: "id",
                },
            },
            user_academic_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            programa_item_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "programa_item",
                    key: "id",
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("clase");
    },
};
