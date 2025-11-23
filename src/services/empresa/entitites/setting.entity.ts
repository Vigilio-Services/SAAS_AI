import type { V } from "@config/server/const";
import { FilesSchema } from "@services/uploads/schemas/uploads.schema";
import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from "sequelize-typescript";
import { SettingSchema } from "../schemas/setting.schema";
import { EmpresaEntity } from "./empresa.entity";

@Table({ tableName: "setting", timestamps: false })
export class SettingEntity
    extends Model<SettingSchema, Omit<SettingSchema, "id">>
    implements SettingSchema
{
    declare id: number;

    /* ---------- colores ---------- */
    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_responsive: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_secondary: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_header: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_footer: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_aside: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare text_color: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_button: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_background: string;

    @Column({ type: DataType.STRING(30), allowNull: false })
    declare bg_color_page: string;

    /* ---------- settings visuales ---------- */
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_dark: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_border: SettingSchema["type_border"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare background_position: SettingSchema["background_position"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare background_type: SettingSchema["background_type"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare font_face: SettingSchema["font_face"];

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare logo_width: number;

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_icons_bars: SettingSchema["type_icons_bars"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare hamburger: SettingSchema["hamburger"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_start: SettingSchema["type_start"];

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare position_header: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    declare border_title_type: SettingSchema["border_title_type"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_loader: SettingSchema["type_loader"];

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    declare only_loader_home: boolean;

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_card: SettingSchema["type_card"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_product_buttons: SettingSchema["type_product_buttons"];

    @Column({ type: DataType.STRING, allowNull: false })
    declare type_arrow: SettingSchema["type_arrow"];

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare products_limit: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    declare products_limit_offer: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    declare web_script: string;

    /* ---------- multimedia ---------- */
    @Column({ type: DataType.JSON, allowNull: true })
    declare background_auth: FilesSchema[];

    @Column({ type: DataType.JSON, allowNull: true })
    declare background_blogs: FilesSchema[];

    /* ---------- booleanos ---------- */
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_cover_image: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_logo_image: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_subcategory: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_block_aside: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_hidden_total_cart: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_hover_product: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_product_wallpaper: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_ecommerce: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_login: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    declare is_cuota: boolean;

    /* ---------- secciones ---------- */
    @Column({ type: DataType.JSON, allowNull: false })
    declare shows: SettingSchema["shows"];

    @Column({ type: DataType.JSON, allowNull: false })
    declare header_position: SettingSchema["header_position"];

    /* ---------- multilenguaje ---------- */
    @Column({ type: DataType.JSON, allowNull: true })
    declare multi_lenguaje: SettingSchema["multi_lenguaje"];

    /* ---------- RELACIONES ---------- */
    @ForeignKey(() => EmpresaEntity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    declare empresa_id: number;

    @BelongsTo(() => EmpresaEntity)
    declare empresa: V<EmpresaEntity>;
}
