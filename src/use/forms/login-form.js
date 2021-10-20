
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from 'yup'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()

  const { handleSubmit, isSubmitting} = useForm()
  
  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
  yup
  .string()
  .trim()
  .min(6, 'Min length is 6')
  .required('Enter Email')
  )
  

  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
  yup
  .string()
  .trim()
  .min(6, 'Min length is 6')
  .required('Enter Password')
  )

  const onSubmit = handleSubmit(async(values) => {
    await store.dispatch('auth/login', values)
    router.push('/')
  })

  return {
    email,
    eError,
    eBlur,
    password,
    pError,
    pBlur,
    onSubmit
  }
}