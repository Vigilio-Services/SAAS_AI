/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("invoice", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            code: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            kind_invoice_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            serie: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            correlativo: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            razon_social: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            send_sunat: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
            },
            response_sunat: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            xml_path: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            cdr_path: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "order",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
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
      CREATE INDEX IF NOT EXISTS "invoice_order_id_idx" ON "invoice" ("order_id");
    `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS "invoice_order_id_idx";
    `);
        await queryInterface.dropTable("invoice");
    },
};
