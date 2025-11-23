/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("curso_descripcion", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            presentation: {
                type: Sequelize.STRING(3000),
                allowNull: false,
            },
            importance: {
                type: Sequelize.STRING(3000),
                allowNull: false,
            },
            result: {
                type: Sequelize.STRING(3000),
                allowNull: false,
            },
            curso_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "curso",
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
        await queryInterface.dropTable("curso_descripcion");
    },
};
