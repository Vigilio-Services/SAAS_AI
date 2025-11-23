/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("detail_order", {
            total: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: true,
            },
            tarifa_student_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "tarifa_student",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            order_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "order",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
        });

        // Agregar índices
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS detail_order_tarifa_student_id_idx ON "detail_order" (tarifa_student_id)
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS detail_order_order_id_idx ON "detail_order" (order_id)
          `);
    },

    async down(queryInterface, Sequelize) {
        // Eliminar índices con consultas SQL directas

        await queryInterface.sequelize.query(`
             DROP INDEX IF EXISTS detail_order_tarifa_id_idx 
          `);
        await queryInterface.sequelize.query(`
             DROP INDEX IF EXISTS detail_order_order_id_idx 
          `);

        await queryInterface.dropTable("order");
    },
};
