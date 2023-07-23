<template>
    <div class="text-center">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="md: account_circle"
            variant="plain"
            v-bind="props"
          >
            
          </v-btn>
        </template>
  
        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-icon style="display: inline;">{{ item.icon }}</v-icon>
            <v-list-item-title style="display: inline;"><span>{{ item.title }}</span></v-list-item-title>
            
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
</template>
  
<script>
export default {
    data: () => ({
    items: [
        { title: 'View Profile', routeName: 'profileView/', icon: 'md: person'},
        { title: 'Change Theme', routeName: 'profileView/', icon: 'md: display_settings' },
        { title: 'Account Settings', routeName: 'profileView/', icon: 'md: settings' },
        { title: 'Log out', routeName: 'logout/', icon: 'md: logout' },
    ],
    }),
}
</script>

<style scoped>
.text-center{
    display: inline;
}
</style>

