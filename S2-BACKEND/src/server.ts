import "dotenv/config"
import { AppDataSource } from "./data-source"
import { app } from "./app"


AppDataSource.initialize()
    .then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })