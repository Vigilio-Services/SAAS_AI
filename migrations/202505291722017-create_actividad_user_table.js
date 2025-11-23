/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("actividad_user", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            nota: {
                type: Sequelize.INTEGER,
            },
            date_send: {
                type: Sequelize.DATE,
            },
            date_revisado: {
                type: Sequelize.DATE,
            },
            justificacion_file: {
                type: Sequelize.JSON,
            },
            is_approved_justification: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            justificacion_text: {
                type: Sequelize.STRING(3000),
            },
            status: {
                type: Sequelize.ENUM(
                    "pendiente",
                    "completado",
                    "revisado",
                    "anulado"
                ),
            },
            current_time: {
                type: Sequelize.DATE,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            user_student_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            actividad_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "actividad",
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
        await queryInterface.dropTable("actividad_user");
    },
};
