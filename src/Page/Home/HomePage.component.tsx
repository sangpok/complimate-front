import * as Icon from '@Icons/index';
import * as Layout from '@Layouts/DefaultLayout';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, useAnimate } from 'framer-motion';
import * as S from './HomePage.styled';

import {
  MenuHeadProp,
  MenuIconProp,
  MenuItem,
  MenuItemProp,
  MenuListProp,
  SideBarMenuProp,
} from './HomePage.types';

import { TransitionDirection } from '@Page/Home/Components/ContentCard/ContentCard.types';
import { useEffect, useRef, useState } from 'react';
import ContentCard from '@Page/Home/Components/ContentCard/ContentCard';
import InlineProfile from '@Components/InlineProfile';
