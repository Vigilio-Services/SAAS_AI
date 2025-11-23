/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tarifa_student", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            tarifa_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "tarifa",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            curso_user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "curso_user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            description: {
                type: Sequelize.STRING(3000),
                allowNull: true,
            },
            type: {
                type: Sequelize.STRING(100),
                allowNull: false,
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

        // Índices compuestos para evitar duplicados y mejorar búsquedas
        await queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "unique_tarifa_curso_user" 
            ON "tarifa_student" ("tarifa_id", "curso_user_id");
          `);

        // Crear índices simples condicionales
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_student_tarifa_id_idx" ON "tarifa_student" ("tarifa_id");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_student_curso_user_id_idx" ON "tarifa_student" ("curso_user_id");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "tarifa_student_type_idx" ON "tarifa_student" ("type");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        // Eliminar índices primero
        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS "unique_tarifa_curso_user";
        `);

        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS "tarifa_student_tarifa_id_idx";
        `);

        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS "tarifa_student_curso_user_id_idx";
        `);

        await queryInterface.sequelize.query(`
          DROP INDEX IF EXISTS "tarifa_student_type_idx";
        `);
        await queryInterface.dropTable("tarifa_student");
    },
};
