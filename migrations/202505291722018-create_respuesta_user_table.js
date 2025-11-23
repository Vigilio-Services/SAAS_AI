/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("respuesta_user", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            respuesta: {
                type: Sequelize.TEXT("long"),
            },
            detalle: {
                type: Sequelize.STRING(3000),
            },
            puntos: {
                type: Sequelize.INTEGER,
                defaultValue: null,
            },
            is_correct: {
                type: Sequelize.BOOLEAN,
            },
            is_revisor_ai: {
                type: Sequelize.BOOLEAN,
            },
            date_save: {
                type: Sequelize.DATE,
            },
            pregunta_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "pregunta",
                    key: "id",
                },
            },
            opcions: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            actividad_user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "actividad_user",
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
        await queryInterface.dropTable("respuesta_user");
    },
};
