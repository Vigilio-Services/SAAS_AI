/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("error_log", {
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
            username: {
                type: Sequelize.STRING(1000),
            },
            address: {
                type: Sequelize.STRING(1000),
            },
            os: {
                type: Sequelize.STRING(100),
            },
            fecha_hora: {
                type: Sequelize.DATE,
            },
            browser: {
                type: Sequelize.STRING(1000),
            },
            type: {
                type: Sequelize.ENUM(
                    "auth-email",
                    "auth-password",
                    "auth-forgot-password",
                    "email",
                    "payment"
                ),
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
            CREATE INDEX IF NOT EXISTS "error_log_code_idx" ON "error_log" ("code");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "error_log_code_idx";
      `);
        await queryInterface.dropTable("error_log");
    },
};
