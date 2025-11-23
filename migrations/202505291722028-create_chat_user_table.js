/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("chat_user", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            chat_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "chat",
                    key: "id",
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            last_message_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "message",
                    key: "id",
                },
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("chat_user");
    },
};
