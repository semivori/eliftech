import Model from "./Model";

export default class Bank extends Model {
    constructor(fields) {
        super();

        this.setFields(fields)
    }

    getRules() {
        return {
            name: [
                {
                    rule: /^[a-z][a-z ]+$/i,
                    message: 'name must be at least 2 symbols and can contain only Latin letters and a space',
                }
            ],
            interest_rate: [
                {
                    rule(v) {
                        let val = +v
                        if (isNaN(val)) {
                            return false
                        }
                    },
                }
            ],
        };
    }

    getLabels() {
        return {
            'name': 'Name',
            'interest_rate': 'Interest Rate',
            'max_loan': 'Maximum Loan',
            'down_payment': 'Minimum Down Payment',
            'loan_term': 'Loan Term',
        };
    }
}