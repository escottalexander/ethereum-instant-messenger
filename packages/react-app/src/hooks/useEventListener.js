import { useState, useEffect, useCallback, useMemo } from "react";
const getEventKey = m => {
  return `${m.transactionHash}_${m.logIndex}`;
};
/**
 * Enables you to keep track of events
 *
 * ~ Features ~
  - Provide readContracts by loading contracts (see more on ContractLoader.js)
  - Specify the name of the contract, in this case it is "YourContract"
  - Specify the name of the event in the contract, in this case we keep track of "SetPurpose" event
  - Specify the provider
 * @param contracts (Record<string, Contract>) :: record of current contractname/contract
 * @param contractName (string) :: name of the contract you are interested in
 * @param eventName (string) :: name of the event
 * @param provider (TEthersProvider)
 * @param startBlock (number) string block of events
 * @returns (ethers->Event)
 */
export default function useEventListener(contracts, contractName, event, provider, startBlock) {
  const [eventMap, setEventMap] = useState(new Map());
  const deps = JSON.stringify([...eventMap]);
  const events = useMemo(() => [...eventMap].map(m => m[1]), [deps]);
  const addNewEvent = useCallback(
    (...listenerArgs) => {
      if (listenerArgs != null && listenerArgs.length > 0) {
        const newEvent = listenerArgs[listenerArgs.length - 1];
        if (newEvent.event != null && newEvent.logIndex != null && newEvent.transactionHash != null) {
          const newMap = new Map([[getEventKey(newEvent), newEvent]]);
          setEventMap(oldMap => new Map([...oldMap, ...newMap]));
        }
      }
    },
    [setEventMap],
  );
  useEffect(() => {
    if (provider) {
      // if you want to read _all_ events from your contracts, set this to the block number it is deployed
      provider.resetEventsBlock(startBlock);
    }
    if ((contracts === null || contracts === void 0 ? void 0 : contracts[contractName]) != null) {
      try {
        contracts[contractName].on(event, addNewEvent);
        return () => {
          contracts[contractName].off(event, addNewEvent);
        };
      } catch (e) {
        console.log(e);
      }
    }
  }, [provider, startBlock, contracts, contractName, event, addNewEvent]);
  return events;
}
