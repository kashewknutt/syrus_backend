import "./index.css";
import { registerWidgetAsWebComponent } from "./lib/utils";
import { UptiqWidget } from "./widgets/firstWidget";

// all widgets to be exported as web components. tag should be unique
const widgets = [
  {
    tag: "first-widget",
    component: UptiqWidget,
  },
];

// Register the widgets as a web components
widgets.forEach(registerWidgetAsWebComponent);
