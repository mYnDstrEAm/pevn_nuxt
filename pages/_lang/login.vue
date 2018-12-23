<template>
  <div>
    <h1>Authentication</h1>
    <h3>using Passport + Sequelize4 + PostgreSQL</h3>
    <login-form/>
  </div>
</template>

<script>
import LoginForm from '~/components/LoginForm';

export default {
  components: { LoginForm }
};
</script>
