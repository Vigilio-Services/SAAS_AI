/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("comment", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            content: {
                type: Sequelize.STRING(3000),
            },
            enabled: {
                type: Sequelize.BOOLEAN,
            },
            reported_users: {
                type: Sequelize.JSON,
            },
            likes_users: {
                type: Sequelize.JSON,
            },
            unlikes_users: {
                type: Sequelize.JSON,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            commentable_type: {
                type: Sequelize.STRING(50),
            },
            commentable_id: {
                type: Sequelize.INTEGER,
            },
            comment_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "comment",
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
        await queryInterface.dropTable("comment");
    },
};
