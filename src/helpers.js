import Users from './mocks/users';
import Merchants from './mocks/merchants';
import Transactions from './mocks/transactions';


export const getUserByCardId = cardId => {
    let user = {};

    Users.forEach((u) => {
        if (u.card_id === cardId) {
            user = u;
        }
    });
    
    return user;
};

export const getMerchantById = merchantId => {
    let merchant = {};

    Merchants.forEach((m) => {
        if (m.network_id === merchantId) {
            merchant = m;
        }
    });
    
    return merchant;
};

export const getLastTransactionByCardId = cardId => {
    let transaction = null;

    for (let i = Transactions.length - 1; i >= 0; i-- ) {
        if (Transactions[i].card_id === cardId ) {
            transaction = Transactions[i];
            break;
        }
    }

    return transaction;
};