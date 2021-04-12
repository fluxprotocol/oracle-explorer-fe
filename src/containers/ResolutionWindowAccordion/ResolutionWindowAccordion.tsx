import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Big from 'big.js';

import { ResolutionWindow } from '../../models/ResolutionWindow';
import trans from '../../translation/trans';
import StakerReport from './components/StakerReport/StakerReport';
import InformationRows from '../InformationRows';
import { prettyFormatDate } from '../../utils/dateUtils';
import { formatToken } from '../../utils/tokenUtils';
import OutcomeStakeInfo from './components/OutcomeStakeInfo/OutcomeStakeInfo';

import s from './ResolutionWindowAccordion.module.scss';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';

interface Props {
    resolutionWindow: ResolutionWindow;
    defaultExpanded?: boolean;
}

export default function ResolutionWindowAccordion({
    resolutionWindow,
    defaultExpanded,
}: Props) {
    const percentageFilled = new Big(resolutionWindow.totalStaked).div(resolutionWindow.bondSize).mul(100).toString();

    return (
        <Accordion className={s.accordion} defaultExpanded={defaultExpanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className={s.roundTitle}>{trans('resolutionWindow.round', { round: resolutionWindow.round.toString() })}</span>
                <span>{resolutionWindow.bondedOutcome ? transfromOutcomeToString(resolutionWindow.bondedOutcome) : ''}</span>
            </AccordionSummary>
            <AccordionDetails className={s.details}>
                <InformationRows
                    rows={[
                        {
                            label: trans('resolutionWindowAccordion.label.endTime'),
                            value: <span>{prettyFormatDate(resolutionWindow.endTime)}</span>,
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.bondSize'),
                            value: <span>{`${formatToken(resolutionWindow.bondSize)} FLX`}</span>,
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.totalStaked'),
                            value: <span>{`${formatToken(resolutionWindow.totalStaked)} FLX`}</span>,
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.percentageFilled'),
                            value: <span>{`${percentageFilled}%`}</span>,
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.bondedOutcome'),
                            value: <span>{resolutionWindow.bondedOutcome ? transfromOutcomeToString(resolutionWindow.bondedOutcome) : ''}</span>,
                        }
                    ]}
                />
                <h3>{trans('resolutionWindowAccordion.outcomeStakes.title')}</h3>
                <OutcomeStakeInfo outcomeStakes={resolutionWindow.outcomeStakes} />
                <h3>{trans('resolutionWindowAccordion.stakerReports.title')}</h3>
                <StakerReport userStakes={resolutionWindow.userStakes} />
            </AccordionDetails>
        </Accordion>
    );
}
