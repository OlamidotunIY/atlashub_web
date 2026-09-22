export type Currency = 'NGN';

export interface Money {
    amount: number;
    currency: Currency;
}

export interface FormattedMoney {
    display: string;
    currency: Currency;
}