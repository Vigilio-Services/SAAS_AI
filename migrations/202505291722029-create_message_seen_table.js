/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("message_seen", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            message_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "message",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "user",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            time: {
                type: Sequelize.DATE,
            },
        });
        await queryInterface.sequelize.query(`
            DO $$
            BEGIN
              IF NOT EXISTS (
                SELECT 1
                FROM pg_constraint
                WHERE conname = 'message_seen_user_message_unique'
              ) THEN
                ALTER TABLE message_seen
                ADD CONSTRAINT message_seen_user_message_unique
                UNIQUE (user_id, message_id);
              END IF;
            END $$;
          `);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeConstraint(
            "message_seen",
            "message_seen_user_message_unique"
        );
        await queryInterface.dropTable("message_seen");
    },
};
