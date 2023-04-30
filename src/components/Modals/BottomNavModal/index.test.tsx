import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { vi } from 'vitest';

import CheckBox from '@/components/CheckBox';

import { CONDITION_NAME, FilteringConditionType, ConditionName } from '../modalTypes';

import BottomNavModal, { BottomNavModalProps } from '.';

configure({ adapter: new Adapter() });

describe('BottomNavModal', () => {
  const selectedFilteringCondition: FilteringConditionType = {
    productType: [CONDITION_NAME.food],
    gender: null,
    job: null,
    situation: null,
  };
  const props: BottomNavModalProps = {
    selectedFilteringCondition: selectedFilteringCondition,
    openBottomNavModal: true,
    sendData: vi.fn(),
    closeModal: vi.fn(),
  };
  const wrapper = shallow(<BottomNavModal {...props} />);
  it('should render BottomNavModal', () => {
    expect(wrapper.exists()).toBe(true);
  });
  // 열었을때, 위에서 아래로 떠오르게
  //카테고리 별로 checkbox 잘 나타내는지
  it('카테고리 별로 다른 checkbox 보여줌', () => {
    const categoryBtnTextArr = ['상품유형', '성별', '직업', '상황'];
    const firstItemArr: ConditionName[] = ['food', 'male', 'profession', 'birthday'];
    const checkFirstItem = (categoryBtnArr: string[], i: number, firstItem: ConditionName) => {
      const targetCategory = wrapper.find('.category-btn').at(i);
      targetCategory.simulate('click');
      const onCategory = wrapper.find('.category-btn.on');
      if (onCategory.text() === categoryBtnArr[i]) {
        expect(wrapper.find(CheckBox).at(0).dive().find('input').prop('name')).toBe(firstItem);
      }
    };
    categoryBtnTextArr.forEach((_, i, self) => checkFirstItem(self, i, firstItemArr[i]));
  });
  it('필터링 조건이 9개 이상일 경우, 스크롤 적용', () => {
    wrapper.find('.category-btn').at(0).simulate('click');
    expect(wrapper.find('.check-box-group-container').hasClass('scroll')).toBeFalsy();
    wrapper.find('.category-btn').at(3).simulate('click');
    expect(wrapper.find('.check-box-group-container').hasClass('scroll')).toBeTruthy();
  });
  //[todo ]
  // selectedFiltering 에서 선택된 필터링 조건 checked 표시
  // 카테고리 이동 시 , 선택된 필터링 조건 checked 표시
  // 초기화
});
