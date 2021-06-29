import Big from "big.js";
import trans from "../translation/trans";

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


export interface OutcomeNumber {
    Number: {
        value: string;
        multiplier: string;
        negative: boolean;
    }
}

export interface OutcomeString {
    String: string;
}

export interface ParsedOutcome {
    Answer: OutcomeNumber | OutcomeString;
}

export function transformToOutcome(outcome: string): Outcome {
    if (outcome === 'Invalid') {
        return {
            type: OutcomeType.Invalid,
        }
    }

    const parsedOutcome: ParsedOutcome = JSON.parse(outcome);

    if ('String' in parsedOutcome.Answer) {
        return {
            answer: parsedOutcome.Answer.String,
            type: OutcomeType.Answer,
        };
    }

    const number = new Big(parsedOutcome.Answer.Number.value).div(parsedOutcome.Answer.Number.multiplier);

    if (parsedOutcome.Answer.Number.negative) {
        number.s = -1;
    }

    return {
        answer: number.toString(),
        type: OutcomeType.Answer,
    };
}

export function transfromOutcomeToString(outcome: Outcome): string {
    if (outcome.type === OutcomeType.Invalid) {
        return trans('outcome.invalid');
    }

    return `"${outcome.answer}"`;
}

export function isSameOutcome(a: Outcome, b: Outcome): boolean {
    if (a.type === OutcomeType.Invalid && b.type === OutcomeType.Invalid) {
        return true;
    }

    return JSON.stringify(a) === JSON.stringify(b);
}
