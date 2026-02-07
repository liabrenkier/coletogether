export const homeHeroImage =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&h=1000&q=80";

const defaultImages = {
  salida:
    "https://images.pexels.com/photos/1111168/pexels-photo-1111168.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2",
  viaje:
    "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2"
};

export function resolveEventImage(evento) {
  if (evento?.imagenUrl) return evento.imagenUrl;
  if (evento?.tipo === "viaje") return defaultImages.viaje;
  return defaultImages.salida;
}
