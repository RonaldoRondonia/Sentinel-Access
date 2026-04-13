import { PipelineContext, PipelinePayload, PipelineStage } from './types';

const clone = (payload: PipelinePayload): PipelinePayload => ({
  findings: [...payload.findings],
  artifacts: [...payload.artifacts],
  score: payload.score,
  summary: payload.summary,
});

export class CollectStage implements PipelineStage {
  readonly name = 'collect' as const;

  async run(payload: PipelinePayload): Promise<PipelinePayload> {
    const next = clone(payload);

    if (next.artifacts.length === 0) {
      next.artifacts.push({ source: 'seed', status: 'empty-input' });
    }

    return next;
  }
}

export class NormalizeStage implements PipelineStage {
  readonly name = 'normalize' as const;

  async run(payload: PipelinePayload): Promise<PipelinePayload> {
    const next = clone(payload);
    next.findings = next.findings.map((finding) => {
      const severity = String(finding.severity ?? 'unknown').toLowerCase();
      return { ...finding, severity };
    });

    return next;
  }
}

export class CorrelateStage implements PipelineStage {
  readonly name = 'correlate' as const;

  async run(payload: PipelinePayload): Promise<PipelinePayload> {
    const next = clone(payload);
    next.artifacts.push({ type: 'correlation', findings: next.findings.length });
    return next;
  }
}

export class ScoreStage implements PipelineStage {
  readonly name = 'score' as const;

  async run(payload: PipelinePayload): Promise<PipelinePayload> {
    const next = clone(payload);
    const high = next.findings.filter((item) => item.severity === 'high').length;
    const medium = next.findings.filter((item) => item.severity === 'medium').length;

    next.score = high * 10 + medium * 5;
    return next;
  }
}

export class ReportStage implements PipelineStage {
  readonly name = 'report' as const;

  async run(payload: PipelinePayload, context: PipelineContext): Promise<PipelinePayload> {
    const next = clone(payload);
    next.summary = `target=${context.target} findings=${next.findings.length} score=${next.score ?? 0}`;
    return next;
  }
}
