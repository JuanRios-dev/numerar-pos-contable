import { ref } from "vue";

class CustomerService {
  constructor() {
    this.customers = ref([]);
    this.customer = ref({});
  }

  //Get all Posts
  async getAll() {
    try {
      const response = await axios.get("/customers?company_id=1");
      this.customers.value = response.data.customers.data;
      return this.customers.value;
    } catch (error) {
      console.log(error);
    }
  }

  // VALIDACION DE DATOS AL CREAR CLIENTE
  validateCustomerCreate(data, customers) {
    const errors = {};

    //NUMERO DE DOCUMENTO
    if (!data.numero_documento) {
      errors.numero_documento = "Número de documento es requerido";
    } else if (!/^\d+$/.test(data.numero_documento)) {
      errors.numero_documento =
        "Número de documento debe contener solo números";
    } else if (
      data.numero_documento.length < 7 ||
      data.numero_documento.length > 15
    ) {
      errors.numero_documento =
        "Número de documento debe tener entre 7 y 15 caracteres";
    } else {
      const existingCustomer = customers.find(
        (customer) => customer.numero_documento === data.numero_documento
      );
      if (existingCustomer) {
        errors.numero_documento =
          "Ya existe un cliente con este número de documento.";
      }
    }

    //NOMBRE O RAZON SOCIAL
    if (!data.nombre_razonsocial) {
      errors.nombre_razonsocial = "Nombre/RazónSocial es requerido";
    }

    //TELEFONO
    if (data.telefono && !/^\d+$/.test(data.telefono)) {
      errors.telefono = "Número de telefono debe contener solo números";
    } else {
      const existingCustomer = customers.find(
        (customer) => customer.telefono === data.telefono
      );
      if (existingCustomer) {
        errors.telefono = "Ya existe un cliente con este número de telefono.";
      }
    }

    // CORREO ELECTRÓNICO
    if (data.correo && !/\S+@\S+\.\S+/.test(data.correo)) {
      errors.correo = "Formato de correo electrónico inválido";
    }

    return errors;
  }

  validateCustomerEdit(data, customers) {
    const errors = {};

    if (!data.nombre_razonsocial) {
      errors.nombre_razonsocial = "Nombre/Razón social es requerido";
    }

    if (data.telefono) {
      const existingCustomerWithSamePhone = customers.find(
        (c) => c.telefono === data.telefono && c.id !== data.id
      );
      if (existingCustomerWithSamePhone) {
        errors.telefono =
          "Este número de teléfono ya está en uso por otro cliente.";
      }
    }

    return errors;
  }

  async create(data) {
    try {
      const response = await axios.post("/customers", data);
      return response.data;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw error;
    }
  }
}

export default CustomerService;
