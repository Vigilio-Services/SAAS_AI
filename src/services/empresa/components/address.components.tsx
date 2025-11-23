import Button from "@components/extras/button";
import ByUser from "@components/extras/by-user";
import Modal from "@components/extras/modal";
import Form from "@components/form";
import { formSelectNumber } from "@components/form/FormSelect";
import { useAuthContext } from "@contexts/auth.context";
import { handlerError, sizeIcon } from "@libs/client/helpers";
import { useSignal } from "@preact/signals";
import { unbigeoIndexApi } from "@services/ubigeo/apis/ubigeo.api";
import {
	BuildingIconSolid,
	CityIconSolid,
	GlobeIconSolid,
	LocationDotIconSolid,
	MapIconSolid,
	MapPinIconSolid,
	PenClipSlashIconSolid,
	PhoneIconSolid,
	PlusIconSolid,
} from "@vigilio/react-icons";
import { sweetModal } from "@vigilio/sweet";
import { valibotResolver } from "@vigilio/valibot/resolver";
import dayjs from "dayjs";
import { useMemo } from "preact/hooks";
import { useForm } from "react-hook-form";
import {
	addressIndexApi,
	addressStoreApi,
	addressUpdateApi,
} from "../apis/address.api";
import {
	AddressStoreDto,
	AddressUpdateDto,
	addressStoreDto,
	addressUpdateDto,
} from "../dtos/address.dto";
import { findCityById } from "../libs";
import type { AddressSchemaFromServer } from "../schemas/address.schema";

export function AddressIndex() {
	const addressUpdate = useSignal<AddressSchemaFromServer | null>(null);
	const isOpenStoreAddress = useSignal<boolean>(false);
	const addressIndexQuery = addressIndexApi();
	return (
		<>
			<div class="flex justify-between items-center gap-2 mb-2">
				<div />
				<Button
					type="button"
					onClick={() => {
						isOpenStoreAddress.value = true;
					}}
				>
					<PlusIconSolid {...sizeIcon.large} />
					Nueva dirección
				</Button>
			</div>
			{addressIndexQuery.isLoading ? <div>Cargando...</div> : null}
			{addressIndexQuery.isError ? (
				<div>{addressIndexQuery.error?.message}</div>
			) : null}
			{addressIndexQuery.isSuccess
				? addressIndexQuery.data?.data.map((address) => (
						<div
							key={address.id}
							className="rounded-2xl shadow-md p-4 my-2 bg-white border border-gray-200"
						>
							<h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
								<LocationDotIconSolid {...sizeIcon.small} />
								Dirección {address.id}
							</h2>
							<div class="flex gap-2 justify-between">
								<div>
									{/* Ciudad */}
									<div className="flex items-center gap-2 text-gray-700 mb-2">
										<BuildingIconSolid {...sizeIcon.small} />
										<span>{address.direccion}</span>
									</div>
									{/* Ciudad */}
									<div className="flex items-center gap-2 text-gray-700 mb-2">
										<CityIconSolid {...sizeIcon.small} />
										<span>{address.city.name}</span>
									</div>

									{/* Región */}
									<div className="flex items-center gap-2 text-gray-700 mb-2">
										<MapIconSolid {...sizeIcon.small} />
										<span>
											{address.city.region.name} ({address.city.region.code})
										</span>
									</div>

									{/* País */}
									<div className="flex items-center gap-2 text-gray-700 mb-2">
										<GlobeIconSolid {...sizeIcon.small} />
										<span>
											{address.city.region.country.name} (
											{address.city.region.country.code})
										</span>
									</div>
									{/* Código telefónico */}
									<div className="flex items-center gap-2 text-gray-700  mb-2">
										<PhoneIconSolid {...sizeIcon.small} />
										<span>+{address.city.region.country.dial_code}</span>
									</div>
									<div class="flex gap-2">
										<div className="flex items-center gap-2 text-gray-700">
											<span>Código de local: {address.cod_local}</span>
										</div>
										<div className="flex items-center gap-2 text-gray-700">
											<span>Ubigeo: {address.ubigeo}</span>
										</div>
									</div>
								</div>
								<div class="w-[100px] flex flex-col gap-2 self-start justify-self-start">
									<Button
										onClick={() => {
											addressUpdate.value = address;
										}}
										type="button"
										className="!bg-orange-600 flex items-center gap-2 justify-center hover:!bg-orange-500 !border-orange-600"
									>
										<PenClipSlashIconSolid {...sizeIcon.small} /> Editar
									</Button>
									<ByUser user={address.user} />
								</div>
							</div>
						</div>
					))
				: null}
			{/* store */}
			<Modal
				isOpen={isOpenStoreAddress.value}
				onClose={() => {
					isOpenStoreAddress.value = false;
				}}
				contentClassName="max-w-[600px] w-full shadow-xl  bg-white rounded-xl overflow-visible !min-h-[auto] "
				content={
					<div className="flex flex-col gap-4 font-bold text-2xl">
						<span className="flex items-center gap-2 fill-white">
							<MapPinIconSolid {...sizeIcon.large} className=" fill-white" />
							Nueva dirección
						</span>
					</div>
				}
			>
				<AddressStore
					refetch={(data) => {
						isOpenStoreAddress.value = false;
						addressIndexQuery.transformData((old) => ({
							data: [...old.data, data],
							success: true,
						}));
					}}
				/>
			</Modal>
			{/* edit */}
			<Modal
				isOpen={!!addressUpdate.value}
				onClose={() => {
					addressUpdate.value = null;
				}}
				contentClassName="max-w-[600px] w-full shadow-xl  bg-white rounded-xl overflow-visible !min-h-[auto] "
				content={
					<div className="flex flex-col gap-4 font-bold text-2xl">
						<span className="flex items-center gap-2 fill-white text-nowrap">
							<MapPinIconSolid {...sizeIcon.large} className=" fill-white" />
							Editar dirección
						</span>
					</div>
				}
			>
				<AddressUpdate
					refetch={(data) => {
						addressIndexQuery.transformData((old) => ({
							...old,
							result: old.data.map((old) =>
								old.id === data.id ? { ...old, ...data } : old,
							),
						}));
						addressUpdate.value = null;
					}}
					address={addressUpdate.value!}
				/>
			</Modal>
		</>
	);
}

