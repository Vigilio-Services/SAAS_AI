import { Badge } from "@components/extras/badge";
import Button from "@components/extras/button";
import Card from "@components/extras/card";
import ErrorComponent from "@components/extras/error";
import FilterSystem from "@components/extras/filter-system";
import Modal from "@components/extras/modal";
import Paginator from "@components/extras/pagination";
import Form from "@components/form";
import { useAuthContext } from "@contexts/auth.context";
import { useEmpresaContext } from "@contexts/empresa.context";
import {
    getFilesEdit,
    getQuery,
    handlerError,
    sizeIcon,
} from "@libs/client/helpers";
import { printFileWithDimension } from "@libs/index";
import { useSignal } from "@preact/signals";
import { extensions, typeTextExtensions } from "@services/uploads/libs/client";
import usePaginator from "@vigilio/preact-paginator";
import {
    CircleCheckIconSolid,
    DownloadIconSolid,
    EyeIconSolid,
    FileIconSolid,
    FilePdfIconSolid,
    FilesIconSolid,
    FileWordIconSolid,
    FloppyDiskIconSolid,
    MusicIconSolid,
    PenToSquareIconSolid,
    PlusIconSolid,
    TrashIconSolid,
} from "@vigilio/react-icons";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import { useEffect } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { useForm } from "react-hook-form";
import {
    fileDestroyApi,
    fileIndexApi,
    fileStoreApi,
    fileUpdateFileApi,
} from "../apis/file.api";
import {
    FileStoreClientDto,
    FileUpdateClientDto,
    fileStoreClientDto,
    fileUpdateFileDto,
} from "../dtos/file.dto";
import { FileSchema, FileSchemaFromServer } from "../schemas/file.schema";

