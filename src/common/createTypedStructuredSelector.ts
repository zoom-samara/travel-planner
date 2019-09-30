import { createStructuredSelector, Selector } from 'reselect'
import { Store } from '../types/common'

export default <SelectedProps>(
  selectors: { [K in keyof SelectedProps]: Selector<Store, SelectedProps[K]> }
): Selector<Store, SelectedProps> => createStructuredSelector<Store, SelectedProps>(selectors)
