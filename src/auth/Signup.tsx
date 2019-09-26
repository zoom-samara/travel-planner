import React from 'react'
import useThunkDispatch from '../common/useThunkDispatch'
import { requestSignUp } from './authActions'
import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'

const Signup: React.FC = () => {
  const dispatch = useThunkDispatch()

  return (
    <Formik
      initialValues={{ email: '', password: '', displayName: '' }}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true)
        try {
          await dispatch(requestSignUp(values))
        } catch ({ message }) {
          setStatus(message)
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form>
          <h1>SignUp</h1>
          {status && <div>{status}</div>}
          <Field type="email" name="email" required />
          <Field type="text" name="displayName" required />
          <Field type="password" name="password" required />
          <button type="submit" disabled={isSubmitting}>
            Reg me
          </button>
          <Link to="/auth/signin">Sign In</Link>
        </Form>
      )}
    </Formik>
  )
}

export default Signup
