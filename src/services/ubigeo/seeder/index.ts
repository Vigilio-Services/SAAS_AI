import { bulkCreateWithNestedRelations } from "@libs/server/helpers";
import { EmpresaSchema } from "@services/empresa/schemas/empresa.schema";
import { CityEntity } from "../entities/city.entity";
import { CountryEntity } from "../entities/country.entity";
import { RegionEntity } from "../entities/region.entity";
import { estadosSeeder } from "./argentina/estados.seeder";
import { localidadesArgentinaSeeder } from "./argentina/localidades.seeder";
import { ciudadesSeederBrazil } from "./brazil/ciudades.seeder";
import { estadosSeederBrasil } from "./brazil/estados.seeder";
import { communesSeederChile } from "./chile/communes.seeder";
import { provinceSeederChile } from "./chile/province.seeder";
import { regionesSeederChile } from "./chile/regiones.seeder";
import { todoSeederColombia } from "./colombia/todo.seeder";
import { cantonesSeederEcuador } from "./ecuador/cantones.seeder";
import { parroquiasSeederEcuador } from "./ecuador/parroquias.seeder";
import { provinciasSeederEcuador } from "./ecuador/provincias.seeder";
import { comunidadesEspañaSeeder } from "./españa/comunidades.seeder";
import { ciudadesSeederMexico } from "./mexico/ciudades.seeder";
import { estadosSeederMexico } from "./mexico/estados.seeder";
import { departmentsSeeder } from "./peru/departamentos.seeder";
import { distritosSeeder } from "./peru/distritos.seeder";
import { uruguaySeeder } from "./uruguay/uruguay.seeder";

export async function ubigeoSeeder() {
    const countriesSeeder = [
        {
            dial_code: "51" satisfies EmpresaSchema["dial_code"],
            name: "Perú",
            regions: departmentsSeeder.map((dept) => ({
                code: dept.ubigeo,
                name: dept.name,
                cities: distritosSeeder
                    .filter((dist) => dist.department_id === dept.ubigeo)
                    .map((district) => ({
                        code: district.ubigeo,
                        name: district.name,
                    })),
            })),
        },
        {
            dial_code: "56" satisfies EmpresaSchema["dial_code"],
            name: "Chile",
            regions: regionesSeederChile.map((dept) => ({
                code: dept.code,
                name: dept.name.short,
                cities: communesSeederChile
                    .filter(
                        (pro) =>
                            provinceSeederChile.find(
                                (c) => c.region === dept.code
                            )?.code === pro.code
                    )
                    .map((district) => ({
                        code: district.code,
                        name: district.name,
                    })),
            })),
        },
        {
            dial_code: "54" satisfies EmpresaSchema["dial_code"],
            name: "Argentina",
            regions: estadosSeeder.map((dept) => ({
                code: dept.code,
                name: dept.name,
                cities: localidadesArgentinaSeeder
                    .filter((localidad) => localidad.code === dept.code)
                    .map((district, i) => ({
                        code: `${dept.code}${i + 1}`,
                        name: district.name,
                    })),
            })),
        },
        {
            dial_code: "57" satisfies EmpresaSchema["dial_code"],
            name: "Colombia",
            regions: todoSeederColombia.map((todo) => ({
                code: String(todo.id),
                name: todo.departamento,
                cities: todo.ciudades.map((ciudad, i) => ({
                    code: `${todo.id}${i}`,
                    name: ciudad,
                })),
            })),
        },
        {
            dial_code: "52" satisfies EmpresaSchema["dial_code"],
            name: "México",
            regions: estadosSeederMexico.map((estado) => ({
                code: String(estado.key),
                name: estado.name,
                cities: ciudadesSeederMexico
                    .filter((ciudad) => ciudad.state_id === estado.key)
                    .map((district, i) => ({
                        code: `${String(estado.key)}${i}`,
                        name: district.name,
                    })),
            })),
        },
        {
            dial_code: "55" satisfies EmpresaSchema["dial_code"],
            name: "Brazil",
            regions: estadosSeederBrasil.map((estado) => ({
                code: String(estado.ID),
                name: estado.Nome,
                cities: ciudadesSeederBrazil
                    .filter((ciudad) => ciudad.Estado === estado.ID)
                    .map((ciudad) => ({
                        code: ciudad.ID,
                        name: ciudad.Nome,
                    })),
            })),
        },
        {
            dial_code: "598" satisfies EmpresaSchema["dial_code"],
            name: "Uruguay",
            regions: uruguaySeeder.map((uru, u) => ({
                code: String(u + 1),
                name: uru.departamento,
                cities: uru.ciudades.map((ciudad, i) => ({
                    code: `${u + 1}${i}`,
                    name: ciudad,
                })),
            })),
        },
        {
            dial_code: "593" satisfies EmpresaSchema["dial_code"],
            name: "Ecuador",
            regions: provinciasSeederEcuador.map((provincia) => ({
                code: String(provincia.id),
                name: provincia.name,
                cities: cantonesSeederEcuador
                    .filter(
                        (pro) =>
                            parroquiasSeederEcuador.find(
                                (c) => c.cantone_id === provincia.id
                            )?.id === pro.provincia_id
                    )

                    .map((canton) => ({
                        code: canton.id,
                        name: canton.name,
                    })),
            })),
        },
        {
            dial_code: "34" satisfies EmpresaSchema["dial_code"],
            name: "España",
            regions: comunidadesEspañaSeeder.map((comunidad) => ({
                code: String(comunidad.id),
                name: comunidad.name,
                cities: comunidad.provincias.map((provincia) => ({
                    code: provincia.ubigeo,
                    name: provincia.name,
                })),
            })),
        },
    ];

    // Ejecutar la creación masiva con relaciones anidadas
    try {
        const createdCountries = await bulkCreateWithNestedRelations(
            {
                model: CountryEntity,
                data: countriesSeeder.map((c) => ({
                    code: c.dial_code,
                    dial_code: c.dial_code,
                    name: c.name,
                    regions: c.regions, // Pasamos las regiones anidadas con sus ciudades
                })),
                chunkSize: 4000,
                excludeFields: ["regions"], // Excluimos el campo 'regions' del modelo Country
                beforeCreate: (country) => ({
                    code: country.code,
                    name: country.name,
                    dial_code: country.dial_code,
                }),
            },
            [
                {
                    childrenField: "regions",
                    relationField: "country_id",
                    config: {
                        model: RegionEntity,
                        chunkSize: 5000,
                        excludeFields: ["cities"], // Excluimos el campo 'cities' del modelo Region
                        beforeCreate: (region, _, parentResult) => ({
                            code: region.code,
                            name: region.name,
                            country_id: parentResult.id,
                            cities: region.cities, // Mantenemos las ciudades para el siguiente nivel
                        }),
                    },
                },
                {
                    childrenField: "cities",
                    relationField: "region_id",
                    config: {
                        model: CityEntity,
                        chunkSize: 5000,
                        beforeCreate: (city, _, parentResult) => ({
                            code: city.code,
                            name: city.name,
                            region_id: parentResult.id,
                        }),
                    },
                },
            ]
        );

        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.log(
            `Created ${createdCountries.length} countries with nested regions and cities`
        );
    } catch (error) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.error("Error during bulk creation:", error);
        throw error;
    }
}
