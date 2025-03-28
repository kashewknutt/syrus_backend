import { lazy, Suspense } from "react";
import { WidgetContainer } from "../base/WidgetContainer";

const SamuelContainer = lazy(() => import("../../development/SamuelContainer"));

export const withWidgetContainer = <T extends React.FC<any>>(Component: T) => {
  if (process.env.NODE_ENV === "development") {
    return ((props: any) => (
      <Suspense fallback="Loading...">
        <SamuelContainer>
          <WidgetContainer>
            <Component {...props} />
          </WidgetContainer>
        </SamuelContainer>
      </Suspense>
    )) as T;
  }

  return ((props: any) => (
    <WidgetContainer>
      <Component {...props} />
    </WidgetContainer>
  )) as T;
};
