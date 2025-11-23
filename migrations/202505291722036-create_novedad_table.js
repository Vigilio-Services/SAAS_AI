/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("novedad", {
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
            title: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            description: {
                type: Sequelize.TEXT("long"),
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            archivo: {
                type: Sequelize.JSON,
            },
            portada: {
                type: Sequelize.JSON,
            },
            links: {
                type: Sequelize.JSON,
            },
            slug: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            novedad_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "novedad_type",
                    key: "id",
                },
            },
            novedad_category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "novedad_category",
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
            CREATE INDEX IF NOT EXISTS "novedad_code_idx" ON "novedad" ("code");
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "novedad_title_idx" ON "novedad" ("title");
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "novedad_slug_idx" ON "novedad" ("slug");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "novedad_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "novedad_title_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "novedad_slug_idx";
      `);
        await queryInterface.dropTable("novedad");
    },
};
