# UPTIQ Agentic App: Custom Widget

It is important to use only the following dependencies to build custom widgets for the UPTIQ Agentic App:

-   **React** - [React Documentation](https://react.dev)
-   **Shadcn UI** - [Shadcn Documentation](https://ui.shadcn.com/docs)
-   **Tailwind CSS** - [Tailwind Documentation](https://tailwindcss.com/)
-   **@r2wc/react-to-web-component** - for converting React components to web components. [Package Information](https://www.npmjs.com/package/@r2wc/react-to-web-component)


## Steps to Create Custom Widget

### 1. Download the Starter Project

Download the starter project from `custom-widget-starter`. Install dependencies using:

```bash
yarn
```

### 2. Entry Point

The build entry point is `src/index.ts`, which contains declarations for all widgets exported as custom widgets. Additional widgets can be added similarly.

**Example `src/index.ts`**

```typescript
import './index.css';
import { registerWidgetAsWebComponent } from './lib/utils';
import { FirstWidget } from './widgets/firstWidget';

// All widgets to be exported as web components. Tags should be unique.
const widgets = [
    {
        tag: 'first-widget',
        component: FirstWidget,
    },
];

// Register the widgets as web components
widgets.forEach(registerWidgetAsWebComponent);
```

### 3. Create a New Widget

To create a new widget (e.g., `SecondWidget`):

-   Create a new file: `src/widgets/secondWidget/SecondWidget.tsx`
-   Add the following code:

**Example `SecondWidget.tsx`**

```typescript
export const SecondWidget = () => {
    return <div>{/* Your component code goes here */}</div>;
};
```

-   Write responsive CSS to ensure the widget fits into any container.

### 4. Organize the Code

Create an `index.ts` file inside `src/widgets/secondWidget` for better organization:

**Example `src/widgets/secondWidget/index.ts`**

```typescript
export { SecondWidget } from './Secondwidget';
```

### 5. Update `src/index.ts`

Export the new widget as a web component by updating `src/index.ts`:

**Updated Example**

```typescript
import { SecondWidget } from './widgets/secondWidget';

const widgets = [
    { tag: 'first-widget', component: FirstWidget },
    { tag: 'second-widget', component: SecondWidget },
];

widgets.forEach(registerWidgetAsWebComponent);
```

## Building and Using Widgets

Build the project using:

```bash
yarn build
```

The `dist` folder will include:

-   `index.js`
-   `index.umd.cjs`

Host the `dist` folder bundle in the cloud and include `dist/index.js` in the Agentic app:

**Usage Example**

```html
<script src="<hosted-base-url>/index.js" type="module"></script>
<first-widget></first-widget>
```

## Shadcn UI Tweaks with Portals

To ensure styles are applied to portal components (e.g., `Select`, `Dialog`, `Popover`, `Sheet`), wrap components like `DialogPortal` using `withCustomPortal`.

**Example**

```typescript
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { withCustomPortal } from '../hoc/withCustomPortal';

const DialogPortal = withCustomPortal(DialogPrimitive.Portal);
```

## Listening to Events

Custom widgets can listen to custom events. Use the `useSamuelEventListener` hook:

**Example**

```typescript
const handleEvent = useCallback((eventData: any) => {
    console.log(eventData);
});

useSamuelEventListener('test-event', handleEvent);
```

## Accessing Samuel Config, Context, and User

Retrieve configuration, context, and user data using these utilities:

-   `getSamuelConfig`
-   `getSamuelUser`
-   `getSamuelContext`

**Example**

```typescript
const config = getSamuelConfig();
const user = getSamuelUser();
const context = getSamuelContext();

console.log({ config, user, context });
```

## Running Workflows

To run workflows, make a REST API call:

**Example**

```typescript
const handleRunWorkflow = async (taskInputs: any) => {
    const executionId = uuid();
    const { uid } = getSamuelUser();
    const { appId, serverUrl, widgetKey } = getSamuelConfig();
    const workflowId = taskInputs?.workflowId;

    if (!workflowId) throw new Error('workflowId is required');

    const response = await axios.post(
        `${serverUrl}/workflow-defs/run-sync`,
        {
            executionId,
            uid,
            integrationId: workflowId,
            appId,
            taskInputs,
        },
        { headers: { widgetKey, appId } }
    );

    console.log(response.data);
};
```

## Testing Widgets During Development

To test widgets, add the web component to `index.html`:

**Example `index.html`**

```html
<body>
    <script type="module" src="/src/index.ts"></script>
    <div style="width: 400px">
        <second-widget></second-widget>
    </div>
</body>
```

Run the local development server:

```bash
yarn dev
```
