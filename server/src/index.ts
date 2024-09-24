//! Importa variables de ENTORNO
import "dotenv/config";

//! Importa la APP definida en app.ts
import app from "./app";

const PORT = process.env.PORT || 3001;

//! Se inicia el servidor y queda en escucha
app.listen(PORT, () => console.log(`App on Port: ${PORT}`));