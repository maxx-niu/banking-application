export type TAccountType = 'checking' | 'savings';

export interface ITransaction {
  id: number;
  from: string;
  to: string;
  amount: number;
  date: Date;
}

export interface IAccount {
  id: string;
  name: string;
  type: TAccountType;
  balance: number;
  history: ITransaction[];
}
