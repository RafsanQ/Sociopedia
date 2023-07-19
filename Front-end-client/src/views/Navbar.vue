<script setup>
</script>

<template>
  <header>
      <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'profileView', params: { userId: '12345' } }">Profile View</RouterLink>
      </nav>
  </header>
</template>

<style>

</style>
