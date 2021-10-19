
import { useField, useForm } from "vee-validate";
import { useStore } from "vuex";
import * as yup from "yup";


export function useChangeUserForm() {
  const store = useStore()

  const {handleSubmit, isSubmitting} = useForm()

  const {value: nickname, errorMessage: nError, handleBlur: nBlur} = useField('nickname',
  yup
  .string()
  .required()
  )

  const {value: photo, errorMessage: pError, handleBlur: pBlur} = useField('photo',
  yup
  .string()
  .required()
  )

  const {value: about, errorMessage: aError, handleBlur: aBlur} = useField('about',
  yup
  .string()
  .required()
  )

  const onSubmit = handleSubmit(values => {
    console.log(values)
    store.dispatch('changeUser/changeUser', values)
  })

  return {
    nickname,
    nError,
    nBlur,
    photo,
    pError,
    pBlur,
    about,
    aError,
    aBlur,
    onSubmit
  }
}