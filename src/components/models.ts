export interface AccountType {
  label: string;
  type: string;
  login: string;
  password: string | null;
  isVisibilityPassword: boolean;
}

export interface StoredAccounts {
  label: [StoredLabel];
  type: string;
  login: string;
  password: string;
  isVisibilityPassword: boolean;
}

export interface StoredLabel {
  text: string;
}

export interface State {
  accountsList: AccountType[];
}
