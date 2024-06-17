<template>
    <MainLayout>
        <h1>Listado de Clientes</h1>

        <TableData :headers="headers" :data="customers" :rowsPerPage="7">
            <template #buttons>
                <Button @click="() => { clientModal.openModal() }" :title="'Agregar Cliente'" :icon="'IoAddCircleSharp'"
                    :color="'#074F8E'"></Button>
            </template>
        </TableData>

        <Modal ref="clientModal" width="400px" :title="'Agregar Cliente'" backgroundColor="#f0f0f0">
            <template #content>
                <CustomerForm :data="form" :errors="errors"></CustomerForm>
            </template>
            <template #footer>
                <Button @click="saveCustomer()" :title="'Guardar Cliente'" :color="'#074F8E'" :icon="'IoAddCircleSharp'"></Button>
            </template>
        </Modal>
    </MainLayout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import TableData from '@/components/TableData.vue'
import CustomerService from '@/services/CustomerService'
import CustomerForm from '@/components/Form/CustomerForm.vue'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    name: 'CustomerList',
    components: {
        MainLayout,
        TableData,
        CustomerForm,
        Button,
        Modal
    },
    setup() {
        const clientModal = ref(null)

        let headers = ref([
            { label: 'Documento', key: 'numero_documento' },
            { label: 'Nombre', key: 'nombre_razonsocial' },
            { label: 'Correo', key: 'correo' },
            { label: 'Teléfono', key: 'telefono' },
            { label: 'Municipio', key: 'municipio' }
        ])

        const customerService = new CustomerService()
        let customers = ref([])

        onMounted(async () => {
            customers.value = await customerService.getAll();
        });

        /* OBJECT DATA FORM */

        const form = ref({
            tipo_persona: 0,
            tipo_documento: 'CC',
            numero_documento: '',
        })

        const errors = ref({});

        const saveCustomer = async () => {
            errors.value = customerService.validateCustomerCreate(form.value, customers.value);

            if (Object.keys(errors.value).length === 0) {
                try {
                    await customerService.create(form.value);
                    customers.value = await customerService.getAll();
                    clientModal.value.closeModal();
                } catch (error) {
                    console.error("Error saving customer:", error);
                }
            }
        }

        return {
            headers,
            customers,
            clientModal,
            form,
            errors,
            saveCustomer
        }
    },
})
</script>

<style lang="scss" scoped>
h1 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 1.5rem;
    font-weight: 400;
}
</style>
