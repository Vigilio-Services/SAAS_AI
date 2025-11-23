/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("access_log", {
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
            ip: {
                type: Sequelize.STRING(1000),
            },
            address: {
                type: Sequelize.STRING(1000),
            },
            fecha_hora: {
                type: Sequelize.DATE,
            },
            browser: {
                type: Sequelize.STRING(1000),
            },
            os: {
                type: Sequelize.STRING(100),
            },
            user_id: {
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
            CREATE INDEX IF NOT EXISTS "access_log_code_idx" ON "access_log" ("code");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "access_log_code_idx";
      `);
        await queryInterface.dropTable("access_log");
    },
};
