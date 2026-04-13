export type PipelineStageName =
  | 'collect'
  | 'normalize'
  | 'correlate'
  | 'score'
  | 'report';

export interface PipelineContext {
  requestId: string;
  target: string;
  startedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface PipelinePayload {
  findings: Array<Record<string, unknown>>;
  artifacts: Array<Record<string, unknown>>;
  score?: number;
  summary?: string;
}

export interface PipelineStage {
  readonly name: PipelineStageName;
  run(payload: PipelinePayload, context: PipelineContext): Promise<PipelinePayload>;
}
