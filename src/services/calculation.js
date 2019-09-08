import dates from '../utils';

const calculateTotalRepaymentAmount = (dateIssue, dateMaturity, state) => {
    const {
        amount: surchargeFactor,
        selectedTerritory,
        territories,
    } = state;

    if (!dateIssue || !dateMaturity) {
        return {
            dateIssue,
            dateMaturity,
        };
    }

    if (!dates.compareDates(dateIssue, dateMaturity)) {
        return {
            dateIssue,
            dateMaturity,
        };
    }

    const territory = territories.find(e => +e.value === +selectedTerritory.value);
    const { value: territoryValue } = territory;
    const duration = dates.subtractDates(dateIssue, dateMaturity);
    const totalRepaymentAmount = (duration * +territoryValue) + +surchargeFactor;

    return {
        dateIssue,
        dateMaturity,
        totalRepaymentAmount,
    };
};

export default {
    calculateTotalRepaymentAmount,
};
