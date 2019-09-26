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
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true)
        try {
          await dispatch(requestSignIn(values))
        } catch ({ message }) {
          setStatus(message)
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <h1>Login</h1>
          {status && <div>{status}</div>}
          <Field type="email" name="email" required />
          <Field type="password" name="password" required />
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
