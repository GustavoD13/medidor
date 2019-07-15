<template>
  <div>
    <b-table :fields="fields" :items="clientes" striped responsive="sm">
      <template slot="show_details" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
         <b-button size="sm" @click="deleteCliente(this.cliente._id)" class="mr-2">Delete</b-button>
         <b-button size="sm" @click="editCliente(this.cliente._id)" class="mr-2">Edit</b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Cliente:</b></b-col>
            <b-col>{{ row.item.cliente }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Edificio:</b></b-col>
            <b-col>{{ row.item.edificio }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Direccion:</b></b-col>
            <b-col>{{ row.item.direccion }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Lectura:</b></b-col>
            <b-col>{{ row.item.lectura }}</b-col>
          </b-row>

           <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Fecha Instalacion:</b></b-col>
            <b-col>{{ row.item.fechainstalacion }}</b-col>
          </b-row>

 </b-card>
      </template>
    </b-table>
  </div>
</template>




<script>
class Cliente {
  constructor(cliente = '', edificio = '',direccion='',lectura='',fechainstalacion='') {
    this.cliente = cliente;
    this.edificio = edificio;
    this.direccion = direccion;
    this.lectura = lectura;
    this.fechainstalacion = fechainstalacion;
  }
}
export default {
    name:'Procesador',
      data() {
    return {
        fields: ['cliente', 'show_details'],
      cliente: new Cliente(),
      clientes: [],
      edit: false,
      clientToEdit: ''
    }
  },
  created() {
    this.getClientes();
  },
  methods: {
    sendCliente() {
      if(this.edit === false) {
        fetch('/api/clientes', {
          method: 'POST',
          body: JSON.stringify(this.cliente),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getClientes();
            this.cliente = new Cliente();
          });
      }
      else {
        fetch('/api/clientes/' + this.clienteToEdit, {
          method: 'PUT',
          body: JSON.stringify(this.cliente),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getClientes();
            this.cliente = new Cliente();
            this.edit = !this.edit;
          });
      }
    },
    getClientes() {
      fetch('/api/clientes')
        .then(
          res => res.json()
          )
        .then(data => {
          this.clientes = data;
        });
    },
    deleteCliente(ClienteId) {
      fetch('/api/clientes/' + ClienteId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getClientes();
        });
    },
    editCliente(Id) {
      fetch('/api/clientes/' + Id)
        .then(res => res.json())
        .then(data => {
          const { _id, cliente, edificio,direccion,lectura,fechaInstalacion} = data;
          this.cliente = new Cliente(cliente, edificio,direccion,lectura,fechaInstalacion);
          this.clienteToEdit = _id;
          this.edit = true;
        });
    }   
  }
}
</script>

</script>
