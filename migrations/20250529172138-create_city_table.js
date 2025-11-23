/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("city", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            region_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "region", // nombre de tabla referenciada
                    key: "id",
                },
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("city");
    },
};
