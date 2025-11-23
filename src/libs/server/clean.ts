// import cron from "node-cron";
// import fs from "fs/promises";
// import path from "path";
// import { Sequelize } from "sequelize"; // o donde tengas importado Sequelize

// cron.schedule("0 2 * * *", async () => {
//     // const cutoffDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 días atrás (3 meses)
//     // const filesToDelete = await UserFile.findAll({
//     //     where: {
//     //         deleted_at: {
//     //             [Sequelize.Op.lt]: cutoffDate,
//     //         },
//     //     },
//     //     paranoid: false,
//     // });
//     // for (const fileRecord of filesToDelete) {
//     //     try {
//     //         await fs.unlink(path.resolve(fileRecord.filePath));
//     //         await fileRecord.destroy({ force: true });
//     //         console.log(`Archivo y registro borrados: ${fileRecord.id}`);
//     //     } catch (err) {
//     //         console.error("Error borrando archivo o registro:", err);
//     //     }
//     // }
// });
