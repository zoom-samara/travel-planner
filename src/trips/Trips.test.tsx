import Trips from './Trips'
import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import store from '../store'
import { setTrips } from './tripsActions'
import { ITrip } from '../types/trip'
import { setUser } from '../auth/authActions'
import { BrowserRouter } from 'react-router-dom'

Enzyme.configure({ adapter: new Adapter() })

describe('Trips Component', () => {
  it('By Default Should be Empty List', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )

    expect(wrapper.render()).toMatchSnapshot()
  })

  it('If user have trips', () => {
    const wrapper = Enzyme.shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Trips />
        </BrowserRouter>
      </Provider>
    )

    store.dispatch(setUser({ displayName: 'displayName', email: 'email', uid: 'user_id' }))

    store.dispatch(
      setTrips(([
        {
          id: '0',
          uid: 'user_id',
          startDate: '123',
          endDate: '321',
          destination: 'New York',
        },
      ] as any) as ITrip[])
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
