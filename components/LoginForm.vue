<template>
  <div class="wrapper">
    <a
      @click.prevent="modalShown=true"
    >{{ authUser ? authUser.email : 'Sign in' }} ▾</a>
    <div v-if="modalShown" class="modal">
      <a @click.prevent="reset">Close</a>
      <br>
      <br>
      <div v-if="authUser">
        <form v-if="mode.passwordRecovery">
          <p v-if="form.error" class="error">{{ form.error }}</p>
          <p>
            Current password
            <input v-model="form.currentPassword" type="password">
          </p>
          <p>
            New password
            <input v-model="form.password" type="password">
          </p>
          <p>
            New password (Again)
            <input v-model="form.passwordAgain" type="password">
          </p>
        </form>
        <button @click.prevent="changePassword">Change password</button>
        <br>
        <button @click.prevent="logout">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="auth">
          <p v-if="form.error" class="error">{{ form.error }}</p>
          <p>
            Email:
            <input v-model="form.email" type="text" name="email">
          </p>
          <p>
            Password:
            <input v-model="form.password" type="password" name="password">
          </p>
          <p v-if="mode.register">
            Password (again):
            <input
              v-model="form.passwordAgain"
              type="password"
              name="passwordAgain"
            >
          </p>
          <button type="submit">{{ mode.register ? 'Create account' : 'Sign in' }}</button>
        </form>
        <a
          class="form-switch"
          @click.prevent="mode.register=!mode.register"
        >{{ mode.register ? 'Sign in' : 'Create account' }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const getDefaultData = () => ({
  modalShown: false,
  form: {
    error: null,
    email: '',
    password: '',
    passwordAgain: '',
    currentPassword: '' // For change password form
  },
  mode: {
    register: false,
    passwordRecovery: false
  }
});

export default {
  data: getDefaultData,
  computed: {
    ...mapGetters({
      authUser: 'auth/authUser'
    })
  },
  methods: {
    ...mapActions({
      register: 'auth/register',
      login: 'auth/login',
      logout: 'auth/logout',
      changePassword: 'auth/changePassword'
    }),
    reset() {
      const d = getDefaultData();
      Object.keys(d).forEach(key => {
        this.$data[key] = d[key];
      });
    },
    async auth() {
      try {
        if (
          this.mode.register &&
          this.form.password !== this.form.passwordAgain
        ) {
          throw Error('Passwords should match');
        }
        const action = this.mode.register ? 'register' : 'login';
        await this.$store.dispatch('auth/' + action, {
          email: this.form.email,
          password: this.form.password
        });
        this.reset();
      } catch (e) {
        this.form.error = e.message;
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.reset();
      } catch (e) {
        this.form.error = e.message;
      }
    },
    async changePassword() {
      if (!this.mode.passwordRecovery) {
        this.mode.passwordRecovery = true;
        return;
      }
      try {
        if (this.form.password !== this.form.passwordAgain) {
          throw Error('Passwords should match');
        }
        await this.$store.dispatch('auth/changePassword', {
          currentPassword: this.form.currentPassword,
          newPassword: this.form.password
        });
        this.reset();
      } catch (e) {
        this.form.error = e.message;
      }
    }
  }
};
</script>

<style>
a {
  text-decoration: underline;
}
.wrapper {
  position: relative;
}
.modal {
  position: absolute;
  left: -1px;
  top: -1px;
  border: 1px solid #888;
  color: black;
  background: white;
  padding: 0.4em 0.8em;
}
.modal form {
  margin: 1em auto 0.2em;
}
.modal .form-switch {
  float: right;
}
.error {
  color: red;
}
</style>
