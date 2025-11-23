/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("novedad_type", {
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
                type: Sequelize.STRING(100),
                unique: true,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
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
            CREATE INDEX IF NOT EXISTS "novedad_type_code_idx" ON "novedad_type" ("code");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "novedad_type_name_idx" ON "novedad_type" ("name");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "novedad_type_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "novedad_type_name_idx";
      `);
        await queryInterface.dropTable("novedad_type");
    },
};
