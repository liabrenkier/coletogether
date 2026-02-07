import { salidasFallback, viajesFallback } from "@/lib/fallback-data";

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

const groqQuery = `
*[_type in ["salida", "viaje"] && defined(fechaInicio)] | order(fechaInicio asc) {
  _id,
  _type,
  titulo,
  "slug": coalesce(slug.current, _id),
  fechaInicio,
  "fechaFin": coalesce(fechaFin, fechaInicio),
  lugar,
  precio,
  "imagenUrl": coalesce(imagen.asset->url, portada.asset->url, ""),
  descripcion,
  "incluye": coalesce(incluye, []),
  "noIncluye": coalesce(noIncluye, []),
  "plan": coalesce(plan, [])
}
`;

function normalizeEvent(item) {
  const tipo = item._type === "salida" ? "salida" : "viaje";

  return {
    id: item._id,
    slug: item.slug || item._id,
    tipo,
    titulo: item.titulo || "Sin titulo",
    fechaInicio: item.fechaInicio,
    fechaFin: item.fechaFin || item.fechaInicio,
    lugar: item.lugar || "Lugar a confirmar",
    precio: item.precio || "Consultar",
    imagenUrl: item.imagenUrl || "",
    descripcion: item.descripcion || "Mas informacion por confirmar.",
    incluye: Array.isArray(item.incluye) ? item.incluye : [],
    noIncluye: Array.isArray(item.noIncluye) ? item.noIncluye : [],
    plan: Array.isArray(item.plan) ? item.plan : []
  };
}

async function fetchFromSanity() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !dataset) return null;

  const query = encodeURIComponent(groqQuery.trim());
  const endpoint = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  const response = await fetch(endpoint, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    next: { revalidate: 120 }
  });

  if (!response.ok) {
    throw new Error(`Sanity query failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (!Array.isArray(payload.result)) return null;

  const normalized = payload.result.map(normalizeEvent);
  const salidas = normalized.filter((item) => item.tipo === "salida");
  const viajes = normalized.filter((item) => item.tipo === "viaje");

  if (salidas.length === 0 && viajes.length === 0) return null;
  return { salidas, viajes };
}

export async function getColeContent() {
  try {
    const sanityData = await fetchFromSanity();
    if (sanityData) return sanityData;
  } catch (error) {
    console.warn("No se pudo traer contenido desde Sanity. Se usa fallback local.", error);
  }

  return {
    salidas: salidasFallback,
    viajes: viajesFallback
  };
}
