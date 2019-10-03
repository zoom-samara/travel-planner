import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Redirect } from 'react-router-dom'
import Loading from '../components/Loading/Loading'
import store from '../store'
import { setAuthUpdated, setUser } from './authActions'
import Private from './Private'

Enzyme.configure({ adapter: new Adapter() })

describe('Private Component', () => {
  it('By Default Should be Loading', () => {
    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true} />
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.containsMatchingElement(<Loading fullPage />)).toStrictEqual(true)
  })

  it('If user not auth', () => {
    store.dispatch(setAuthUpdated(true))

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={false}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.containsMatchingElement(<div>test</div>)).toStrictEqual(true)
  })

  it('Not auth user should redirect on auth', () => {
    store.dispatch(setAuthUpdated(true))

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.containsMatchingElement(<Redirect to="/auth/signin" />)).toStrictEqual(true)
  })

  it('If user already logged', () => {
    store.dispatch(setAuthUpdated(true))
    store.dispatch(setUser({ displayName: 'displayName', email: 'email', uid: '123' }))

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.containsMatchingElement(<div>test</div>)).toStrictEqual(true)
  })

  it('Already logged user should visit Sign zone', () => {
    store.dispatch(setAuthUpdated(true))
    store.dispatch(setUser({ displayName: 'displayName', email: 'email', uid: '123' }))

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={false}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.containsMatchingElement(<Redirect to="/service/trips" />)).toStrictEqual(true)
  })
})
