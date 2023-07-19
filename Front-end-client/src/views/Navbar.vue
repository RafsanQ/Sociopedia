<script setup>
</script>

<template>
  <header>
      <nav>
        <!-- <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
        <RouterLink :to="{ name: 'profileView', params: { userId: '12345' } }">Profile View</RouterLink> -->
        
        <div class="logo">
          <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: 'home' }">
            <h2>
              Sociopedia
            </h2>
          </RouterLink>
        </div>

        <div class="searchbar">
          <input placeholder="Search"/>
        </div>
      </nav>

  </header>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav .logo {
  padding: 1rem 6%;
  background-color: #ffffff;
}


nav .logo h2 {
  gap: 1.75rem;
  font-weight: bold;
  font-size: clamp(1rem, 2rem, 2.25rem);
  color: #00A0BC;
}

nav .logo h2:hover {
  filter: brightness(105%)
}

nav .searchbar {
  border-radius: 9px;
  gap: 3rem;
  padding: 0.1rem 1.5rem;

}


</style>
