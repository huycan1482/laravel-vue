import { inject } from 'vue'
import { useRouter } from 'vue-router'

export default () => {
    const swal = inject('$swal')
    const router = useRouter()

    const loadingShow = () => swal.showLoading()
    const loadingHide = () => swal.hideLoading()

    const loadingModal = () => {
        // swal.showLoading()
        swal.fire({
            title: 'Please Wait !',
            html: `<div class="loading-spinner"></div>`,
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        })
    }

    const sweetAlert = (title, text, icon) => {
        swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: 'Close'
        }).then((result) => {
            if(result['isConfirmed']) {
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
        loadingModal,
        sweetAlert,
        sweetAlertChangePage,
        sweetAlertTopEnd,
        sweetLoading,
        loadingShow,
        loadingHide,
    }
}