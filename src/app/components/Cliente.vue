<template>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendCliente">
                <div class="form-group">
                  <input type="text" v-model="cliente.cliente" class="form-control" placeholder="Cliente">
                  <input type="text" v-model="cliente.edificio" class="form-control" placeholder="Edificio">
                  <input type="text" v-model="cliente.direccion" class="form-control" placeholder="Direccion">
                  <input type="text" v-model="cliente.lectura" class="form-control" placeholder="Lectura">
                  <input type="text" v-model="cliente.fechainstalacion" class="form-control" placeholder="Fecha de Instalacion">
                </div>
               <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Send</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Edit</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <table class="table table-striped table-dark">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Edificio</th>
                <th>Direccion</th>
                <th>Lectura</th>
                <th>Fecha Instalacion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente of clientes">
               <td>{{cliente.cliente}}</td>
              <td>{{cliente.edificio}}</td>
               <td>{{cliente.direccion}}</td>
                <td>{{cliente.lectura}}</td>
                <td>{{cliente.fechainstalacion}}</td> 
              <td>
                  <button @click="deleteCliente(cliente._id)" class="btn btn-danger">Delete</button>
                  <button @click="editCliente(cliente._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
class Cliente {
  constructor(cliente = '', edificio = '',direccion='',lectura='',fechainstalacion='') {
    this.cliente = cliente;
    this.edificio = edificio;
    this.direccion = direccion;
    this.lectura = lectura;
    this.fechaInstalacion = fechainstalacion;
  }
}
export default {
    name:'Cliente',
      data() {
    return {
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
          const { _id, cliente, edificio,direccion,lectura,fechainstalacion} = data;
          this.cliente = new Cliente(cliente, edificio,direccion,lectura,fechainstalacion);
          this.clienteToEdit = _id;
          this.edit = true;
        });
    }   
  }
}
</script>
