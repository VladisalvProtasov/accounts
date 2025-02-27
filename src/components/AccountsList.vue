<template>
  <div class="accounts-list">
    <div class="accounts-list__header">
      <div class="accounts-list__title">
        Учетные записи
      </div>
      <q-btn icon="add" @click="accountStore.addAccount()"/>
    </div>
    <div class="accounts-list__body form-container">
      <div class="grid-header">
        <div>Метки</div>
        <div>Тип записи</div>
        <div>Логин</div>
        <div>Пароль</div>
        <div></div>
      </div>
      <div v-for="(account, index) in accountList" :key="index" class="accounts-list__item grid-row">
        <q-input
          v-model="account.label"
          outlined
          :rules="[ val => val.length <= 50 || ' Максимум 50 символов']"
        />
        <q-select v-model="account.type" :options="listType" outlined :rules="[val => !!val]"/>
        <q-input
          v-model="account.login"
          outlined
          bottom-space
          :style="account.type === 'Локальная' ? '' : 'grid-column: span 2;'"
          :rules="[ val => !!val && (val.length <= 100 || ' Максимум 100 символов')]"
        />
        <q-input
          v-if="account.type === 'Локальная'"
          v-model="account.password"
          :type="account.isVisibilityPassword ? 'password' : 'text'" outlined
          :rules="[ val => !!val && (val.length <= 100 || ' Максимум 100 символов')]"
        >
          <template v-slot:append>
            <q-icon
              :name="account.isVisibilityPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="account.isVisibilityPassword = !account.isVisibilityPassword"
            />
          </template>
        </q-input>
        <q-icon name="delete" size="sm" @click="accountStore.deleteAccount(index)"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAccountStore } from 'stores/example-store'

const listType = ref(['Локальная', 'LDAP']);
const accountStore = useAccountStore();

const accountList = computed(() => accountStore.getAccountsList);


onMounted(() => {
  accountStore.loadAccounts();
});

window.addEventListener('beforeunload', () => {
  accountStore.saveAccounts();
});
</script>

<style scoped lang="scss">
.accounts-list {
  margin: 0 40px;
  .form-container {
    display: grid;
    gap: 16px;
  }

  .grid-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    font-weight: bold;
    gap: 10px;
    padding-bottom: 8px;
  }

  .grid-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    gap: 10px;
    align-items: center;
  }
  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
 //&__body {
 //
 // }
 // &__item {
 //   display: flex;
 //   gap: 10px;
 //   flex-wrap: nowrap;
 //   align-items: center;
 // }
}
</style>
