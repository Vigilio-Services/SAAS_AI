require("dotenv").config({ path: ".env" });

module.exports = {
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
        max: 50,
        min: 15,
        acquire: 30000,
        idle: 30000,
        evict: 10000,
    },

    retry: {
        max: 3,
        match: [
            /SequelizeConnectionError/,
            /SequelizeConnectionRefusedError/,
            /SequelizeHostNotFoundError/,
            /SequelizeHostNotReachableError/,
            /SequelizeInvalidConnectionError/,
            /SequelizeConnectionTimedOutError/,
        ],
    },

    dialectOptions: {
        useUTC: true,
        timezone: "Etc/UTC",
        connectTimeout: 10000,
    },

    timezone: "+00:00",

    define: {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    },
};
