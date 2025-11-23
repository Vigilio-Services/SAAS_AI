/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("programa_item", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            description: {
                type: Sequelize.STRING(3000),
            },
            image: {
                type: Sequelize.JSON,
            },
            programa_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "programa",
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

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "programa_item_name_idx" ON "programa_item" ("name");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "programa_item_name_idx";
      `);
        await queryInterface.dropTable("programa_item");
    },
};
