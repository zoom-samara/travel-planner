import React from 'react'
import { Formik, Form, Field } from 'formik'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestSignIn } from './authActions'
import { Link } from 'react-router-dom'

const Signin: React.FC = () => {
  const dispatch = useThunkDispatch()

  return (
    <Formik
      initialValues={{ email: 'me4@ebulgakov.com', password: 'password' }}
      onSubmit={async (values, { setSubmitting, setError }) => {
        try {
          await dispatch(requestSignIn(values))
        } catch ({ message }) {
          setError(message)
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, error }) => (
        <Form>
          <h1>Login</h1>
          {error && <div>{error}</div>}
          <Field type="email" name="email" />
          <Field type="password" name="password" />
          <button type="submit" disabled={isSubmitting}>
            Auth me
          </button>
          <Link to="/auth/signup">Sign Up</Link>
        </Form>
      )}
    </Formik>
  )
}

export default Signin
