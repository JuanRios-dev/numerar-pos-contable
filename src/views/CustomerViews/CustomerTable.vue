<template>
    <MainLayout>
        <h1>Listado de Clientes</h1>

        <TableData :headers="headers" :data="customers" :rowsPerPage="7">
            <template #buttons>
                <Button @click="() => { this.$refs.clientModal.openModal() }" :title="'Agregar Cliente'"
                    :icon="'IoAddCircleSharp'" :color="'#074F8E'"></Button>
            </template>
        </TableData>

        <Modal ref="clientModal" width="400px" :title="'Agregar Cliente'" backgroundColor="#f0f0f0">
            <template #content>
                <CustomerForm :data="form" :errors="errors"></CustomerForm>
            </template>
            <template #footer>
                <Button @click="saveCustomer()" :title="'Guardar Cliente'" :color="'#074F8E'"
                    :icon="'IoAddCircleSharp'"></Button>
            </template>
        </Modal>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import TableData from '@/components/TableData.vue'
import CustomerService from '@/services/customerService'
import CustomerForm from '@/components/Form/CustomerForm.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

export default {
    name: 'CustomerList',
    components: {
        MainLayout,
        TableData,
        CustomerForm,
        Button,
        Modal,
        Alert
    },
    data() {
        return {
            clientModal: null,
            headers: [
                { label: 'Documento', key: 'numero_documento' },
                { label: 'Nombre', key: 'nombre_razonsocial' },
                { label: 'Correo', key: 'correo' },
                { label: 'Teléfono', key: 'telefono' },
                { label: 'Municipio', key: 'municipio' }
            ],
            customerService: new CustomerService(),
            customers: [],
            form: {
                tipo_persona: 0,
                tipo_documento: 'CC',
                numero_documento: '',
                nombre_razonsocial: '',
                telefono: '',
                correo: '',
                municipio: ''
            },
            errors: {},
        }
    },
    methods: {
        async fetchCustomers() {
            this.customers = await this.customerService.getAll();
        },
        resetForm() {
            this.form = {
                tipo_persona: 0,
                tipo_documento: 'CC',
                numero_documento: '',
                nombre_razonsocial: '',
                telefono: '',
                correo: '',
                municipio: ''
            };
            this.errors = {};
        },
        async saveCustomer() {
            this.errors = this.customerService.validateCustomerCreate(this.form, this.customers);

            if (Object.keys(this.errors).length === 0) {
                try {
                    console.log(this.form);
                    this.customers = await this.customerService.getAll();
                    this.$refs.clientModal.closeModal();
                    this.resetForm();
                } catch (error) {
                    console.error("Error saving customer:", error);
                }
            } else {
            }
        },
    },
    mounted() {
        this.fetchCustomers();
    }
}
</script>

<style lang="scss" scoped>
h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 400;
}
</style>
