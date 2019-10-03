import { Field, Form, Formik } from 'formik'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import useThunkDispatch from '../common/useThunkDispatch'
import history from '../history'
import { requestSignIn } from './authActions'

const Signin: React.FC = () => {
  const dispatch = useThunkDispatch()

  const onSubmit = useCallback(
    (values, { setSubmitting, setStatus }) => {
      setSubmitting(true)
      dispatch(requestSignIn(values))
        .then(() => {
          history.push('/service/trips')
        })
        .catch(({ message }: any) => {
          setStatus(message)
        })
        .finally(() => setSubmitting(false))
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
