/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("pregunta", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING(50),
            },
            question: {
                type: Sequelize.TEXT("long"),
            },
            puntos: {
                type: Sequelize.INTEGER,
            },
            is_punto_parciales: {
                type: Sequelize.BOOLEAN,
            },
            retro_alimentacion: {
                type: Sequelize.STRING(3000),
            },
            respuesta: {
                type: Sequelize.STRING(3000),
            },
            enabled: {
                type: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable("pregunta");
    },
};
