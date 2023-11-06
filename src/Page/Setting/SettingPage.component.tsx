import * as Icon from '@Icons/index';
import * as S from './SettingPage.styled';

import type { CategoryItemProp, CategoryListProp } from './SettingPage.types';

export const CategoryItem = ({ item, onItemClick }: CategoryItemProp) => {
  return (
    <S.Item onClick={() => onItemClick(item.path)}>
      <span className="name">{item.name}</span>
      <div className="right">
        {item.placeholder && <span className="placeholder">{item.placeholder}</span>}

        <button>
          <Icon.Left css={{ rotate: '180deg' }} />
        </button>
      </div>
    </S.Item>
  );
};

export const CategoryList = ({ group, onItemClick }: CategoryListProp) => {
  const groupElements = group.map((item) => (
    <CategoryItem key={item.path} item={item} onItemClick={onItemClick} />
  ));

  return <S.Group>{groupElements}</S.Group>;
};
