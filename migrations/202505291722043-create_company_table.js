/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("company", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            ruc: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            razon_social: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            nombre_comercial: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            sol_user: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            sol_pass: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            client_id: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            client_secret: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            certificado_password: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            mode: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            logo_facturacion: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            certificado_digital: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            empresa_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "empresa",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });

        // Índice para acelerar búsquedas por RUC
        await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS "company_ruc_idx" ON "company" ("ruc");
    `);
        await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS "empresa_id_idx" ON "company" ("empresa_id");
    `);
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "company_ruc_idx";
      `);
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "empresa_id_idx";
      `);
        await queryInterface.dropTable("company");
    },
};
