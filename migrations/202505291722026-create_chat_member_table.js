/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("chat_member", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            chat_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "chat",
                    key: "id",
                },
            },
            is_admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            enabled: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            user_created_id: {
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
        await queryInterface.dropTable("chat_member");
    },
};
