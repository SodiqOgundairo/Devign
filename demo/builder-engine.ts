// ============================================================================
// BUILDER TYPES
// ============================================================================

export type PropValue = string | number | boolean;

export interface BuilderNode {
  id: string;
  type: string;
  props: Record<string, PropValue>;
  children: (BuilderNode | string)[];
}

export interface BuilderState {
  tree: BuilderNode[];
  selectedId: string | null;
  draggingType: string | null;
}

export type BuilderAction =
  | { type: "ADD_NODE"; payload: { node: BuilderNode; parentId: string | null } }
  | { type: "REMOVE_NODE"; payload: { id: string } }
  | { type: "UPDATE_PROPS"; payload: { id: string; props: Record<string, PropValue> } }
  | { type: "SELECT"; payload: { id: string | null } }
  | { type: "SET_DRAGGING"; payload: { type: string | null } }
  | { type: "MOVE_NODE"; payload: { id: string; newParentId: string | null; index: number } }
  | { type: "RESET" };

// ============================================================================
// COMPONENT REGISTRY
// Each entry defines the palette label, icon, default props, editable props,
// allowed children, and whether it's a container.
// ============================================================================

export interface PropDef {
  label: string;
  type: "text" | "select" | "boolean" | "number" | "color";
  options?: string[];
  min?: number; 
  max?: number;
}

export interface ComponentDef {
  type: string;
  label: string;
  icon: string;
  category: "layout" | "display" | "form" | "feedback";
  defaultProps: Record<string, PropValue>;
  propDefs: Record<string, PropDef>;
  defaultChildren: (BuilderNode | string)[];
  isContainer: boolean;
  allowedParents?: string[]; // if empty, allowed anywhere
}

