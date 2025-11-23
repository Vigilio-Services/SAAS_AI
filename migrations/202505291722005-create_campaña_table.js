/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("campaña", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING(20),
                unique: true,
            },
            name: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            initial_date: {
                type: Sequelize.DATE,
            },
            final_date: {
                type: Sequelize.DATE,
            },
            photo: {
                type: Sequelize.JSON,
            },
            slug: {
                type: Sequelize.STRING(100),
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
            deleted_at: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "campaña_code_idx" ON "campaña" ("code");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "campaña_name_idx" ON "campaña" ("name");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "campaña_slug_idx" ON "campaña" ("slug");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "campaña_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "campaña_name_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "campaña_slug_idx";
      `);
        await queryInterface.dropTable("campaña");
    },
};