interface AddressStoreProps {
	refetch: (address: AddressSchemaFromServer) => void;
}

export function AddressStore({ refetch }: AddressStoreProps) {
	const authContext = useAuthContext();
	const addressStoreForm = useForm<AddressStoreDto>({
		resolver: valibotResolver(addressStoreDto),
	});
	const addressStoreMutation = addressStoreApi();
	const ubigeoQuery = unbigeoIndexApi();
	const ubigeoCiudad = useMemo(() => {
		if (ubigeoQuery.isSuccess) {
			return ubigeoQuery.data!.data.flatMap((country) =>
				country.regions.flatMap((region) =>
					region.cities.map((city) => ({
						key: city.id,
						value: `${city.name} - ${region.name} - ${country.name}`,
					})),
				),
			);
		}
		return [];
	}, [ubigeoQuery.isSuccess]);
	function onAddressStore(data: AddressStoreDto) {
		sweetModal({
			title: "¿Estás seguro de crear esta dirección?",
			icon: "info",
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				addressStoreMutation.mutate(data, {
					onSuccess: (data) => {
						addressStoreForm.reset();

						refetch({
							...data.address,
							user_id: authContext.user!.id,
							user: authContext.user!,
							city: findCityById(
								ubigeoQuery.data?.data!,
								data.address.city_id,
							)!,
						});
						sweetModal({
							title: "Dirección creado correctamente",
							icon: "success",
							showCancelButton: false,
						});
					},
					onError: (error) => {
						handlerError(
							addressStoreForm,
							error,
							"Error al crear esta dirección",
						);
					},
				});
			}
		});
	}

	return (
		<div>
			<Form {...addressStoreForm} onSubmit={onAddressStore}>
				<div class="grid md:grid-cols-2 gap-2">
					<Form.control<AddressStoreDto>
						name={"direccion"}
						title="Dirección"
						required
						placeholder="MZ D LT 2 - "
						ico={<BuildingIconSolid />}
					/>
					<Form.control<AddressStoreDto>
						name={"urbanizacion"}
						title="Urbanización"
					/>
					<Form.control<AddressStoreDto>
						name={"ubigeo"}
						title="ubigeo"
						required
						placeholder="102042"
						ico={<BuildingIconSolid />}
						question={
							<div>
								Ver lista ubigeos{" "}
								<a
									href="https://account.geodir.co/recursos/ubigeo-reniec-peru.html"
									target="_blank"
									rel="noreferrer"
									class="text-primary underline"
								>
									Link
								</a>
							</div>
						}
					/>
					<Form.control<AddressStoreDto>
						name={"cod_local"}
						title="Código de local"
						placeholder="000"
					/>
				</div>
				<Form.control.selectInput<AddressStoreDto>
					name={"city_id"}
					title="Ciudad"
					placeholder="lima"
					options={{ setValueAs: formSelectNumber }}
					array={ubigeoCiudad}
				/>
				<Form.button.submit
					title="Guardar"
					loading_title="Guardando"
					className="mt-6"
					isLoading={addressStoreMutation.isLoading || false}
					disabled={addressStoreMutation.isLoading || false}
				/>
			</Form>
		</div>
	);
}
interface AddressUpdateProps {
	address: AddressSchemaFromServer;
	refetch: (address: AddressSchemaFromServer) => void;
}

