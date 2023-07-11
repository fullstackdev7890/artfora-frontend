<template>
  <div class="users-list" ref="usersListComponentRef">
    <table>
      <thead>
        <th>No.</th>
        <th>ID</th>
        <th>Username</th>
        <th>Tagname</th>
        <th>Email</th>
        <th>Created</th>
        <th class="centered-column">Role</th>
        <th class="centered-column">Filter</th>
        <th class="centered-column">Seller Sponser</th>
        <th class="centered-column">Gallery</th>
        <th class="centered-column">Buyer Sponser</th>

        <th class="centered-column">Action</th>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.tagname }}</td>
          <td>{{ user.email }}</td>
          <td>
            {{ new Date(user.created_at).toISOString().replace("T", " ").slice(0, 19) }}
          </td>
          <td class="centered-column">{{ user.role_id }}</td>
          <td class="centered-column">{{ user.product_visibility_level }}</td>
          <td class="centered-column">
            {{ user.seller_support === true ? "Yes" : "No" }}
          </td>
          <td class="centered-column">
            <button
              v-if="user.can_add_product"
              class="button toggle-button yes-button"
              @click.prevent="updateUser(user.id, false)"
            >
              <span>YES</span>
            </button>
            <button
              v-else
              class="button toggle-button no-button"
              @click.prevent="updateUser(user.id, true)"
            >
              <span>NO</span>
            </button>
          </td>

          <td class="centered-column">
            <button
              v-if="user.buyer_support === true"
              class="button toggle-button yes-button"
              @click.prevent="updateUserBuyerSupport(user.id, false)"
            >
              <span>YES</span>
            </button>
            <button
              v-else
              class="button toggle-button no-button"
              @click.prevent="updateUserBuyerSupport(user.id, true)"
            >
              <span>NO</span>
            </button>
          </td>
          <td class="centered-column">
            <button class="button" @click.prevent="deleteUser(user.id)">
              <span>Delete</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useUsersStore } from "~/store/users";
import axios from "axios";

const currentPage = ref(1);
const usersStore = useUsersStore();
const users = ref();
const items = [
  { age: 32, first_name: "Cyndi" },
  { age: 27, first_name: "Havij" },
  { age: 42, first_name: "Robert" },
];
onMounted(async () => {
  await usersStore.fetchAll();
  users.value = usersStore.users.data;
});

async function updateUser(id: number, can_add_product: boolean) {
  usersStore.update(id, { can_add_product: can_add_product }).then(async () => {
    await usersStore.fetchAll();
    users.value = usersStore.users.data;
  });
}
async function updateUserBuyerSupport(id: number, value: boolean) {
  usersStore.update(id, { buyer_support: value }).then(async () => {
    await usersStore.fetchAll();
    users.value = usersStore.users.data;
  });
}

async function deleteUser(id: number) {
  if (confirm("Are you sure you want to delete this user?")) {
    usersStore.delete(id).then(() => {
      usersStore.fetchAll().then(() => {
        users.value = usersStore.users.data;
      });
    });
  }
}

const rows = computed(() => usersStore.users.data.length);
</script>
