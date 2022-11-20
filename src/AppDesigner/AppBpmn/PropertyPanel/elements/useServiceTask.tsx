import React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParseLangMessage } from "plugin-sdk";
import { IElement } from "./IElement";
import { useElementName } from "./useElementName";

export function useServiceTask(element: any, modeler: any): IElement {
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const name = useElementName(element, modeler);
  const iElement: IElement = useMemo(() => {
    return {
      type: t("AppBpmn.Service Task"),
      name: p(name),
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6.494 3C2.916 3 0 5.903 0 9.475v13.383c0 3.572 2.916 6.475 6.494 6.475h19.012c3.578 0 6.494-2.903 6.494-6.475V9.475C32 5.903 29.084 3 25.506 3H6.494zm0 2h19.012C28.015 5 30 6.98 30 9.475v13.383c0 2.495-1.985 4.475-4.494 4.475H6.494C3.985 27.333 2 25.353 2 22.858V9.475C2 6.98 3.985 5 6.494 5zm1.22 1.681V7.84c-.329.093-.63.223-.914.382l-.83-.82-1.554 1.561.83.82c-.16.288-.285.594-.372.911l-1.177.002v2.2l1.189-.004c.109.431.345.819.58 1.165v-1.898l-1.038.004v-.737l1.034-.002.058-.294c.084-.429.252-.838.493-1.203l.165-.25-.727-.718.523-.526.728.719.247-.165c.379-.25.793-.417 1.206-.505l.291-.06-.002-1.01h.75L9.19 8.417H11.16c-.185-.221-.951-.508-1.237-.588L9.93 6.68H7.713zm2.078 2.105l.003 1.158a4.19 4.19 0 00-.915.383l-.83-.821-1.553 1.562.83.82c-.16.288-.286.593-.373.91l-1.176.003v2.2l1.188-.004c.094.326.224.624.383.905l-.85.847 1.57 1.543.847-.843c.29.161.599.286.919.373v1.198c.756.006 1.56.003 2.206.003V17.81a4.19 4.19 0 00.915-.383l.847.835 1.554-1.56-.848-.836c.16-.288.286-.594.373-.912l1.152-.007V12.75l-1.165.007a4.09 4.09 0 00-.382-.905l.805-.807-1.57-1.546-.804.806a4.16 4.16 0 00-.915-.372l.007-1.147H9.792zm.732.73h.751l-.006 1.005.297.058c.43.085.844.252 1.21.492l.25.162.701-.704.528.52-.702.704.169.25c.248.374.412.779.505 1.196l.061.292 1.016-.006v.737l-1.01.006-.058.292c-.085.43-.252.838-.494 1.205l-.165.25.744.733-.523.525-.743-.734-.248.165c-.378.247-.789.418-1.203.503l-.294.058v1.067h-.745v-1.059l-.295-.057a3.395 3.395 0 01-1.21-.492l-.248-.162-.747.743-.528-.52.747-.744-.17-.25a3.546 3.546 0 01-.506-1.196l-.06-.291-1.04.004v-.738l1.034-.002.058-.294c.085-.428.252-.837.493-1.203l.165-.25-.726-.718.522-.526.728.72.248-.166a3.546 3.546 0 011.205-.504l.292-.06-.003-1.01zm.388 2.685a1.65 1.65 0 00-1.645 1.645c0 .904.74 1.645 1.645 1.645a1.65 1.65 0 001.645-1.645 1.65 1.65 0 00-1.645-1.645zm0 .73a.91.91 0 01.915.915.91.91 0 01-.915.914.91.91 0 01-.915-.914.91.91 0 01.915-.915z"></path></svg>,
    }
  }, [element, name]);

  return iElement;
}