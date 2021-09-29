let txtNombre = document.getElementById('txtNombre');
txtNombre.focus();

const app = new Vue({
	el: '#app',
	data: {
		titulo: 'Agenda',
		contactos: [],
		contactoNombre: '',
        contactoApellido: '',
		contactoTelefono: '',
		contactoInsta: '',
        contactoDireccion: '',
		seleccionado: false,
	},

	methods: {
		limpiar: function () {
			this.contactoNombre = '';
            this.contactoApellido = '';
			this.contactoTelefono = '';
			this.contactoInsta = '';
            this.contactoDireccion = '';
		},

		// Agregar un contacto
		agregarContacto: function () {
			//Validar
			if (
				this.contactoNombre === '' ||
                this.contactoApellido === '' ||
				this.contactoTelefono === '' ||
				this.contactoInsta === '' ||
                this.contactoDireccion === '' 
			) {
				alert('¡Favor de completar todos los campos!');
			} else {
				this.contactos.push({
					nombre: this.contactoNombre,
                    apellido: this.contactoApellido,
					telefono: this.contactoTelefono,
					insta: this.contactoInsta,
                    direccion: this.contactoDireccion,
				});

				this.limpiar();
				localStorage.setItem('agenda', JSON.stringify(this.contactos));
				let txtNombre = document.getElementById('txtNombre');
				txtNombre.focus();
			}
		},

		// Mostrar un contacto
		mostrarContacto: function (index) {
			if (this.contactoNombre === '') {
				document.getElementById('boton-submit').disabled = true;
				this.contactos[index].seleccionado = true;
				this.contactoNombre = this.contactos[index].nombre;
                this.contactoApellido = this.contactos[index].apellido;
				this.contactoTelefono = this.contactos[index].telefono;
				this.contactoInsta = this.contactos[index].insta;
                this.contactoDireccion = this.contactos[index].direccion;
			} else {
				this.editarContacto(index);
				this.contactos[index].seleccionado = false;
				document.getElementById('boton-submit').disabled = false;
			}
		},

		// Editar un contacto
		editarContacto: function (index) {
			this.contactos[index].nombre = this.contactoNombre;
            this.contactos[index].apellido = this.contactoApellido;
			this.contactos[index].telefono = this.contactoTelefono;
			this.contactos[index].insta = this.contactoInsta;
            this.contactos[index].direccion = this.contactoDireccion;
			this.btnEdicion = 'Editar';
			this.limpiar();

			localStorage.setItem('agenda', JSON.stringify(this.contactos));
		},

		// Eliminar un contacto
		eliminar: function (index) {
			this.contactos.splice(index, 1);
			localStorage.setItem('agenda', JSON.stringify(this.contactos));
		},
	},

	// Local Storage
	created: function () {
		let datosDB = JSON.parse(localStorage.getItem('agenda'));
		console.log(datosDB);

		if (datosDB === null) {
			this.contactos = [];
		} else {
			this.contactos = datosDB;
		}
	},
});

$(document).ready(function () {
	$('#telefono').mask('000-000-0000');
});