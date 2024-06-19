<template>
    <MainLayout>
        <h1>Listado de Proveedores</h1>

        <TableData :headers="headers" :data="providers" />
    </MainLayout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'
import TableData from '@/components/TableData.vue'
import ProviderService from '@/services/providerService'

export default defineComponent({
    name: 'ProviderTable',
    components: {
        MainLayout,
        TableData,
    },
    setup() {
        let headers = ref([
            { label: 'Nombre', key: 'nombre_razonsocial' },
            { label: 'Documento', key: 'numero_documento' },
            { label: 'Email', key: 'correo' },
            { label: 'Teléfono', key: 'telefono' }
        ])

        const service = new ProviderService()
        let providers = ref([])

        onMounted(async () => {
            providers.value = await service.getAll();
        });

        return {
            headers,
            providers
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
