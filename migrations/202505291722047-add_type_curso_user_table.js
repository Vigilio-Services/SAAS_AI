/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Agregar la columna type a la tabla CursoUsers
        await queryInterface.addColumn("curso_user", "type", {
            type: Sequelize.STRING(100),
            allowNull: false,
            defaultValue: "regular",
        });
    },

    async down(queryInterface, Sequelize) {
        // Remover la columna
        await queryInterface.removeColumn("CursoUsers", "type");
    },
};
