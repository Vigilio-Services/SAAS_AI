/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("user", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING(20),
            },
            user_name: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            full_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            father_lastname: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            mother_lastname: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING(100),
                defaultValue: "masculino",
            },
            email: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            documento_code: {
                type: Sequelize.STRING(50),
            },
            documento: {
                type: Sequelize.STRING(100),
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
            },
            profesion: {
                type: Sequelize.STRING(100),
            },
            presentation: {
                type: Sequelize.TEXT,
            },
            photo: {
                type: Sequelize.JSON,
            },
            is_register_automatic: {
                type: Sequelize.BOOLEAN,
            },
            wallpaper: {
                type: Sequelize.JSON,
            },
            role: {
                type: Sequelize.ENUM(
                    "super-admin",
                    "administracion",
                    "academico",
                    "docente",
                    "estudiante"
                ),
            },
            telefono: {
                type: Sequelize.STRING(30),
            },
            status: {
                type: Sequelize.STRING(30),
            },
            estudiante_status: {
                type: Sequelize.STRING(30),
            },
            intentos_session: {
                type: Sequelize.INTEGER,
            },
            intentos_session_date: {
                type: Sequelize.DATE,
            },
            ultima_conexion: {
                type: Sequelize.DATE,
            },
            address: {
                type: Sequelize.STRING(500),
            },
            subscription: {
                type: Sequelize.JSON,
            },
            slug: {
                type: Sequelize.STRING(255),
                unique: true,
            },
            enabled_notifications_webpush: {
                type: Sequelize.BOOLEAN,
            },
            user_academic_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            city_id: {
                type: Sequelize.INTEGER,
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
            deleted_at: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.sequelize.query(`
            CREATE INDEX IF NOT EXISTS "user_code_idx" ON "user" ("code");
          `);

        // Crear índice único compuesto condicional
        await queryInterface.sequelize.query(`
            CREATE UNIQUE INDEX IF NOT EXISTS "unique_full_name_father_lastname_mother_lastname" 
            ON "user" ("full_name", "father_lastname", "mother_lastname");
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`
            DROP INDEX IF EXISTS "user_code_idx";
          `);

        await queryInterface.sequelize.query(`
            DROP INDEX IF EXISTS "unique_full_name_father_lastname_mother_lastname";
          `);
        await queryInterface.dropTable("user");
    },
};
