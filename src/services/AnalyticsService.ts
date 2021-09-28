import { subDays, subMonths, subWeeks, subYears } from "date-fns";
import gql from "graphql-tag";
import { AnalyticsPoint } from "../models/AnalyticsPoint";
import { graphqlClient } from "./GraphQLService";

export enum Period {
    OneDay = '1d',
    OneWeek = '1w',
    OneMonth = '1m',
    ThreeWeeks = '3w',
    OneYear = '1y',
    All = 'all',
}

export enum DateMetric {
    minute = "minute",
    hour = "hour",
    day = "day",
    week = "week",
    month = "month",
    year = "year",
}

function getEndDateInfoForPeriod(period: Period) {
    const now = new Date();
    let chosenPeriodDate = new Date();
    let metric = DateMetric.month;

    switch (period) {
        case Period.OneDay:
            chosenPeriodDate = subDays(now, 1);
            metric = DateMetric.hour;
            break;
        case Period.OneWeek:
            chosenPeriodDate = subWeeks(now, 1);
            metric = DateMetric.day;
            break;
        case Period.ThreeWeeks:
            chosenPeriodDate = subWeeks(now, 3);
            metric = DateMetric.day;
            break;
        case Period.OneMonth:
            chosenPeriodDate = subMonths(now, 1);
            metric = DateMetric.day;
            break;
        case Period.OneYear:
            chosenPeriodDate = subYears(now, 1);
            metric = DateMetric.month;
            break;
        case Period.All:
            chosenPeriodDate = new Date(0);
            metric = DateMetric.month;
            break;
    }

    return {
        chosenPeriodDate,
        metric,
    }
}

export async function getAccountAnalytics(accountId: string, period: Period): Promise<AnalyticsPoint[]> {
    try {
        const { chosenPeriodDate, metric } = getEndDateInfoForPeriod(period);

        const response = await graphqlClient.query({
            query: gql`
                query GetAccountAnalytics($accountId: String!, $beginTimestamp: String!, $metric: DateMetric) {
                    points: getAccountAnalytics(accountId: $accountId, beginTimestamp: $beginTimestamp, dateMetric: $metric) {
                        key
                        data
                    }
                }
            `,
            variables: {
                accountId,
                beginTimestamp: chosenPeriodDate.getTime().toString(),
                metric,
            }
        });

        return response.data.points;
    } catch (error) {
        console.error('[getAccountAnalytics]', error);
        return [];
    }
}

export async function getRequestorInvalidRequestsAnalytics(accountId: string, period: Period): Promise<AnalyticsPoint[]> {
    try {
        const { chosenPeriodDate, metric } = getEndDateInfoForPeriod(period);

        const response = await graphqlClient.query({
            query: gql`
                query GetRequestorInvalidAnalytics($accountId: String!, $beginTimestamp: String!, $metric: DateMetric) {
                    points: getInvalidRequestsAnalytics(accountId: $accountId, beginTimestamp: $beginTimestamp, dateMetric: $metric) {
                        key
                        data
                    }
                }
            `,
            variables: {
                accountId,
                beginTimestamp: chosenPeriodDate.getTime().toString(),
                metric,
            }
        });

        return response.data.points;
    } catch (error) {
        console.error('[getRequestorInvalidRequestsAnalytics]', error);
        return [];
    }
}
