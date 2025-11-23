/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("email_users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            email_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "email",
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
            type: {
                type: Sequelize.ENUM("inbox", "sent", "trash", "archive"),
            },
            date_read: {
                type: Sequelize.DATE,
            },
            is_starred: {
                type: Sequelize.BOOLEAN,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("email_users");
    },
};
