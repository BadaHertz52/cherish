import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import { describe, it, expect } from 'vitest';
import ItemCard from '.';

configure({ adapter: new Adapter() });

// write test codes form ItemCard component
describe('Testing ItemCard component', () => {
  it('should have an image, company, name, price, and bookmarked', () => {
    const item = {
      id: 1,
      company: 'company',
      name: 'name',
      price: 1000,
      image: 'image',
      bookmarked: false,
    };
    const wrapper = shallow(<ItemCard {...item} />);
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('.item-card__info__company').exists()).toBe(true);
    expect(wrapper.find('.item-card__info__name').exists()).toBe(true);
    expect(wrapper.find('.item-card__info__price').exists()).toBe(true);
    expect(wrapper.find('.item-card__bookmark').exists()).toBe(true);
  });

  it('should have a bookmarked image that is off if bookmarked is false', () => {
    const item = {
      id: 1,
      company: 'company',
      name: 'name',
      price: 1000,
      image: 'image',
      bookmarked: false,
    };
    const wrapper = shallow(<ItemCard {...item} />);
    expect(wrapper.find('.item-card__bookmark img').prop('src')).toBe('/icons/bookmark-off.png');
  });

  it('should have a bookmarked image that is on if bookmarked is true', () => {
    const item = {
      id: 1,
      company: 'company',
      name: 'name',
      price: 1000,
      image: 'image',
      bookmarked: true,
    };
    const wrapper = shallow(<ItemCard {...item} />);
    expect(wrapper.find('.item-card__bookmark img').prop('src')).toBe('/icons/bookmark-on.png');
  });

  it('should have a price that is formatted with comma', () => {
    const item = {
      id: 1,
      company: 'company',
      name: 'name',
      price: 10000000,
      image: 'image',
      bookmarked: false,
    };
    const wrapper = shallow(<ItemCard {...item} />);
    expect(wrapper.find('.item-card__info__price').text()).toBe('10,000,000원');
  });
});