export function AddressUpdate({ address, refetch }: AddressUpdateProps) {
	const authContext = useAuthContext();
	const addressUpdateForm = useForm<AddressUpdateDto>({
		resolver: valibotResolver(addressUpdateDto),
		defaultValues: address,
	});
	const addressUpdateMutation = addressUpdateApi(address.id);

	function onAddressUpdate(body: AddressUpdateDto) {
		sweetModal({
			title: "¿Estás seguro de actualizar este addresso?",
			icon: "info",
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				addressUpdateMutation.mutate(body, {
					onSuccess: (data) => {
						addressUpdateForm.reset();

						refetch({
							...body,
							user_id: authContext.user!.id,
							user: authContext.user!,
							id: address.id,
							updated_at: dayjs().toDate(),
							city: findCityById(ubigeoQuery.data?.data!, body.city_id)!,
						});
						sweetModal({
							title: "Addresso actualizado correctamente",
							icon: "success",
							showCancelButton: false,
						});
					},
					onError: (error) => {
						handlerError(addressUpdateForm, error, "Error al crear addresso");
					},
				});
			}
		});
	}
	const ubigeoQuery = unbigeoIndexApi();
	const ubigeoCiudad = useMemo(() => {
		if (ubigeoQuery.isSuccess) {
			return ubigeoQuery.data!.data.flatMap((country) =>
				country.regions.flatMap((region) =>
					region.cities.map((city) => ({
						key: city.id,
						value: `${city.name} - ${region.name} - ${country.name}`,
					})),
				),
			);
		}
		return [];
	}, [ubigeoQuery.isSuccess]);
	return (
		<div>
			<Form {...addressUpdateForm} onSubmit={onAddressUpdate}>
				<div class="grid md:grid-cols-2 gap-2">
					<Form.control<AddressUpdateDto>
						name={"direccion"}
						title="Dirección"
						required
						placeholder="MZ D LT 2 - "
						ico={<BuildingIconSolid />}
					/>
					<Form.control<AddressUpdateDto>
						name={"urbanizacion"}
						title="Urbanización"
					/>
					<Form.control<AddressUpdateDto>
						name={"ubigeo"}
						title="Ubigeo"
						required
						placeholder="102042"
						ico={<BuildingIconSolid />}
						question={
							<div>
								Ver lista ubigeos{" "}
								<a
									href="https://account.geodir.co/recursos/ubigeo-reniec-peru.html"
									target="_blank"
									rel="noreferrer"
									class="text-primary underline"
								>
									Link
								</a>
							</div>
						}
					/>
					<Form.control<AddressUpdateDto>
						name={"cod_local"}
						title="Código de local"
						placeholder="000"
					/>
				</div>
				<Form.control.selectInput<AddressStoreDto>
					name={"city_id"}
					title="Ciudad"
					placeholder="lima"
					array={ubigeoCiudad}
					options={{ setValueAs: formSelectNumber }}
				/>
				<Form.button.submit
					title="Guardar"
					loading_title="Guardando"
					className="mt-6"
					isLoading={addressUpdateMutation.isLoading || false}
					disabled={addressUpdateMutation.isLoading || false}
				/>
			</Form>
		</div>
	);
}
