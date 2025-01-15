import { observer } from "mobx-react";
import { usePopovers } from "@core/storages/popovers";

export const Popovers = observer(() => {
  const popovers = usePopovers();

  return null;
})