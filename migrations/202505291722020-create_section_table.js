/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("section", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT("long"),
            },
            type_description: {
                type: Sequelize.STRING,
            },
            type_section: {
                type: Sequelize.STRING,
            },
            files: {
                type: Sequelize.JSON,
            },
            file_video: {
                type: Sequelize.JSON,
            },
            video_youtube: {
                type: Sequelize.STRING(2000),
            },
            size: {
                type: Sequelize.STRING(100),
            },
            order: {
                type: Sequelize.INTEGER,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            comments_enabled: {
                type: Sequelize.BOOLEAN,
            },
            actividad_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "actividad",
                    key: "id",
                },
            },
            section_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "section",
                    key: "id",
                },
            },
            curso_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "curso",
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
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("section");
    },
};
