import { ChangeEvent, FormEvent, useState } from 'react'

interface Props<T> {
  initialValues: T
  onSubmit: (values: T) => void
  validate: (values: T) => object
}

const useForm = <T>({ initialValues, onSubmit, validate }: Props<T>) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors = validate(values)
    const isError = Object.keys(newErrors).length !== 0

    if (isError) {
      setErrors(newErrors)
    } else {
      onSubmit(values)
      setErrors({})
    }

    setValues(initialValues)
    setIsLoading(false)
  }

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit
  }
}

export default useForm
