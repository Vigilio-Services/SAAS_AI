/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("opcion", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            text: {
                type: Sequelize.STRING(1000),
            },
            is_correct: {
                type: Sequelize.BOOLEAN,
            },
            pregunta_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "pregunta",
                    key: "id",
                },
            },
            enabled: {
                type: Sequelize.BOOLEAN,
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
            CREATE UNIQUE INDEX IF NOT EXISTS "unique_text_pregunta_id" 
            ON "opcion" ("text", "pregunta_id");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "unique_text_pregunta_id";
      `);
        await queryInterface.dropTable("opcion");
    },
};
