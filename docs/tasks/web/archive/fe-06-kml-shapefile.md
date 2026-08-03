# FE-06 — KML não obrigatório + suporte a Shapefile

> **Prioridade:** Média | **Assignee:** — | **Status:** ✅ Concluído

## Status

Entregue no `gaia-web` branch `develop`: `src/lib/geo/shapefile-parser.ts`
(`toKmlFileIfNeeded`, shpjs) + `geojson-to-kml.ts`, wired em
`nova-fazenda/enviar-kml.tsx`; preview de mapa em `nova-fazenda-kml-photo-step.tsx`
(`MapView`); upload com progresso.

## Checklist

- [x] KML não é obrigatório no upload de fazenda
- [x] Suporte a upload de Shapefile (.shp, .shx, .dbf) além de KML
- [x] Converter Shapefile para GeoJSON no frontend (shpjs)
- [x] Preview do polígono no mapa antes de salvar
- [x] Upload via S3 presigned URL

## API

- `POST /api/v1/uploads/presigned-url/` — já existe
- Upload do arquivo para S3 — frontend faz direto
