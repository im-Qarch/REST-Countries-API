<template>
  <nav sticky top-0 z-50 flex justify-between items-center gap-4 bg="white dark:gray-900" shadow-sm p-4>
    <!-- Header -->
    <header text-xl font-semibold>
      Where in the world?
    </header>
    <!-- Configs -->
    <div text-xl flex items-center gap-4>
      <!-- Theme Toggle -->
      <button icon-btn @click="toggleDark()">
        <div dark:i-carbon-sun i-carbon-moon />
      </button>
      <!-- Social Buttons -->
      <a
        icon-btn i-carbon-logo-github
        rel="noreferrer"
        href="https://github.com/im-Qarch/REST-Countries-API"
        target="_blank"
        title="GitHub"
      />
    </div>
  </nav>
</template>
