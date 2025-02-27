import { acceptHMRUpdate, defineStore } from 'pinia'
import type { AccountType, State, StoredAccounts } from 'components/models'

export const useAccountStore = defineStore('counter', {
  state: ():State => ({
    accountsList: [],
  }),

  getters: {
    getAccountsList: (state) => state.accountsList,
  },

  actions: {
    addAccount() {
      const defaultObj: AccountType = {
        label: '',
        type: 'Локальная',
        login: '',
        password: null,
        isVisibilityPassword: true,
      };
      this.accountsList.push(defaultObj);
    },
    deleteAccount(accountIndex: number) {
      this.accountsList.splice(accountIndex, 1);
    },
    saveAccounts() {
      if (this.accountsList.length > 0) {
        const updatedAccountsList = this.accountsList.map((account: AccountType) => {
          const text = account.label.split(';')
            .map(item => item.trim())
            .filter(item => item !== '')
            .map((item) => {
            return { text: item };
          })
          return {
            ...account,
            password: account.type === 'LDAP' ? null : account.password,
            label: text
          }
        })
        localStorage.setItem('accountsList', JSON.stringify(updatedAccountsList));
      }
    },
    loadAccounts() {
      const storedAccounts = localStorage.getItem('accountsList');
      if (storedAccounts) {
        const parseStoredAccounts = JSON.parse(storedAccounts);
        this.accountsList = parseStoredAccounts.map((account: StoredAccounts) => {
          const text = account.label.map(item => item.text).join('; ');
          return {
            label: text,
            type: account.type,
            login: account.login,
            password: account.password,
            isVisibilityPassword: account.isVisibilityPassword,
          };
        });
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot));
}
