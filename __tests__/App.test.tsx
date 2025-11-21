import { render } from '@testing-library/react-native';

import TabOneScreen from '../app/(tabs)/index';

describe('TabOneScreen', () => {
  it('renders restaurant list heading', () => {
    const { getByText } = render(<TabOneScreen />);
    expect(getByText('Đặt món nhanh chóng')).toBeTruthy();
  });
});

