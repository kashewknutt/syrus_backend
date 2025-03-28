import { withWidgetContainer } from "@/components/hoc/withWidgetContainer";
import r2wc from "@r2wc/react-to-web-component";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SamuelType } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const registerWidgetAsWebComponent = (widget: {
  tag: string;
  component: React.FC;
}) => {
  customElements.define(
    widget.tag,
    r2wc(withWidgetContainer(widget.component))
  );
};

export const getSamuelInstance = () => {
  const samuel = (window as any).samuel as SamuelType;
  if (!samuel) throw new Error("Samuel is not initialized");
  return samuel;
};

export const getSamuelConfig = () => {
  const samuel = getSamuelInstance();
  return samuel.getConfig();
};

export const getSamuelContext = () => {
  const samuel = getSamuelInstance();
  return samuel.getContext();
};

export const getSamuelUser = () => {
  const samuel = getSamuelInstance();
  return samuel.getUser();
};

export const getSamuelTheme = () => {
  const samuel = getSamuelInstance();
  return samuel.getTheme();
};
