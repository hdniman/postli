
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as yup from 'yup'


export function usePostForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()
  const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
    'title',
    yup
    .string()
    .trim()
    .required('Enter title')
    .min(3, 'Min lingth is 3')
  )
  const {value: articleBody, errorMessage: aError, handleBlur: aBlur} = useField(
    'articleBody',
    yup
    .string()
    .trim()
    .required('Enter name')
    .min(8, 'Min lingth is 8')
  )

  const onSubmit = handleSubmit(async(values) => {
    await store.dispatch('createPost/createPost', values)
    router.push('/')
  })


  return {
    title,
    tError,
    tBlur,
    articleBody,
    aError,
    aBlur,
    onSubmit,
    isSubmitting,
    useField
  }
}