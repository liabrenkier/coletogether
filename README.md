# Cole Together Web (Next.js)

Sitio de Cole Together listo para deploy en Vercel con:

- Home moderna.
- Paginas separadas: `/eventos`, `/viajes`, `/calendario`.
- Seccion de Salidas/Eventos (3 ejemplos completos).
- Seccion de Viajes (3 ejemplos completos).
- Calendario simple con todo ordenado por fecha.
- Modal de detalle al hacer click en salida/viaje.
- Boton flotante de WhatsApp a `1135635184`.

## Correr local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar entorno de desarrollo:

```bash
npm run dev
```

3. Abrir `http://localhost:3000`.

## Deploy en Vercel

1. Subir este proyecto a GitHub.
2. Importar repo en Vercel.
3. Vercel detecta Next.js automaticamente.
4. Deploy.

## Conectar Sanity

El proyecto ya trae una capa de datos preparada:

- `lib/content.js` intenta leer Sanity por API.
- Si no hay variables de entorno o falla la consulta, usa contenido local de `lib/fallback-data.js`.

Para activar Sanity:

1. Copiar `.env.example` a `.env.local`.
2. Completar:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN` (solo si tu dataset no es publico)
3. Reiniciar `npm run dev`.
