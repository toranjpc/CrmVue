<template>
  <div>
    <NuxtPage />
    
    <!-- Loader -->
    <div id="page-loader" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:9999; align-items:center; justify-content:center;">
      <div style="width:50px;height:50px;border:5px solid #fff;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
    </div>
  </div>
</template>

<style>
@keyframes spin { to { transform: rotate(360deg); } }
</style>
