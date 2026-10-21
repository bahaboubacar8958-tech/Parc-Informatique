<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/ordinateurs">
        <span>
          <strong>Parc informatique</strong>
          <small>Gestion des ordinateurs</small>
        </span>
      </RouterLink>
      <nav aria-label="Navigation principale">
        <RouterLink class="nav-action" to="/ordinateurs/ajouter">+&nbsp; Ajouter un ordinateur</RouterLink>
      </nav>
    </header>
    <main class="page-container">
      <RouterView />
    </main>
  </div>
</template>
