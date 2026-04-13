import { PipelineContext, PipelinePayload, PipelineStage } from './types';
import {
  CollectStage,
  CorrelateStage,
  NormalizeStage,
  ReportStage,
  ScoreStage,
} from './stages';

export class PipelineManager {
  private readonly stages: PipelineStage[];

  constructor(stages?: PipelineStage[]) {
    this.stages = stages ?? [
      new CollectStage(),
      new NormalizeStage(),
      new CorrelateStage(),
      new ScoreStage(),
      new ReportStage(),
    ];
  }

  async execute(initialPayload: PipelinePayload, context: PipelineContext): Promise<PipelinePayload> {
    let payload = initialPayload;

    for (const stage of this.stages) {
      payload = await stage.run(payload, context);
    }

    return payload;
  }
}
