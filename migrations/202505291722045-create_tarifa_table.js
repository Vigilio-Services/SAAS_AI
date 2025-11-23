/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tarifa", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            type: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            payment_type: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            curso_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "curso",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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

        // Índices para mejorar performance
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_type_idx" ON "tarifa" ("type");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_curso_id_idx" ON "tarifa" ("curso_id");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_payment_type_idx" ON "tarifa" ("payment_type");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "tarifa_type_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "tarifa_curso_id_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "tarifa_payment_type_idx";
      `);
        await queryInterface.dropTable("tarifa");
    },
};
