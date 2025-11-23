import Button from "@components/extras/button";
import Card from "@components/extras/card";
import UserPhoto from "@components/extras/user-photo";
import { faker } from "@faker-js/faker";
import { sizeIcon } from "@libs/client/helpers";
import { EnvelopeIconSolid } from "@vigilio/react-icons";

export default function UsersList() {
    return (
        <Card className="flex flex-col gap-4  p-6">
            <div class="flex justify-between items-center">
                <div />
                <Button type="button">Ver todos</Button>
            </div>
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="flex gap-2 justify-start items-start"
                >
                    <UserPhoto
                        user={{
                            photo: [
                                {
                                    file: faker.image.avatar(),
                                    name: "Lorem, ipsum dolor.",
                                    size: 100,
                                    dimension: 100,
                                },
                            ],
                            user_name: "Lorem, ipsum dolor.",
                            id: 1,
                        }}
                        size="sm"
                        className="!rounded-lg"
                    />
                    <div className="flex flex-col w-full">
                        <div className="flex items-center gap-2 justify-between ">
                            <span className="font-semibold  !text-start">
                                Lorem, ipsum dolor.
                            </span>
                            <span className="text-gray-500 text-sm !text-end">
                                Hace 10 minutos
                            </span>
                        </div>
                        <div className="text-gray-500 text-sm flex items-center gap-2 fill-gray-500  !text-start">
                            <span className="flex items-center gap-2">
                                <EnvelopeIconSolid {...sizeIcon.small} />
                            </span>
                            <p>Lorem ipsum dolor@mail.com</p>
                        </div>
                    </div>
                </div>
            ))}
        </Card>
    );
}
