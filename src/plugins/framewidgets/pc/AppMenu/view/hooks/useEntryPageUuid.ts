import { useDeviceConfig } from "runner/hooks/useDeviceConfig";

export function useEntryPageUuid() {
  return useDeviceConfig()?.schemaJson?.entryUuid;
}