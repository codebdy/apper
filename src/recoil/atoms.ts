import { atom } from "recoil";

export const appsLoadingState = atom<boolean>({
  key: "appsLoading",
  default: false,
})

export const themeModeState = atom<'light' | 'dark'>({
  key: "themeMode",
  default: 'dark',
})