export function FileIndex() {
    const authContext = useAuthContext();
    const isFileStoreOpen = useSignal(false);

    return (
        <FilterSystem<FileSchema>
            filterGroups={[
                {
                    key: "created_at",
                    label: "Fecha de creación",
                    type: "date-preset",
                },
            ]}
        >
            {(filters) => {
                const paginator = usePaginator();

                const filesIndexQuery = fileIndexApi(paginator, filters);
                const chooseImage = useSignal<null | string>(null);
                let component: JSX.Element | JSX.Element[] | null = null;
                if (filesIndexQuery.isLoading) {
                    component = (
                        <div class="animate-pulse flex flex-col w-full gap-4">
                            <div class="flex justify-between items-center gap-2">
                                <div class="h-10 bg-gray-200 rounded-2xl w-[200px]" />
                                <div class="h-10 bg-gray-200 rounded-2xl w-[200px]" />
                            </div>
                            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500px] items-start">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <div
                                        key={index}
                                        class="h-[200px] bg-gray-200 rounded-2xl w-full"
                                    />
                                ))}
                            </div>
                        </div>
                    );
                }
                if (filesIndexQuery.isError) {
                    component = (
                        <ErrorComponent
                            message={
                                filesIndexQuery.error?.message ||
                                "Error al cargar los archivos"
                            }
                        />
                    );
                }
                if (filesIndexQuery.isSuccess) {
                    const files = filesIndexQuery.data?.results;
                    const filesDestroyMutate = fileDestroyApi();
                    const query = getQuery("file");
                    const isFileEdit = useSignal<null | FileSchemaFromServer>(
                        null
                    );

                    useEffect(() => {
                        filesIndexQuery.refetch(false);
                    }, [
                        paginator.pagination.value.offset,
                        paginator.pagination.value.limit,
                        filters.filters,
                        filters.search?.debounce,
                    ]);

                    component = (
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between items-center">
                                <Button
                                    className="flex gap-2 items-center"
                                    type="button"
                                    onClick={() => {
                                        isFileStoreOpen.value = true;
                                    }}
                                >
                                    <PlusIconSolid {...sizeIcon.medium} />
                                    Nuevo archivo
                                </Button>
                                <div class="flex gap-2">
                                    <FilterSystem.search />
                                    {/* <FilterSystem.filters_custom.date_preset  /> */}
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[500px] items-start">
                                {files?.length ? (
                                    files?.map((file) => {
                                        const filed = printFileWithDimension(
                                            file.file,
                                            null
                                        );
                                        const getUltimo = filed[0]
                                            ?.split("/")
                                            .pop();

                                        return (
                                            <Card
                                                className={`relative ${
                                                    getUltimo ===
                                                        chooseImage.value ||
                                                    query
                                                        ? "border-2 border-primary"
                                                        : ""
                                                } p-4 `}
                                                key={file.id}
                                            >
                                                {[
                                                    ".jpg",
                                                    ".jpeg",
                                                    ".webp",
                                                    ".jpeg",
                                                    "png",
                                                ].some((ext) =>
                                                    filed[0]?.endsWith(ext)
                                                ) ? (
                                                    <img
                                                        width={200}
                                                        alt=""
                                                        class="w-full h-[160px] object-contain rounded-md"
                                                        src={filed[0]}
                                                    />
                                                ) : [
                                                      ".mp4",
                                                      ".mov",
                                                      ".avi",
                                                      ".mkv",
                                                      ".webm",
                                                  ].some((ext) =>
                                                      filed[0]?.endsWith(ext)
                                                  ) ? (
                                                    <video
                                                        width={200}
                                                        class="w-full h-[200px] object-contain rounded-md"
                                                        loop
                                                        muted
                                                        autoPlay
                                                        src={filed[0]}
                                                    />
                                                ) : [
                                                      ".mp3",
                                                      ".wav",
                                                      ".ogg",
                                                      ".m4a",
                                                      ".aac",
                                                      ".flac",
                                                      ".wma",
                                                  ].some((ext) =>
                                                      filed[0]?.endsWith(ext)
                                                  ) ? (
                                                    <div class="flex flex-col gap-2 justify-center items-center">
                                                        <MusicIconSolid
                                                            {...sizeIcon.xxlarge}
                                                        />

                                                        <audio
                                                            class="w-full h-[200px] object-contain"
                                                            controls
                                                            loop
                                                            muted
                                                            autoPlay
                                                            src={filed[0]}
                                                        />
                                                    </div>
                                                ) : filed[0]?.endsWith(
                                                      ".pdf"
                                                  ) ? (
                                                    <div class="w-[100px] h-[100px] mx-auto flex justify-center items-center">
                                                        <FilePdfIconSolid
                                                            {...sizeIcon.xxlarge}
                                                        />
                                                    </div>
                                                ) : filed[0].endsWith(
                                                      ".docx"
                                                  ) ? (
                                                    <div class="w-[100px] h-[100px] mx-auto flex justify-center items-center">
                                                        <FileWordIconSolid
                                                            {...sizeIcon.xxlarge}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div class="w-[100px] h-[100px] mx-auto flex justify-center items-center">
                                                        <FileIconSolid
                                                            {...sizeIcon.xxlarge}
                                                        />
                                                    </div>
                                                )}
                                                <span class="text-sm text-gray-500">
                                                    {file.name}
                                                </span>
                                                <div class="absolute top-2 right-2 gap-2 justify-between left-2 flex items-center ">
                                                    <Button
                                                        as="a"
                                                        class="bg-primary text-white fill-white w-[35px] h-[35px] flex justify-center items-center rounded-md"
                                                        href={filed[0]}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <EyeIconSolid
                                                            {...sizeIcon.small}
                                                        />
                                                    </Button>
                                                    <div class=" gap-2 flex items-center">
                                                        <Button
                                                            size="sm"
                                                            type="button"
                                                            className="!bg-orange-600 !border-orange-600 !ring-orange-600"
                                                            onClick={() => {
                                                                isFileEdit.value =
                                                                    file;
                                                            }}
                                                        >
                                                            <PenToSquareIconSolid
                                                                {...sizeIcon.small}
                                                            />
                                                        </Button>
                                                        {authContext.jwtAuth!([
                                                            "super-admin",
                                                        ]) ? (
                                                            <Button
                                                                type="button"
                                                                variant="danger"
                                                                size="sm"
                                                                onClick={() => {
                                                                    sweetModal({
                                                                        title: "¿Estas seguro de eliminar este archivo?",
                                                                        text: "Puede que tu web falle al borrar algunos archivos",
                                                                        showCancelButton:
                                                                            false,
                                                                        isCloseInBackground:
                                                                            false,
                                                                        showCloseButton:
                                                                            true,
                                                                    }).then(
                                                                        ({
                                                                            isConfirmed,
                                                                        }) => {
                                                                            if (
                                                                                isConfirmed
                                                                            ) {
                                                                                filesDestroyMutate.mutate(
                                                                                    file.id,
                                                                                    {
                                                                                        onSuccess() {
                                                                                            sweetModal(
                                                                                                {
                                                                                                    icon: "success",
                                                                                                    title: "Eliminado correctamente",
                                                                                                    showCancelButton:
                                                                                                        false,
                                                                                                }
                                                                                            );
                                                                                            filesIndexQuery.transformData(
                                                                                                (
                                                                                                    old
                                                                                                ) => {
                                                                                                    return {
                                                                                                        ...old,
                                                                                                        results:
                                                                                                            old.results.filter(
                                                                                                                (
                                                                                                                    result
                                                                                                                ) =>
                                                                                                                    result.id !==
                                                                                                                    file.id
                                                                                                            ),
                                                                                                        count:
                                                                                                            old.count -
                                                                                                            1,
                                                                                                    };
                                                                                                }
                                                                                            );
                                                                                        },
                                                                                        onError(
                                                                                            data
                                                                                        ) {
                                                                                            sweetModal(
                                                                                                {
                                                                                                    icon: "danger",
                                                                                                    title: data.message,
                                                                                                    showCancelButton:
                                                                                                        false,
                                                                                                }
                                                                                            );
                                                                                        },
                                                                                    }
                                                                                );
                                                                            }
                                                                        }
                                                                    );
                                                                }}
                                                            >
                                                                <TrashIconSolid
                                                                    {...sizeIcon.small}
                                                                />
                                                            </Button>
                                                        ) : null}
                                                    </div>
                                                </div>{" "}
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <Card className="p-4 w-full">
                                        <span className="text-gray-500 text-sm w-full">
                                            No hay archivos
                                        </span>
                                    </Card>
                                )}
                            </div>
                            {/* STORE */}
                            <Modal
                                isOpen={isFileStoreOpen.value}
                                onClose={() => {
                                    isFileStoreOpen.value = false;
                                }}
                                contentClassName="w-full max-w-xl"
                                content={
                                    <div className="flex flex-col gap-4 font-bold text-2xl">
                                        <span className="flex items-center gap-2 fill-white">
                                            <FilesIconSolid
                                                {...sizeIcon.large}
                                            />
                                            Nuevo archivo
                                        </span>
                                    </div>
                                }
                            >
                                <FileStore
                                    refetch={(data) => {
                                        filesIndexQuery.transformData((old) => {
                                            return {
                                                ...old,
                                                results: [data, ...old.results],
                                                count: old.count + 1,
                                            };
                                        });
                                        isFileStoreOpen.value = false;
                                    }}
                                />
                            </Modal>
                            {/* UPDATE */}
                            <Modal
                                isOpen={!!isFileEdit.value}
                                onClose={() => {
                                    isFileEdit.value = null;
                                }}
                                contentClassName="w-full max-w-xl"
                                content={
                                    <div className="flex flex-col gap-4 font-bold text-2xl">
                                        <span className="flex items-center gap-2 fill-white">
                                            <FilesIconSolid
                                                {...sizeIcon.large}
                                            />
                                            Editar archivo{" "}
                                            {isFileEdit.value?.name}
                                        </span>
                                    </div>
                                }
                            >
                                <FileUpdate
                                    refetch={(data) => {
                                        filesIndexQuery.transformData((old) => {
                                            return {
                                                ...old,
                                                results: old.results.map(
                                                    (result) =>
                                                        result.id === data.id
                                                            ? data
                                                            : result
                                                ),
                                            };
                                        });
                                    }}
                                    file={isFileEdit.value!}
                                />
                            </Modal>
                            <Paginator
                                paginator={paginator}
                                isFetching={filesIndexQuery.isFetching || false}
                            />
                        </div>
                    );
                }

                return (
                    <div>
                        <div class="mt-4">{component}</div>
                    </div>
                );
            }}
        </FilterSystem>
    );
}

