import {DataSource, DataSourceOptions} from "typeorm"
import path from "node:path"
import "dotenv/config"


const DataSourceConfig = (): DataSourceOptions => {
    const entitiesPath = path.join(__dirname, "entities/**.{js,ts}")
    const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}")

    const dbUrl: string | undefined = process.env.DATABASE_URL
    
    if(!dbUrl){
        throw new Error("env var DATABASE_URL does not exist.")
    }

    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
}

export const AppDataSource: DataSource = new DataSource(DataSourceConfig())