import { printFileWithDimension } from "@libs";
import type { UserSchemaFromServer } from "@/user/schemas/user.schema";
import { noprofilebigimg, noprofilesmallimg } from "~/config";

interface UserPhotoProps {
    user: Pick<UserSchemaFromServer, "id" | "photo" | "user_name">;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}
function UserPhoto({ user, className = "", size = "md" }: UserPhotoProps) {
    return (
        <div
            class="bg-white rounded-full"
            style={{
                width:
                    size === "sm" ? "45px" : size === "md" ? "80px" : "100px",
            }}
        >
            <img
                width={size === "sm" ? 45 : size === "md" ? 80 : 100}
                className={`  object-cover ${className} ${
                    size === "sm"
                        ? "min-w-[45px] min-h-[45px]"
                        : size === "md"
                        ? "min-w-[80px] min-h-[80px]"
                        : size === "lg"
                        ? "min-w-[100px] min-h-[100px]"
                        : size === "xl"
                        ? "min-w-[120px] min-h-[120px]"
                        : "min-w-[100px] min-h-[100px]"
                }`}
                height={size === "sm" ? 45 : size === "md" ? 80 : 100}
                src={
                    user?.photo
                        ? printFileWithDimension(user.photo, 100)[0]
                        : size === "sm"
                        ? noprofilesmallimg
                        : size === "md"
                        ? noprofilesmallimg
                        : noprofilebigimg
                }
                alt=""
            />
        </div>
    );
}

export default UserPhoto;
