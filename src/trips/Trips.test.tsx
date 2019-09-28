import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { setUser } from '../auth/authActions'
import store from '../store'
import { ITrip } from '../types/trip'
import Trips from './Trips'
import { setTrips } from './tripsActions'

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
          destination: 'New York',
          endDate: '321',
          id: '0',
          startDate: '123',
          uid: 'user_id',
        },
      ] as any) as ITrip[])
    )

    expect(wrapper.render()).toMatchSnapshot()
  })
})
