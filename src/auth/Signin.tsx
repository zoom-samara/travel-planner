import { Field, Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestSignIn } from './authActions'

const Signin: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmit = useCallback(
    async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)
      try {
        await dispatch(requestSignIn(values))
      } catch ({ message }) {
        setStatus(message)
        setSubmitting(false)
      }
    },
    [dispatch]
  )

  return (
    <div className="container">
      <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
        {({ isSubmitting, status }) => (
          <Form className="auth">
            <h1 className="auth_title">Sign In</h1>
            {status && <div className="form_error">{status}</div>}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field className="form-control" type="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field className="form-control" type="password" name="password" required />
            </div>

            <div className="form_controls">
              <button type="submit" className="form_submit" disabled={isSubmitting}>
                Auth me
              </button>

              <Link to="/auth/signup">Sign Up</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Signin
