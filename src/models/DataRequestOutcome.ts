export enum OutcomeType {
    Answer,
    Invalid
}

export interface OutcomeAnswer {
    answer: string;
    type: OutcomeType.Answer;
}

export interface OutcomeInvalid {
    type: OutcomeType.Invalid;
}

export type Outcome = OutcomeAnswer | OutcomeInvalid;

export function transformToOutcome(outcome: string): Outcome {
    if (outcome === 'Invalid') {
        return {
            type: OutcomeType.Invalid,
        }
    }

    const answer = outcome.replace('Answer(', '');

    return {
        answer: answer.slice(0, -1),
        type: OutcomeType.Answer,
    };
}
