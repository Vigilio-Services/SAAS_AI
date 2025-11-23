/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableName = "message_seen";
        const constraintName = "message_seen_user_message_unique";

        // 1. ¿Está la restricción?
        const existing = await queryInterface
            .showConstraint(tableName, constraintName)
            .catch(() => []); // showConstraint puede fallar si la tabla no existe

        if (existing.length) return; // ya está, salimos

        // 2. Si no existe, la creamos
        await queryInterface.addConstraint(tableName, {
            fields: ["user_id", "message_id"],
            type: "unique",
            name: constraintName,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.removeConstraint(
            "message_seen",
            "message_seen_user_message_unique"
        );
    },
};
