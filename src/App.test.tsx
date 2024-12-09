import { shallow } from 'enzyme';
import App from './App';
import { ShallowWrapper } from 'enzyme'; 

describe('App Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });
 
 
 
});