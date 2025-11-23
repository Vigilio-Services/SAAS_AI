/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("asistencia", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            estado: {
                type: Sequelize.STRING(30),
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            fecha: {
                type: Sequelize.DATE,
            },
            observaciones: {
                type: Sequelize.STRING(3000),
            },
            justificacion_file: {
                type: Sequelize.JSON,
            },
            clase_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "clase",
                    key: "id",
                },
            },
            user_student_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
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
        await queryInterface.dropTable("asistencia");
    },
};