export const COMPONENT_REGISTRY: ComponentDef[] = [
  // ── LAYOUT ──────────────────────────────────────────────────────────────
  {
    type: "Stack",
    label: "Stack",
    icon: "⬜",
    category: "layout",
    isContainer: true,
    defaultProps: { direction: "col", gap: 4 },
    propDefs: {
      direction: { label: "Direction", type: "select", options: ["col", "row"] },
      gap:       { label: "Gap", type: "number", min: 0, max: 12 },
      align:     { label: "Align", type: "select", options: ["start","center","end","stretch"] },
      justify:   { label: "Justify", type: "select", options: ["start","center","end","between"] },
    },
    defaultChildren: [],
  },
  {
    type: "Grid",
    label: "Grid",
    icon: "⊞",
    category: "layout",
    isContainer: true,
    defaultProps: { cols: 2, gap: 4 },
    propDefs: {
      cols:    { label: "Columns", type: "select", options: ["1","2","3","4"] },
      mdCols:  { label: "Cols (md)", type: "select", options: ["1","2","3","4"] },
      lgCols:  { label: "Cols (lg)", type: "select", options: ["1","2","3","4"] },
      gap:     { label: "Gap", type: "number", min: 0, max: 8 },
    },
    defaultChildren: [],
  },
  {
    type: "Container",
    label: "Container",
    icon: "▭",
    category: "layout",
    isContainer: true,
    defaultProps: { size: "xl", padded: true },
    propDefs: {
      size:   { label: "Max Width", type: "select", options: ["sm","md","lg","xl","full"] },
      padded: { label: "Padding", type: "boolean" },
    },
    defaultChildren: [],
  },
  // ── DISPLAY ─────────────────────────────────────────────────────────────
  {
    type: "Card",
    label: "Card",
    icon: "🃏",
    category: "display",
    isContainer: true,
    defaultProps: { hover: false },
    propDefs: {
      hover: { label: "Hover effect", type: "boolean" },
    },
    defaultChildren: [
      {
        id: "",
        type: "CardHeader",
        props: {},
        propDefs: {},
        children: [
          { id: "", type: "CardTitle", props: {}, children: ["Card Title"], propDefs: {}, isContainer: false, defaultProps: {}, defaultChildren: [], icon: "", label: "", category: "display" },
          { id: "", type: "CardDescription", props: {}, children: ["A short description."], propDefs: {}, isContainer: false, defaultProps: {}, defaultChildren: [], icon: "", label: "", category: "display" },
        ],
        isContainer: true,
        defaultProps: {},
        defaultChildren: [],
        icon: "",
        label: "",
        category: "display",
      } as any,
      {
        id: "",
        type: "CardContent",
        props: {},
        children: [],
        propDefs: {},
        isContainer: true,
        defaultProps: {},
        defaultChildren: [],
        icon: "",
        label: "",
        category: "display",
      } as any,
    ],
  },
  {
    type: "Heading",
    label: "Heading",
    icon: "H",
    category: "display",
    isContainer: false,
    defaultProps: { as: "h2", size: "2xl", gradient: "none" },
    propDefs: {
      as:       { label: "Tag", type: "select", options: ["h1","h2","h3","h4","h5","h6"] },
      size:     { label: "Size", type: "select", options: ["4xl","3xl","2xl","xl","lg","md"] },
      weight:   { label: "Weight", type: "select", options: ["light","normal","medium","semibold","bold","black"] },
      gradient: { label: "Gradient", type: "select", options: ["none","primary","accent","cool"] },
      align:    { label: "Align", type: "select", options: ["left","center","right"] },
    },
    defaultChildren: ["My Heading"],
  },
  {
    type: "Text",
    label: "Text",
    icon: "T",
    category: "display",
    isContainer: false,
    defaultProps: { size: "md", variant: "default" },
    propDefs: {
      size:    { label: "Size", type: "select", options: ["xs","sm","md","lg","xl"] },
      variant: { label: "Variant", type: "select", options: ["default","muted","primary","accent","success","warning","error"] },
      weight:  { label: "Weight", type: "select", options: ["normal","medium","semibold","bold"] },
      as:      { label: "Tag", type: "select", options: ["p","span","div","label"] },
    },
    defaultChildren: ["Your text here"],
  },
  {
    type: "Badge",
    label: "Badge",
    icon: "🏷",
    category: "display",
    isContainer: false,
    defaultProps: { variant: "primary" },
    propDefs: {
      variant: { label: "Variant", type: "select", options: ["primary","secondary","accent","ember","success","warning","error","soft-primary","soft-success","soft-warning","soft-error","outline-primary","default"] },
      size:    { label: "Size", type: "select", options: ["sm","default","lg"] },
      dot:     { label: "Dot", type: "boolean" },
    },
    defaultChildren: ["Badge"],
  },
  {
    type: "Separator",
    label: "Separator",
    icon: "—",
    category: "display",
    isContainer: false,
    defaultProps: {},
    propDefs: {},
    defaultChildren: [],
  },
  // ── FORM ────────────────────────────────────────────────────────────────
  {
    type: "Button",
    label: "Button",
    icon: "⬛",
    category: "form",
    isContainer: false,
    defaultProps: { variant: "primary", size: "default" },
    propDefs: {
      variant: { label: "Variant", type: "select", options: ["primary","secondary","accent","ember","destructive","ghost","outline","link","outline-primary","outline-secondary","ghost-primary"] },
      size:    { label: "Size", type: "select", options: ["sm","default","lg","xl"] },
    },
    defaultChildren: ["Button"],
  },
  {
    type: "Input",
    label: "Input",
    icon: "▭",
    category: "form",
    isContainer: false,
    defaultProps: { placeholder: "Enter text...", variant: "default" },
    propDefs: {
      placeholder: { label: "Placeholder", type: "text" },
      variant:     { label: "Variant", type: "select", options: ["default","filled","ghost"] },
      inputSize:   { label: "Size", type: "select", options: ["sm","default","lg"] },
    },
    defaultChildren: [],
  },
  {
    type: "NumberInput",
    label: "Number Input",
    icon: "#",
    category: "form",
    isContainer: false,
    defaultProps: { min: 0, max: 100, step: 1 },
    propDefs: {
      min:  { label: "Min", type: "number", min: -999, max: 999 },
      max:  { label: "Max", type: "number", min: -999, max: 999 },
      step: { label: "Step", type: "number", min: 1, max: 100 },
      size: { label: "Size", type: "select", options: ["sm","md","lg"] },
    },
    defaultChildren: [],
  },
  // ── FEEDBACK ────────────────────────────────────────────────────────────
  {
    type: "Alert",
    label: "Alert",
    icon: "⚠",
    category: "feedback",
    isContainer: true,
    defaultProps: { variant: "info" },
    propDefs: {
      variant:     { label: "Variant", type: "select", options: ["default","info","success","warning","error"] },
      dismissible: { label: "Dismissible", type: "boolean" },
    },
    defaultChildren: [
      { id: "", type: "AlertTitle", props: {}, children: ["Alert Title"], propDefs: {}, isContainer: false, defaultProps: {}, defaultChildren: [], icon: "", label: "", category: "feedback" } as any,
      { id: "", type: "AlertDescription", props: {}, children: ["This is an alert message."], propDefs: {}, isContainer: false, defaultProps: {}, defaultChildren: [], icon: "", label: "", category: "feedback" } as any,
    ],
  },
  {
    type: "Progress",
    label: "Progress",
    icon: "▬",
    category: "feedback",
    isContainer: false,
    defaultProps: { value: 60 },
    propDefs: {
      value: { label: "Value (0–100)", type: "number", min: 0, max: 100 },
    },
    defaultChildren: [],
  },
  {
    type: "Spinner",
    label: "Spinner",
    icon: "⟳",
    category: "feedback",
    isContainer: false,
    defaultProps: { size: "md", variant: "primary" },
    propDefs: {
      size:    { label: "Size", type: "select", options: ["xs","sm","md","lg","xl"] },
      variant: { label: "Variant", type: "select", options: ["primary","secondary","accent","muted","white"] },
    },
    defaultChildren: [],
  },
];

