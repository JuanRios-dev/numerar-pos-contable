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

  //Validación de datos
  validateCustomerCreate(data, customers) {
    const errors = {};

    // Helper function to check if a value exists and is unique
    const isUnique = (field, value) =>
      customers.some((customer) => customer[field] === value);

    // Validation rules
    const rules = {
      numero_documento: [
        { test: (value) => value, message: "Número de documento es requerido" },
        {
          test: (value) => /^[\d-]+$/.test(value),
          message: "Número de documento debe contener solo números y guiones",
        },
        {
          test: (value) => value.length >= 7 && value.length <= 15,
          message: "Número de documento debe tener entre 7 y 15 caracteres",
        },
        {
          test: (value) => !isUnique("numero_documento", value),
          message: "Ya existe un cliente con este número de documento.",
        },
      ],
      nombre_razonsocial: [
        { test: (value) => value, message: "Nombre/RazónSocial es requerido" },
      ],
      telefono: [
        {
          test: (value) => !value || /^\d+$/.test(value),
          message: "Número de telefono debe contener solo números",
        },
        {
          test: (value) => !value || !isUnique("telefono", value),
          message: "Ya existe un cliente con este número de telefono.",
        },
      ],
      correo: [
        {
          test: (value) => !value || /\S+@\S+\.\S+/.test(value),
          message: "Formato de correo electrónico inválido",
        },
      ],
    };

    Object.keys(rules).forEach((field) => {
      const value = data[field];
      for (let rule of rules[field]) {
        if (!rule.test(value)) {
          errors[field] = rule.message;
          break;
        }
      }
    });

    return errors;
  }
}

export default CustomerService;
