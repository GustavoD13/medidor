<template>
<div>
  <b-card-group deck>
    <b-card

      title="ABM CLIENTES"
    >
         <form  @submit.prevent="sendCliente">

          
            <div class="card-body">
            <b-col cols="12" > 
                <b-form-input type='text' v-model='cliente.cliente' placeholder="Cliente" ></b-form-input>
                <b-form-input type='text' v-model='cliente.edificio' placeholder="edificio" ></b-form-input>
                <b-form-input type='text' v-model='cliente.direccion' placeholder="direccion"></b-form-input>
                <b-form-input type='text' v-model='cliente.lectura' placeholder="lectura" ></b-form-input>
                <b-form-input type='date' v-model='cliente.fechainstalacion' placeholder="Fecha de instalacion" ></b-form-input>
                  <template v-if="edit === false">
                  <b-button class="btn btn-primary btn-block">Send</b-button>
                </template>
                <template v-else>
                  <b-button class="btn btn-primary btn-block">Edit</b-button>
                </template>

             
            </b-col >
            </div>
   

             </form>
    </b-card>

    <b-card title="CLIENTES" header-tag="header" footer-tag="footer">
  <div>
    <b-table striped hover :fields="fields" :items="clientes">
     <!--   <b-table-column>
                          <button @click="deleteCliente(cliente._id)" class="btn btn-danger">Delete</button>
                  <button @click="editCliente(cliente._id)" class="btn btn-secondary">Edit</button>
                  </b-table-column>
       -->           
    </b-table>
  </div>
    </b-card>
  </b-card-group>
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
    name:'Home',
      data() {
    return {
        fields: ['cliente', 'edificio', 'direccion','lectura','fecha instalacion', 'accion'],
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

