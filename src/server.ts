import express from "express"
const app = express()
import { config } from "../config"
import { connectDB } from "./database/dbConfig"
import orderRoutes from "./routes/orderRoutes"
import { logger } from "./utils/logger"

connectDB()

app.get("/health", (_req, res) => {
  res.send()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/orders", orderRoutes)

app.listen(config.port, () => {
  return logger.info(`Express is listening at http://localhost:${config.port}`)
})
