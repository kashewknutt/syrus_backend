import React, { useState } from "react";

export const withCustomPortal = <
  T extends React.FC<{ children: React.ReactNode } & any>
>(
  PortalComponent: T
) => {
  return ((props: React.ComponentProps<T>) => {
    const [container, setContainer] = useState(null);

    return (
      <>
        <PortalComponent container={container} {...(props as any)}>
          {props.children}
        </PortalComponent>
        <div ref={setContainer as any}></div>
      </>
    );
  }) as T;
};
