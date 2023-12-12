import { inject } from 'vue'
import { useRouter } from 'vue-router';


export default () => {
    const swal = inject('$swal')
    const router = useRouter()

    const formatDate = (string, timeZone = 0, symbol = '/') => {
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

    const getImgURL = (img) => {
        return window.location.origin + '/storage/' + img;
    }

    const setParamsUrl = (params) => {
        let conditions = ''

        if (Object.keys(params).length !== 0) {
            conditions = '?'
            for (var key in params) {
                conditions += `${(conditions != '?') ? '&' : ''}${key}=${params[key]}`
            }
        }

        let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + conditions;
        window.history.pushState({path:newUrl}, "", newUrl);

        return params
    }

    const getParamsUrl = (conditions) => {
        let url = window.location.search;
        let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        let queryArr = queryString.split('&');

        if(url !== '') {
            queryArr.forEach((value, key) => {
                let arr = value.split('=');
                conditions[arr[0]] = arr[1]
            })
        }

        return conditions
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

    const sweetLoading = () => {
        swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            // didOpen: () => {
            //     swal.showLoading();
            //     const timer = swal.getPopup().querySelector("b");
            //     timerInterval = setInterval(() => {
            //     timer.textContent = `${Swal.getTimerLeft()}`;
            //     }, 100);
            // },
            // willClose: () => {
            //     clearInterval(timerInterval);
            // }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
        });
    }

    return {
        formatDate,
        sweetAlert,
        sweetAlertTopEnd,
        sweetAlertChangePage,
        getImgURL,
        sweetLoading,
        setParamsUrl,
        getParamsUrl,
    }
}