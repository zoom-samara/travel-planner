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
        <Form className="auth">
          <h1 className="auth_title">Sign Up</h1>
          {status && <div className="form_error">{status}</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field className="form-control" type="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="displayName">Display Name</label>
            <Field className="form-control" type="text" name="displayName" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field className="form-control" type="password" name="password" required />
          </div>
          <div className="form_controls">
            <button className="form_submit" type="submit" disabled={isSubmitting}>
              Reg me
            </button>
            <Link to="/auth/signin">Sign In</Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Signup
