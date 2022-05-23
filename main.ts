import express from "express";
export const app = express();
const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server listening on port:${port}`));
