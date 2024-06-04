import React from "react";

type MetagraphContextState = {
  activeTag: string;
  setActiveTag: (tag: string) => void;
  onFindNode: (id: string) => void;
};

const defaultState: MetagraphContextState = {
  activeTag: "",
  setActiveTag: () => {},
  onFindNode: () => {},
};

export const MetagraphContext =
  React.createContext<MetagraphContextState>(defaultState);

export const useMetagraphContext = () => React.useContext(MetagraphContext);
