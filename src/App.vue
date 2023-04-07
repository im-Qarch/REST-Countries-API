<template>
  <main font-sans overflow-hidden text="center gray-700 dark:gray-200">
    <div max-w-7xl md:mt-12 mx-auto grid grid-cols-1 bg="gray-100 dark:gray-800" drop-shadow-lg>
      <!-- Navbar Section -->
      <Navbar />
      <!-- App Section -->
      <RouterView />
    </div>
  </main>
</template>
