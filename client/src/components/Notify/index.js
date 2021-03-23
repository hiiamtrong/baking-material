import { get } from 'lodash-es'
import { toast } from 'react-toastify'

const notify = {
  errorFromServer: function (error) {
    const message = get(error, 'message', '') || error
    return toast.error(`⛔ ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
  errorMessage: function (message) {
    return toast.error(`⛔ ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
  success: function (message) {
    return toast.success(`✔️ ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
  info: function (message) {
    toast.info(`ℹ️ ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
  warn: function (message) {
    return toast.warn(`⚠️ ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  },
}
export default notify
