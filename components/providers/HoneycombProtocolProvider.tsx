"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import createEdgeClient from "@honeycomb-protocol/edge-client";
import { EdgeClient } from "@honeycomb-protocol/edge-client/client/types";
const API_URL = "https://edge.test.honeycombprotocol.com/";

const HoneycombProtocolContext = createContext<{
  client: EdgeClient | undefined;
}>({
  client: undefined,
});

const HoneycombProtocolProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const client = createEdgeClient(API_URL, true);
  return (
    <HoneycombProtocolContext.Provider
      value={{
        client,
      }}
    >
      {children}
    </HoneycombProtocolContext.Provider>
  );
};

export default HoneycombProtocolProvider;

export const useHoneycombProtocol = () => useContext(HoneycombProtocolContext);
