import { LOAN_MANAGEMENT_ACTIONS } from "../constants/loanActions";
import { message } from "antd";
const INITIAL_STATE = {
    loading: false,
    error: null,
    message: null,
    data: {
        loans: [],
        payments: []
    },
}

const MESSAGE_KEY = "LOAN_REDUCER_MESSAGE";
export const loanReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAN_MANAGEMENT_ACTIONS.FETCH_UNPAID_LOANS_ACTION:
            return {
                ...state,
                loading: true
            }

        case LOAN_MANAGEMENT_ACTIONS.SHOW_UNPAID_LOANS_ACTION:
            console.log(action.loans);
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    loans: action.loans
                }
            }

        case LOAN_MANAGEMENT_ACTIONS.SHOW_UNPAID_LOANS_ERROR_ACTION:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case LOAN_MANAGEMENT_ACTIONS.SAVE_LOAN_PAYMENT_ACTION:
            message.loading({ content: 'ብድሩ በመመዝገብ ላይ! እባኮ ትንሽ ይጠበቁ!', key: MESSAGE_KEY });

            return {
                ...state,
                loading: true,
            }

        case LOAN_MANAGEMENT_ACTIONS.ADD_LOAN_PAYMENT_ACTION:
            let payment = action.payment;
            let _loans = state.data.loans;
            let some = [];
            let removable_loan_id = 0;
            _loans.forEach(loan => {
                if (loan.id == payment.loan_id) {
                    loan.payments.push(payment);
                    let paid = 0;
                    loan.payments.forEach(_payment => {
                        paid += _payment.amount;
                    });

                    if (loan.price == paid) {
                        removable_loan_id = loan.id;
                    }
                }
            });
            message.success({ content: 'ብድሩ በትክክል ተሰርዝዋል', key: MESSAGE_KEY });
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    loans: _loans.filter((loan, index) => (loan.id != removable_loan_id))
                }
            }

        case LOAN_MANAGEMENT_ACTIONS.FETCH_TODAYS_LOAN_PAYMENTS_ACTION:
            return {
                ...state,
                loading: true
            }

        case LOAN_MANAGEMENT_ACTIONS.SHOW_LOAN_PAYMENTS_ACTION:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    payments: action.payments
                }
            }


        default: return state;
    }
}
