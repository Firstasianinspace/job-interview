<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">Go to First</RouterLink>
    <RouterLink to="/About">Go to Second</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
