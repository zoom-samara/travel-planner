import { createStructuredSelector, Selector } from 'reselect'
import { Store } from '../types/common'

export default <ISelectedProps>(
  selectors: { [K in keyof ISelectedProps]: Selector<Store, ISelectedProps[K]> }
): Selector<Store, ISelectedProps> => createStructuredSelector<Store, ISelectedProps>(selectors)
