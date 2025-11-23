/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Crear la tabla coupon
        await queryInterface.createTable("coupon", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            code: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            coupon_code: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },
            percentaje: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            limit: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "user", // Asegúrate de que este sea el nombre correcto de la tabla de usuarios
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "coupon_code_idx" ON "coupon" ("code");
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "coupon_coupon_code_idx" ON "coupon" ("coupon_code");
          `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            DROP INDEX IF EXISTS "coupon_code_idx";
          `);
        await queryInterface.sequelize.query(`
            DROP INDEX IF EXISTS "coupon_coupon_code_idx";
          `);

        // Eliminar la tabla
        await queryInterface.dropTable("coupon");
    },
};