export const REGISTRY_MAP = Object.fromEntries(
  COMPONENT_REGISTRY.map((c) => [c.type, c])
);

// ============================================================================
// ID GENERATOR
// ============================================================================

let idCounter = 0;
export function genId(): string {
  return `node_${++idCounter}_${Math.random().toString(36).slice(2, 6)}`;
}

export function makeNode(type: string): BuilderNode {
  const def = REGISTRY_MAP[type];
  if (!def) throw new Error(`Unknown component: ${type}`);

  const hydrateChildren = (children: (BuilderNode | string)[]): (BuilderNode | string)[] =>
    children.map((c) => {
      if (typeof c === "string") return c;
      return {
        ...c,
        id: genId(),
        children: hydrateChildren(c.children),
      };
    });

  return {
    id: genId(),
    type,
    props: { ...def.defaultProps },
    children: hydrateChildren(def.defaultChildren),
  };
}

// ============================================================================
// STATE REDUCER
// ============================================================================

function findAndRemove(
  nodes: (BuilderNode | string)[],
  id: string
): [(BuilderNode | string)[], BuilderNode | null] {
  let removed: BuilderNode | null = null;
  const result = nodes.filter((n) => {
    if (typeof n === "string") return true;
    if (n.id === id) { removed = n; return false; }
    return true;
  }).map((n) => {
    if (typeof n === "string" || removed) return n;
    const [newChildren, found] = findAndRemove((n as BuilderNode).children, id);
    if (found) removed = found;
    return { ...(n as BuilderNode), children: newChildren };
  });
  return [result, removed];
}

function insertInto(
  nodes: (BuilderNode | string)[],
  parentId: string | null,
  node: BuilderNode,
  index: number
): (BuilderNode | string)[] {
  if (parentId === null) {
    const arr = [...nodes];
    arr.splice(index, 0, node);
    return arr;
  }
  return nodes.map((n) => {
    if (typeof n === "string") return n;
    if (n.id === parentId) {
      const arr = [...n.children];
      arr.splice(index, 0, node);
      return { ...n, children: arr };
    }
    return { ...n, children: insertInto(n.children, parentId, node, index) };
  });
}

function updateNode(
  nodes: (BuilderNode | string)[],
  id: string,
  props: Record<string, PropValue>
): (BuilderNode | string)[] {
  return nodes.map((n) => {
    if (typeof n === "string") return n;
    if (n.id === id) return { ...n, props: { ...n.props, ...props } };
    return { ...n, children: updateNode(n.children, id, props) };
  });
}

function removeNode(nodes: (BuilderNode | string)[], id: string): (BuilderNode | string)[] {
  return nodes
    .filter((n) => typeof n === "string" || n.id !== id)
    .map((n) => (typeof n === "string" ? n : { ...n, children: removeNode(n.children, id) }));
}

