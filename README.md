# Cole Together Web (Next.js)

Sitio de Cole Together listo para deploy en Vercel con:

- Home moderna.
- Paginas separadas: `/eventos`, `/viajes`, `/calendario`.
- Seccion de Salidas/Eventos (3 ejemplos completos).
- Seccion de Viajes (3 ejemplos completos).
- Calendario simple con todo ordenado por fecha.
- Modal de detalle al hacer click en salida/viaje.
- Boton flotante de WhatsApp a `1135635184`.
- Studio de Sanity integrado en `/studio`.

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

## Abrir Sanity Studio

1. Configura `.env.local` (ver seccion siguiente).
2. Abri `http://localhost:3000/studio`.

Opcional por CLI:

```bash
npm run studio
```

## Deploy en Vercel

1. Subir este proyecto a GitHub.
2. Importar repo en Vercel.
3. Vercel detecta Next.js automaticamente.
4. Deploy.

## Conectar Sanity

Para activar Sanity:

1. Copiar `.env.example` a `.env.local`.
2. Completar:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_READ_TOKEN` (solo si tu dataset no es publico)
   - `SANITY_REVALIDATE_SECRET` (string secreto para webhooks)
3. Reiniciar `npm run dev`.

Estructura de contenido en Sanity:

- Tipo `salida`
- Tipo `viaje`
- Ambos incluyen campo `destacadaInicio` para elegir que se muestra en Home.

Comportamiento del sitio:

- Home toma primero las destacadas (`destacadaInicio = true`).
- Si no hay destacadas, usa los proximos items por fecha.
- `Eventos`, `Viajes` y `Calendario` consumen el mismo origen y reflejan cambios.

## Actualizacion automatica al editar/eliminar

El proyecto incluye endpoint:

- `POST /api/revalidate?secret=TU_SECRETO`

Configura un webhook en Sanity:

1. Ir a `Project -> API -> Webhooks`.
2. Crear webhook con URL:
   - `https://TU_DOMINIO.vercel.app/api/revalidate?secret=TU_SECRETO`
3. Eventos del webhook:
   - Create
   - Update
   - Delete
4. Guardar.

Con eso, cuando publiques, edites o elimines una salida/viaje en Sanity, el Home, listados y Calendario se revalidan automaticamente.
