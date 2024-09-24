import {
  TypedUseSelectorHook,
  useSelector as useSelectorReal,
} from 'react-redux';
import { RootState } from '.';

const useSelector: TypedUseSelectorHook<RootState> = useSelectorReal;

export default useSelector;
