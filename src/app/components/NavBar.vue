<template>
<div>
    <b-navbar toogleable='md' type='dark' variant='dark'>
<b-navbar-brand>Consumo</b-navbar-brand>
<b-container>
      <b-navbar-toogle target='nav_collapse'>  </b-navbar-toogle>
        
    <b-collapse is-nav id='nav_collapse'>
            <b-navbar-nav>
        <b-nav-item :to="{name: 'Home'}" exact>Home</b-nav-item>
        <b-nav-item :to="{name: 'Cliente'}">Cliente</b-nav-item>
        <b-nav-item :to="{name: 'Procesador'}">Procesador</b-nav-item>
        <b-nav-item :to="{name: 'Reporte'}">Reporte</b-nav-item>
      </b-navbar-nav>

    </b-collapse>

   </b-container>
    </b-navbar>

<b-container>
    <router-view> </router-view>
</b-container>


</div>


</template>


<script>

export default {
    name: 'NavBar'
}
</script>


