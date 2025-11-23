/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("curso_multimedia", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.JSON,
            },
            wallpaper: {
                type: Sequelize.JSON,
            },
            wallpaper_mobile: {
                type: Sequelize.JSON,
            },
            brochure: {
                type: Sequelize.JSON,
            },
            certificado_example: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable("curso_multimedia");
    },
};