interface FileStoreProps {
    refetch: (data: FileSchemaFromServer) => void;
}
export function FileStore({ refetch }: FileStoreProps) {
    const authContext = useAuthContext();
    const fileStoreMutation = fileStoreApi();
    const fileStoreForm = useForm<FileStoreClientDto>({
        resolver: valibotResolver(fileStoreClientDto),
        mode: "all",
    });
    function onFileStore(body: FileStoreClientDto) {
        sweetModal({
            title: "¿Estás seguro de crear este archivo?",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                fileStoreMutation.mutate(body, {
                    onSuccess(data) {
                        refetch({
                            ...data.file,
                            user: authContext.user!,
                        });
                        fileStoreForm.reset();
                        sweetModal({
                            icon: "success",
                            title: "Archivo creado correctamente",
                            showCancelButton: false,
                        });
                    },
                    onError(error) {
                        handlerError(
                            fileStoreForm,
                            error,
                            "Error al crear el archivo"
                        );
                    },
                });
            }
        });
    }
    return (
        <div>
            <Form onSubmit={onFileStore} {...fileStoreForm}>
                <Form.control<FileStoreClientDto>
                    ico={<FileIconSolid />}
                    title="Nombre del archivo"
                    type="text"
                    name="name"
                    required
                />
                <Form.control.file<FileStoreClientDto>
                    title="Archivo"
                    name="file"
                    accept="*"
                    typeFile="file"
                    showButonCopy
                    required
                    typesText={typeTextExtensions(
                        Object.values(extensions).flat()
                    )}
                />
                <Form.button.submit
                    ico={
                        <FloppyDiskIconSolid
                            {...sizeIcon.medium}
                            className="fill-white"
                        />
                    }
                    title="Guardar archivo"
                    loading_title="Guardando archivo"
                    disabled={fileStoreMutation.isLoading || false}
                    isLoading={fileStoreMutation.isLoading || false}
                />
            </Form>
        </div>
    );
}

