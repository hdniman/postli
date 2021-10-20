import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup"


export function useSignUpForm() {
  const store = useStore()
  const router = useRouter()
  
  const {handleSubmit, isSubmitting} = useForm()

  const {value: nemail, errorMessage: neError, handleBlur: neBlur} = useField('email',
  yup
  .string()
  .trim()
  .min(6, 'Min length is 6')
  .required('Enter Email')
  )
  const {value: npassword, errorMessage: npError, handleBlur: npBlur} = useField('password',
  yup
  .string()
  .trim()
  .min(6, 'Min length is 6')
  .required('Enter Password')
  )

  

  const onSubmit = handleSubmit(async(values) => {
    await store.dispatch('users/signUp', values) //create user
    router.push('/') //push main
  })

  return {
    nemail,
    neError,
    neBlur,
    npassword,
    npError,
    npBlur,
    onSubmit,
    isSubmitting
  }
}