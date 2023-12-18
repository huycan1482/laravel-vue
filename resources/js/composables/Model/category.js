import { ref, reactive } from 'vue'
import alertFunc from "../../common/alert"
import apiCaller from '../../plugins/axios';

export default function useCategory () {
    const axiosInstance = apiCaller();

    const categories = ref([])
    const category = ref([])
    const errors = ref([])
    const errorText = ref('')

    const { sweetAlert, sweetAlertChangePage } = alertFunc()

    const getCategories = async () => {
        let response = await axiosInstance.get('/api/category/getAll')
        categories.value = response.data.data
    }

    const getCategory = async (id) => {
        let response = await axiosInstance.get('/api/category/'+id)
        category.value = convertData(response.data.data);
    }

    const storeCategory = async (data) => {
        errorText.value = ''
        errors.value = ''
        try {
            await axiosInstance.post('/api/category', data, { headers : {'Content-Type': 'multipart/form-data'} })

            const alert = {
                title : 'Store success',
                text : '',
                icon : 'success'
            }
            
            sweetAlertChangePage(alert, 'category.index')

        } catch (e) {
            sweetAlert('Store fail', e.response.data.message ? e.response.data.message :  '', 'error')

            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errorText.value += e.response.data.errors[key][0] + ' '
                }
                errors.value = e.response.data.errors
            }

        }
    } 

    const updateCategory = async (id, data) => {
        errorText.value = ''
        errors.value = ''

        data.append('_method', 'PUT');
        
        try {
            await axiosInstance.post('/api/category/' + id, data, { headers : {'Content-Type': 'multipart/form-data'} })

            const alert = {
                title : 'Update success',
                text : '',
                icon : 'success'
            }

            sweetAlertChangePage(alert, 'category.index')
        } catch (e) {
            sweetAlert('Update fail', e.response.data.message ? e.response.data.message :  '', 'error')

            console.log(e)
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errorText.value += e.response.data.errors[key][0] + ' '
                }
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyCategory = async (id) => {
        try {
            let response = await axiosInstance.delete('/api/category/' + id)
            if (response.data.success) {
                sweetAlert('Destroy success', '', 'success')
            } else {
                sweetAlert('Destroy fail', '', 'error')
            }
            
        } catch (e) {
            sweetAlert('Destroy fail', e.response.data.message ? e.response.data.message :  '', 'error')
            console.log(e)
        }
    }

    const convertData = (data) => {
        data.active = !!data.active
        return data
    }

    return {
        categories,
        category,
        errors,
        errorText,
        getCategories,
        getCategory,
        storeCategory,
        updateCategory,
        destroyCategory
    }
}