import { inject } from 'vue'
import { useRouter } from 'vue-router';


export default () => {
    const swal = inject('$swal')
    const router = useRouter()

    const formatDate = (string, timeZone = 7, symbol = '/') => {
        if (string != '' && string != 0) {
            let date = new Date(string);
            date.setHours(date.getHours() - timeZone);
            return {
                'date' : (`0` + date.getDate()).slice(-2) + symbol + (`0`+(date.getMonth() + 1)).slice(-2) + symbol + date.getFullYear(),
                'time' : (`0`+date.getHours()).slice(-2) + `:` + (`0`+date.getMinutes()).slice(-2),
            };
        }

        return {
            'date' : '',
            'time' : '',
        };
    }  

    const sweetAlert = (title, text, icon) => {
        swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Close'
        }).then((result) => {
            if(result['isConfirmed']) {
                console.log("DH")
            }
        })
    }

    const sweetAlertChangePage = ({title, text, icon}, page) => {
        // {title, text, icon} = type
        swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Close'
        }).then((result) => {
            if(result['isConfirmed']) {
                router.push({name: page})
            }
        })
    }

    const sweetAlertTopEnd = (title, icon) => {
        swal.fire({
            icon: icon,
            title: title,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    }

    return {
        formatDate,
        sweetAlert,
        sweetAlertTopEnd,
        sweetAlertChangePage,
    }
}