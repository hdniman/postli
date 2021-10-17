
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import * as yup from 'yup'


export function usePostForm() {
  const store = useStore()
  const router = useRouter()
  const {handleSubmit, isSubmitting} = useForm()
  const {value: name, errorMessage: nError, handleBlur: nBlur} = useField(
    'name',
    yup
    .string()
    .trim()
    .required('Enter name')
    .min(4, 'Min lingth is 4')
  )
  const {value: article, errorMessage: aError, handleBlur: aBlur} = useField(
    'article',
    yup
    .string()
    .trim()
    .required('Enter name')
    .min(8, 'Min lingth is 8')
  )

  const onSubmit = handleSubmit(async(values) => {
    await store.dispatch('createPost/createPost', values)
    name.value = ''
    article.value = ''
    router.push('/')
  })


  return {
    name,
    nError,
    nBlur,
    article,
    aError,
    aBlur,
    onSubmit,
    isSubmitting,
    useField
  }
}