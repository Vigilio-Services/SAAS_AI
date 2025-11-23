/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("curso", {
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
            code: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: true,
            },
            academic_hours: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            siglas: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            information: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            presentation_media: {
                type: Sequelize.STRING(1000),
            },
            slug: {
                type: Sequelize.STRING(500),
                allowNull: false,
                unique: true,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            enabled_payment: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            campaña_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "campaña",
                    key: "id",
                },
            },
            curso_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "curso_type",
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
            deleted_at: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "curso_name_idx" ON "curso" ("name");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "curso_code_idx" ON "curso" ("code");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "curso_siglas_idx" ON "curso" ("siglas");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "curso_slug_idx" ON "curso" ("slug");
          `);

        // Crear índice único compuesto condicional
        await queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "unique_name_siglas_campaña_id" 
            ON "curso" ("name", "siglas", "campaña_id");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "curso_name_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "curso_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "curso_siglas_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "curso_slug_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "unique_name_siglas_campaña_id";
      `);
        await queryInterface.dropTable("curso");
    },
};
