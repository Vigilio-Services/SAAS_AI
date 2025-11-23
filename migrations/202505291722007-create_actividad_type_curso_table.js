/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("actividad_type_curso", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            actividad_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "actividad_type",
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
            percentaje: {
                type: Sequelize.DECIMAL(10, 2),
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
        await queryInterface.dropTable("actividad_type_curso");
    },
};
