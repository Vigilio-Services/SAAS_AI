/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("note", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            kind_invoice_code: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            code: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            kind_credit_notes_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            kind_debit_notes_code: {
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
            invoice_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "invoice",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
      CREATE INDEX IF NOT EXISTS "note_invoice_id_idx" ON "note" ("invoice_id");
    `);
        await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS "note_order_id_idx" ON "note" ("order_id");
    `);
    },

    async down(queryInterface) {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "note_invoice_id_idx";
      `);
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "note_order_id_idx";
      `);
        await queryInterface.dropTable("note");
    },
};
