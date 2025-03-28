import { testSamuelConfig, testSamuelUser } from "./constants";
import { Samuel } from "@ciondigital/samuel-sdk";
import { useEffect, useState } from "react";

const SamuelContainer = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized || !testSamuelConfig || !testSamuelUser) return;
    Samuel.init(testSamuelConfig, testSamuelUser);
    (window as any).Samuel = Samuel;
    (window as any).samuel = Samuel.getInstance();
    setInitialized(true);
  }, [initialized]);

  if (!initialized) return null;

  return <>{children}</>;
};

export default SamuelContainer;