interface FileUpdateProps {
    file: FileSchemaFromServer;
    refetch: (data: FileSchemaFromServer) => void;
}
export function FileUpdate({ file, refetch }: FileUpdateProps) {
    const fileUpdateMutation = fileUpdateFileApi(file.id);
    const empresaContext = useEmpresaContext();
    const fileUpdateForm = useForm<FileUpdateClientDto>({
        resolver: valibotResolver(fileUpdateFileDto),
        mode: "all",
        defaultValues: async () => {
            const result = await getFilesEdit(file.file, null);
            return {
                file: result,
                name: file.name,
            };
        },
    });
    function onFileUpdate(body: FileUpdateClientDto) {
        sweetModal({
            title: "¿Estás seguro de actualizar este archivo?",
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                fileUpdateMutation.mutate(
                    { ...body, name: file.name },
                    {
                        onSuccess(data) {
                            refetch({
                                ...file,
                                file: data.files,
                                history: [
                                    data.files[0].file,
                                    ...(file.history || []),
                                ],
                            });
                            empresaContext.updateFile({
                                id: file.id,
                                name: file.name,
                                file: data.files,
                            });
                            sweetModal({
                                icon: "success",
                                title: "Archivo actualizado correctamente",
                                showCancelButton: false,
                            });
                        },
                        onError(error) {
                            handlerError(
                                fileUpdateForm,
                                error,
                                "Error al actualizar el archivo"
                            );
                        },
                    }
                );
            }
        });
    }

    return (
        <div>
            <Form onSubmit={onFileUpdate} {...fileUpdateForm}>
                <Form.control<FileUpdateClientDto>
                    ico={<FileIconSolid />}
                    title="Nombre del archivo"
                    type="text"
                    disabled
                    name="name"
                    required
                />
                <Form.control.file<FileUpdateClientDto>
                    title="Archivo"
                    name="file"
                    accept="*"
                    typeFile="file"
                    showButonCopy
                    required
                    typesText={typeTextExtensions(
                        Object.values(extensions).flat()
                    )}
                />
                {file.history.length ? (
                    <Card className="p-4 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                        <div class="flex justify-between gap-2">
                            <div />
                            <div>
                                <span className="text-gray-500 text-sm flex items-center gap-1 fill-gray-500">
                                    <FilesIconSolid {...sizeIcon.small} /> Hay{" "}
                                    {file.history.length}{" "}
                                    {file.history.length > 1
                                        ? "archivos"
                                        : "archivo"}
                                </span>
                            </div>
                        </div>
                        {file.history.map((history) => (
                            <div key={history} class="flex gap-2 items-center">
                                <Badge
                                    as="a"
                                    href={`/${history}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gray-500 text-sm flex items-center justify-between gap-2 w-full"
                                >
                                    {history}
                                    <div class="flex gap-2 items-center">
                                        <Button
                                            as="a"
                                            type="button"
                                            size="sm"
                                            download
                                            variant="primary"
                                        >
                                            <DownloadIconSolid
                                                {...sizeIcon.small}
                                            />
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                        >
                                            <CircleCheckIconSolid
                                                {...sizeIcon.small}
                                            />
                                        </Button>
                                    </div>
                                </Badge>
                            </div>
                        ))}
                    </Card>
                ) : (
                    <></>
                )}
                <Form.button.submit
                    isLoading={fileUpdateMutation.isLoading || false}
                    loading_title="Actualizando"
                    disabled={fileUpdateMutation.isLoading || false}
                    title="Actualizar"
                />
            </Form>
        </div>
    );
}
