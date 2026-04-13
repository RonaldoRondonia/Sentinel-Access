# Sentinel Access - Pipeline Refactor (Base)

Este repositório estava vazio no snapshot atual, então a refatoração foi iniciada como uma base modular para organizar a pipeline.

## Estrutura proposta

- `src/pipeline/types.ts`: contratos centrais da pipeline.
- `src/pipeline/stages.ts`: estágios isolados (`collect`, `normalize`, `correlate`, `score`, `report`).
- `src/pipeline/PipelineManager.ts`: orquestração sequencial e plugável.
- `src/pipeline/index.ts`: ponto único de export.

## Próximos passos

1. Conectar os engines reais em cada estágio.
2. Incluir telemetria por estágio (`duration`, `status`, `errors`).
3. Adicionar testes unitários para estágios e execução fim-a-fim.
