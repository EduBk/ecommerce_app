
import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

// Eliminamos el .js del nombre para crear rutas dinamicas.
const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

// Genera rutas dinamicas en base a los nombres de /routes.
readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      console.log(`cargando rutas -> ${cleanName}`);
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };
