/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("order", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            code: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            kind_invoice_code: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            razon_social: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            documento_code: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            documento: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            monto_type: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            observacion: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            transaccion: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            boucher_file: {
                type: Sequelize.JSON,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            metodo_pago: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            total: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            },
            curso_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "curso",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            coupon_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "coupon",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            user_student_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            user_administracion_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        });

        // Agregar índices
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS order_code_idx ON "order" (code)
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS order_coupon_id_idx ON "order" (coupon_id)
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS order_user_student_id_idx ON "order" (user_student_id)
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS order_user_administracion_id_idx ON "order" (user_administracion_id)
          `);
    },

    async down(queryInterface, Sequelize) {
        // Eliminar índices con consultas SQL directas
        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS order_user_administracion_id_idx
        `);
        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS order_user_student_id_idx
        `);
        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS order_coupon_id_idx
        `);
        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS order_tarifa_student_id_idx
        `);

        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS order_code_idx
        `);
        await queryInterface.dropTable("order");
    },
};
