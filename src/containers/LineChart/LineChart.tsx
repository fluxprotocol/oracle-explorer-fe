import { Chart } from 'chart.js';
import React, { useCallback, useEffect, useRef } from 'react';
import ToggleButtons from '../../components/ToggleButtons';
import { Period } from '../../services/AnalyticsService';
import trans from '../../translation/trans';
import { ChartItem } from './ChartItem';
import generateLineChart, { updateLineChart } from './utils/generateLineChart';

interface Props {
    items: ChartItem[];
    labels: string[];
    period: Period;
    onPeriodChange?: (period: Period) => void;
}

export default function LineChart({
    items,
    labels,
    period,
    onPeriodChange = () => {},
}: Props) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const chart = useRef<Chart | null>(null);

    useEffect(() => {
        if (!canvas.current) return;

        if (!chart.current) {
            chart.current = generateLineChart(canvas.current, labels, items);
        } else {
            updateLineChart(chart.current, labels, items);
        }

    }, [items, labels, canvas, chart]);

    const handlePeriodChange = useCallback((value: Period | null) => {
        if (!value) return;
        onPeriodChange(value);
    }, [onPeriodChange]);

    return (
        <div>
            <canvas ref={canvas} />
            <ToggleButtons
                exclusive
                value={period}
                onChange={handlePeriodChange}
                items={[
                    {
                        id: Period.OneDay,
                        text: trans('lineChart.labels.1d'),
                    },
                    {
                        id: Period.OneWeek,
                        text: trans('lineChart.labels.1w'),
                    },
                    {
                        id: Period.ThreeWeeks,
                        text: trans('lineChart.labels.3w'),
                    },
                    {
                        id: Period.OneMonth,
                        text: trans('lineChart.labels.1m'),
                    },
                    {
                        id: Period.OneYear,
                        text: trans('lineChart.labels.1y'),
                    },
                    {
                        id: Period.All,
                        text: trans('lineChart.labels.all'),
                    }
                ]}
            />
        </div>
    );
}
