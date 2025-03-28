type WidgetContainerProps = {
  children: React.ReactNode;
};

export const WidgetContainer = ({ children }: WidgetContainerProps) => {
  return (
    <div
      className={process.env.WIDGET_GROUP_ID}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
