import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import { DataRequestResolutionWindow } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './ResolutionWindowAccordion.module.scss';
import StakerReport from './components/StakerReport/StakerReport';
import InformationRows from '../InformationRows';
import { prettyFormatDate } from '../../utils/dateUtils';
import { formatToken } from '../../utils/tokenUtils';
import OutcomeStakeInfo from './components/OutcomeStakeInfo/OutcomeStakeInfo';

interface Props {
    resolutionWindow: DataRequestResolutionWindow;
    defaultExpanded?: boolean;
}

export default function ResolutionWindowAccordion({
    resolutionWindow,
    defaultExpanded,
}: Props) {
    return (
        <Accordion className={s.accordion} defaultExpanded={defaultExpanded}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <span className={s.roundTitle}>{trans('resolutionWindow.round', { round: resolutionWindow.round.toString() })}</span>
                <span>{resolutionWindow.bondedOutcome}</span>
            </AccordionSummary>
            <AccordionDetails className={s.details}>
                <InformationRows
                    rows={[
                        {
                            label: trans('resolutionWindowAccordion.label.endTime'),
                            value: prettyFormatDate(resolutionWindow.endTime),
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.bondSize'),
                            value: `${formatToken(resolutionWindow.bondSize)} FLX`,
                        },
                        {
                            label: trans('resolutionWindowAccordion.label.totalStaked'),
                            value: `TBD FLX`,
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
