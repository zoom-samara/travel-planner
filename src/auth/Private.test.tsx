import Private from './Private'
import Loading from '../components/Loading/Loading'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import store from '../store'
import { setStatusUpdated, setUser } from './authActions'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

describe('Private Component', () => {
  it('By Default Should be Loading', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true} />
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.render()).toMatchObject(Enzyme.shallow(<Loading fullPage />).render())
  })

  it('If user not auth', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={false}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(setStatusUpdated(true))

    expect(wrapper.render()).toMatchObject(Enzyme.shallow(<div>test</div>).render())
  })

  it('If user not auth in Private zone', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(setStatusUpdated(true))

    expect(wrapper.render()).not.toMatchObject(Enzyme.shallow(<div>test</div>).render())
  })

  it('If user auth', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={true}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(setStatusUpdated(true))
    store.dispatch(setUser({ displayName: 'displayName', email: 'email', uid: '123' }))

    expect(wrapper.render()).toMatchObject(Enzyme.shallow(<div>test</div>).render())
  })

  it('If user auth in Sign zone', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Private isPrivate={false}>
            <div>test</div>
          </Private>
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(setStatusUpdated(true))
    store.dispatch(setUser({ displayName: 'displayName', email: 'email', uid: '123' }))

    expect(wrapper.render()).not.toMatchObject(Enzyme.shallow(<div>test</div>).render())
  })
})