export function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case "ADD_NODE": {
      const { node, parentId } = action.payload;
      const idx = parentId === null ? state.tree.length : Infinity;
      return {
        ...state,
        tree: insertInto(state.tree as (BuilderNode | string)[], parentId, node, idx) as BuilderNode[],
        selectedId: node.id,
      };
    }
    case "REMOVE_NODE":
      return {
        ...state,
        tree: removeNode(state.tree as (BuilderNode | string)[], action.payload.id) as BuilderNode[],
        selectedId: state.selectedId === action.payload.id ? null : state.selectedId,
      };
    case "UPDATE_PROPS":
      return {
        ...state,
        tree: updateNode(state.tree as (BuilderNode | string)[], action.payload.id, action.payload.props) as BuilderNode[],
      };
    case "SELECT":
      return { ...state, selectedId: action.payload.id };
    case "SET_DRAGGING":
      return { ...state, draggingType: action.payload.type };
    case "MOVE_NODE": {
      const { id, newParentId, index } = action.payload;
      const [withoutNode, removed] = findAndRemove(state.tree as (BuilderNode | string)[], id);
      if (!removed) return state;
      return {
        ...state,
        tree: insertInto(withoutNode, newParentId, removed, index) as BuilderNode[],
      };
    }
    case "RESET":
      return { tree: [], selectedId: null, draggingType: null };
    default:
      return state;
  }
}

// ============================================================================
// JSX CODE GENERATOR
// ============================================================================

const SELF_CLOSING = new Set(["Input", "Separator", "Progress", "Spinner", "NumberInput"]);

const CONTAINER_WRAPPERS: Record<string, string[]> = {
  Card: ["CardHeader", "CardContent", "CardFooter", "CardTitle", "CardDescription"],
  Alert: ["AlertTitle", "AlertDescription"],
};

function propsToJsx(props: Record<string, PropValue>): string {
  return Object.entries(props)
    .filter(([, v]) => v !== "" && v !== false && v !== undefined)
    .map(([k, v]) => {
      if (v === true) return k;
      if (typeof v === "number") return `${k}={${v}}`;
      return `${k}="${v}"`;
    })
    .join(" ");
}

function nodeToJsx(node: BuilderNode | string, indent = 0): string {
  if (typeof node === "string") return "  ".repeat(indent) + node;
  const pad = "  ".repeat(indent);
  const propStr = propsToJsx(node.props);
  const openTag = propStr ? `<${node.type} ${propStr}>` : `<${node.type}>`;

  if (SELF_CLOSING.has(node.type) && node.children.length === 0) {
    return `${pad}${propStr ? `<${node.type} ${propStr} />` : `<${node.type} />`}`;
  }

  if (node.children.length === 0) {
    return `${pad}${openTag}</${node.type}>`;
  }

  if (node.children.length === 1 && typeof node.children[0] === "string") {
    return `${pad}${openTag}${node.children[0]}</${node.type}>`;
  }

  const childLines = node.children.map((c) => nodeToJsx(c, indent + 1)).join("\n");
  return `${pad}${openTag}\n${childLines}\n${pad}</${node.type}>`;
}

function collectImports(nodes: (BuilderNode | string)[]): Set<string> {
  const names = new Set<string>();
  const walk = (n: BuilderNode | string) => {
    if (typeof n === "string") return;
    names.add(n.type);
    // Add wrapper sub-components
    Object.entries(CONTAINER_WRAPPERS).forEach(([parent, subs]) => {
      if (n.type === parent) subs.forEach((s) => names.add(s));
    });
    n.children.forEach(walk);
  };
  nodes.forEach(walk);
  return names;
}

export function generateJSX(tree: BuilderNode[]): string {
  if (tree.length === 0) return "// Drag components onto the canvas to get started";

  const imports = collectImports(tree);
  const importLine = `import { ${[...imports].sort().join(", ")} } from "yems-ui";`;

  const body = tree.map((n) => nodeToJsx(n, 2)).join("\n\n");

  return `${importLine}

function MyComponent() {
  return (
    <div>
${body}
    </div>
  );
}`;
}
