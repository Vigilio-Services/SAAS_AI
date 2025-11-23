/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("empresa", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name_empresa: {
                type: Sequelize.STRING,
            },
            dial_code: {
                type: Sequelize.STRING(20),
            },
            telefono: {
                type: Sequelize.STRING(20),
            },
            model_ai_groq: {
                type: Sequelize.STRING(100),
            },
            token_ai: {
                type: Sequelize.STRING(255),
            },
            color_primary: {
                type: Sequelize.STRING(100),
            },
            timezone: {
                type: Sequelize.STRING(100),
            },
            enabled_automatic_payment: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            enabled_send_sunat: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            enabled_send_pdf: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            logo_facturacion: { type: Sequelize.JSON },
            certificado_digital: { type: Sequelize.JSON },
            address_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "address",
                    key: "id",
                },
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
            CREATE INDEX IF NOT EXISTS "address_id_idx" ON "empresa" ("address_id");
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "user_id_idx" ON "empresa" ("user_id");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "address_id_idx";
      `);
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "user_id_idx";
      `);
        await queryInterface.dropTable("empresa");
    },
};
