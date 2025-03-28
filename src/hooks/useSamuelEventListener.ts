import { getSamuelInstance } from "@/lib/utils";
import { useEffect, useRef } from "react";

// eventName - event name configured when configuring custom widget and emitted from workflow
// eventData - do something with the event data which is emitted along with the event from the workflow
export const useSamuelEventListenr = (
  eventName: string,
  callback: (eventData: any) => any
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // listening to samuel events
  useEffect(() => {
    const samuel = getSamuelInstance();
    if (!samuel) return;
    const onEvent = callbackRef.current;
    samuel.on(eventName, onEvent);
    return () => {
      samuel.off(eventName, onEvent);
    };
  }, [eventName]);
};
