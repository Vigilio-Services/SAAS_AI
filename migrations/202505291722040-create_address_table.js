/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("address", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            ubigeo: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            urbanizacion: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            direccion: {
                type: Sequelize.STRING(300),
                allowNull: true,
            },
            cod_local: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            city_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "city",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "RESTRICT",
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "user",
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
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "address_city_id_idx" ON "address" ("city_id");
          `);
        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "address_user_id_idx" ON "address" ("user_id");
          `);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "address_city_id_idx";
      `);
        await queryInterface.sequelize.query(`
        DROP INDEX IF EXISTS "address_user_id_idx";
      `);
        await queryInterface.dropTable("address");
    },
};
