import { ref } from "vue";

class ProviderService {

  constructor() {
    this.providers = ref([]);
    this.provider = ref({});
  }

  //Get all Posts
  async getAll() {
    try {
      const response = await axios.get("/providers?company_id=1");
      this.providers.value = response.data.providers.data;
      return this.providers.value;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProviderService;
