/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("icon", {
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
            name: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            icon: {
                type: Sequelize.TEXT("long"),
                unique: true,
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
            CREATE INDEX IF NOT EXISTS "icon_code_idx" ON "icon" ("code");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "icon_name_idx" ON "icon" ("name");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "icon_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "icon_name_idx";
      `);
        await queryInterface.dropTable("icon");
    },
};
