export type SettingItem = {
  name: string;
  path: string;
  placeholder: string | null;
};

export type SettingGroup = SettingItem[];

export type SettingList = SettingGroup[];

export type CategoryItemProp = {
  item: SettingItem;
  onItemClick: (path: string) => void;
};

export type CategoryListProp = {
  group: SettingGroup;
  onItemClick: (path: string) => void;
};
