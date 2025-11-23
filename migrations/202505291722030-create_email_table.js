/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("email", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            subject: {
                type: Sequelize.STRING(1000),
            },
            body: {
                type: Sequelize.STRING(3000),
            },
            files: {
                type: Sequelize.JSON,
            },
            videos: {
                type: Sequelize.JSON,
            },
            images: {
                type: Sequelize.JSON,
            },
            sender_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            email_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "email",
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
        await queryInterface.dropTable("email");
    },
};
