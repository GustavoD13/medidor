<template>
  <div>
  <NavBar/>
  </div>
</template>

<script>
import  NavBar  from './NavBar.vue';
import  Cliente  from './Cliente.vue';
import Reporte from './Reporte.vue';
import Procesador from './Procesador.vue';


export default {
components:{
  NavBar,
  Cliente,
  Reporte,
  Procesador
}
}
</script>
