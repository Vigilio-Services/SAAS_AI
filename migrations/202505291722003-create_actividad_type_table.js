/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("actividad_type", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
            },
            is_internal: {
                type: Sequelize.BOOLEAN,
            },
            percentaje: {
                type: Sequelize.DECIMAL(10, 2),
            },
            color: {
                type: Sequelize.STRING(20),
            },
            icon_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "icon",
                    key: "id",
                },
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            user_academic_id: {
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
            CREATE INDEX IF NOT EXISTS "actividad_type_code_idx" ON "actividad_type" ("code");
          `);

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "actividad_type_name_idx" ON "actividad_type" ("name");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "actividad_type_code_idx";
      `);

        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "actividad_type_name_idx";
      `);
        await queryInterface.dropTable("actividad_type");
    },
};
