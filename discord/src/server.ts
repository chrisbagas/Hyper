import express from "express"

const app = express()
const port = process.env.PORT || 3001

app.get("/", (_, res) => {
  res.send("Hello, world!")
})

app.listen(port, () => {
  console.log(`Discord service is listening on port ${port}`)
})
