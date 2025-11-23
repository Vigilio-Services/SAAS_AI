/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("actividad", {
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
                type: Sequelize.STRING(1000),
            },
            date_start: {
                type: Sequelize.DATE,
            },
            date_entregado: {
                type: Sequelize.DATE,
            },
            date_limit: {
                type: Sequelize.DATE,
            },
            time_minutes: {
                type: Sequelize.INTEGER,
            },
            max_puntaje: {
                type: Sequelize.DECIMAL(10, 1),
            },
            time_oportunity: {
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.TEXT("long"),
            },
            observacion: {
                type: Sequelize.STRING(3000),
            },
            enabled_aleatorio: {
                type: Sequelize.BOOLEAN,
            },
            percentaje: {
                type: Sequelize.DECIMAL(10, 2),
            },
            is_automatic_revision: {
                type: Sequelize.BOOLEAN,
            },
            is_revision_ai: {
                type: Sequelize.BOOLEAN,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            is_choose_users: {
                type: Sequelize.BOOLEAN,
            },
            curso_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "curso",
                    key: "id",
                },
            },
            programa_item_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "programa_item",
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
            actividad_type_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "actividad_type",
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
            CREATE INDEX IF NOT EXISTS "actividad_code_idx" ON "actividad" ("code");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "actividad_code_idx";
      `);
        await queryInterface.dropTable("actividad");
    },
};
