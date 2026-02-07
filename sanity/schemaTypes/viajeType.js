import { defineField, defineType } from "sanity";

export const viajeType = defineType({
  name: "viaje",
  title: "Viaje",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Titulo",
      type: "string",
      validation: (rule) => rule.required().min(5)
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "destacadaInicio",
      title: "Destacada en inicio",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "oculta",
      title: "Ocultar en el sitio",
      type: "boolean",
      initialValue: false,
      description: "Si esta activo, este viaje no se muestra en el sitio."
    }),
    defineField({
      name: "fechaInicio",
      title: "Fecha de inicio",
      type: "date",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "fechaFin",
      title: "Fecha de fin",
      type: "date"
    }),
    defineField({
      name: "lugar",
      title: "Lugar",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "precio",
      title: "Precio",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "imagen",
      title: "Imagen",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "descripcion",
      title: "Descripcion",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(20)
    }),
    defineField({
      name: "incluye",
      title: "Incluye",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "noIncluye",
      title: "No incluye",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "plan",
      title: "Itinerario resumido",
      type: "array",
      of: [{ type: "string" }]
    })
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "lugar",
      media: "imagen"
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Viaje | ${subtitle}` : "Viaje"
      };
    }
  },
  orderings: [
    {
      title: "Fecha inicio (proximos primero)",
      name: "fechaInicioAsc",
      by: [{ field: "fechaInicio", direction: "asc" }]
    }
  ]
});
