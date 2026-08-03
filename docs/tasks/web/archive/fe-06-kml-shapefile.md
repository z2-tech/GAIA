# FE-06 — KML não obrigatório + suporte a Shapefile

> **Prioridade:** Média | **Assignee:** — | **Status:** ⚠️ Parcialmente implementado

## Status

O commit `f61479c` no gaia-web já implementa "KML/shapefile import". Verificar o que foi feito e o que falta.

## Checklist

- [x] KML não é obrigatório no upload de fazenda (verificar se já está)
- [ ] Suporte a upload de Shapefile (.shp, .shx, .dbf) além de KML
- [ ] Converter Shapefile para GeoJSON no frontend (shpjs já está no package.json)
- [ ] Preview do polígono no mapa antes de salvar
- [ ] Upload via S3 presigned URL

## API

- `POST /api/v1/uploads/presigned-url/` — já existe
- Upload do arquivo para S3 — frontend faz direto
