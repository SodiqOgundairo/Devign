import React, { useReducer, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Code2,
  Eye,
  ChevronRight,
  GripVertical,
  Plus,
} from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Separator,
  Heading,
  Text,
  NumberInput,
  Spinner,
  Stack,
  Grid,
  Container,
} from "@yems-ui/core";
import {
  builderReducer,
  generateJSX,
  makeNode,
  COMPONENT_REGISTRY,
  REGISTRY_MAP,
  type BuilderNode,
  type BuilderState,
  type PropValue,
} from "./builder-engine";

// ─── Initial state ────────────────────────────────────────────────────────────

const INITIAL_STATE: BuilderState = {
  tree: [],
  selectedId: null,
  draggingType: null,
};

// ─── Component renderer — walks the JSON tree and renders real YemsUI ─────────

const COMPONENT_MAP: Record<string, React.ComponentType<any> | string> = {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Input,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Separator,
  Heading,
  Text,
  NumberInput,
  Spinner,
  Stack,
  Grid,
  Container,
  div: "div",
  span: "span",
  p: "p",
};

function NodeRenderer({
  node,
  selectedId,
  onSelect,
  dispatch,
  depth = 0,
}: {
  node: BuilderNode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  dispatch: React.Dispatch<any>;
  depth?: number;
}) {
  const def = REGISTRY_MAP[node.type];
  const Comp = COMPONENT_MAP[node.type];
  const isSelected = selectedId === node.id;
  const isContainer = def?.isContainer ?? false;
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    if (!isContainer) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const type = e.dataTransfer.getData("componentType");
    if (!type) return;
    const newNode = makeNode(type);
    dispatch({
      type: "ADD_NODE",
      payload: { node: newNode, parentId: node.id },
    });
  };

  if (!Comp) return null;

  const childrenContent = node.children.map((child, i) => {
    if (typeof child === "string") return child;
    return (
      <NodeRenderer
        key={child.id}
        node={child}
        selectedId={selectedId}
        onSelect={onSelect}
        dispatch={dispatch}
        depth={depth + 1}
      />
    );
  });

  const clickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  return (
    <div
      className="relative group"
      onClick={clickHandler}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Selection + drop ring */}
      <div
        className={[
          "absolute inset-0 rounded-xl pointer-events-none z-10 transition-all duration-150",
          isSelected
            ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
            : "",
          isDragOver && isContainer
            ? "ring-2 ring-dashed ring-accent bg-accent/5"
            : "",
          !isSelected && !isDragOver
            ? "group-hover:ring-1 group-hover:ring-border"
            : "",
        ].join(" ")}
      />

      {/* Label chip on select */}
      {isSelected && (
        <div className="absolute -top-5 left-0 z-20 flex items-center gap-1">
          <span className="text-[10px] font-semibold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">
            {node.type}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dispatch({ type: "REMOVE_NODE", payload: { id: node.id } });
            }}
            className="text-[10px] bg-error text-white px-1.5 py-0.5 rounded-sm hover:opacity-80"
          >
            ✕
          </button>
        </div>
      )}

      {/* Render the actual YemsUI component */}
      {typeof Comp === "string" ? (
        <Comp {...(node.props as any)}>
          {childrenContent.length > 0 ? childrenContent : null}
        </Comp>
      ) : (
        <Comp {...(node.props as any)}>
          {childrenContent.length > 0 ? (
            childrenContent
          ) : isContainer ? (
            <div className="min-h-[40px] flex items-center justify-center text-muted-foreground text-xs border border-dashed border-border/50 rounded-lg m-1 p-2">
              Drop here
            </div>
          ) : null}
        </Comp>
      )}
    </div>
  );
}

// ─── Property Panel ───────────────────────────────────────────────────────────

function PropertyPanel({
  node,
  dispatch,
}: {
  node: BuilderNode;
  dispatch: React.Dispatch<any>;
}) {
  const def = REGISTRY_MAP[node.type];
  if (!def) return null;

  const update = (key: string, value: PropValue) => {
    dispatch({
      type: "UPDATE_PROPS",
      payload: { id: node.id, props: { [key]: value } },
    });
  };

  // Editable text children
  const textChild = node.children.find((c) => typeof c === "string") as
    | string
    | undefined;
  const hasTextChild = textChild !== undefined;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
          Component
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">
            {node.type}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {node.id.split("_").slice(0, 2).join("_")}
          </span>
        </div>
      </div>

      {/* Text content */}
      {hasTextChild && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Content
          </label>
          <textarea
            value={textChild}
            onChange={(e) => {
              const newChildren = node.children.map((c) =>
                typeof c === "string" ? e.target.value : c,
              );
              dispatch({
                type: "UPDATE_PROPS",
                payload: { id: node.id, props: {} },
              });
              // update text child directly via a special action
              dispatch({
                type: "UPDATE_TEXT",
                payload: { id: node.id, text: e.target.value },
              });
            }}
            className="w-full text-xs bg-muted/50 border border-border/50 rounded-lg p-2 text-foreground focus:outline-none focus:border-primary resize-none"
            rows={2}
          />
        </div>
      )}

      {/* Props */}
      {Object.entries(def.propDefs).map(([key, propDef]) => {
        const currentVal = node.props[key] ?? def.defaultProps[key] ?? "";

        return (
          <div key={key} className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              {propDef.label}
            </label>

            {propDef.type === "select" && (
              <select
                value={String(currentVal)}
                onChange={(e) => update(key, e.target.value)}
                className="w-full text-xs bg-muted/50 border border-border/50 rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:border-primary"
              >
                {propDef.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {propDef.type === "text" && (
              <input
                type="text"
                value={String(currentVal)}
                onChange={(e) => update(key, e.target.value)}
                className="w-full text-xs bg-muted/50 border border-border/50 rounded-lg px-2 py-1.5 text-foreground focus:outline-none focus:border-primary"
              />
            )}

            {propDef.type === "boolean" && (
              <button
                onClick={() => update(key, !currentVal)}
                className={`relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 ${
                  currentVal ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 mt-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
                    currentVal ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            )}

            {propDef.type === "number" && (
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={propDef.min ?? 0}
                  max={propDef.max ?? 100}
                  value={Number(currentVal)}
                  onChange={(e) => update(key, Number(e.target.value))}
                  className="flex-1 h-1.5 accent-primary"
                />
                <span className="text-xs font-mono text-foreground w-6 text-right">
                  {String(currentVal)}
                </span>
              </div>
            )}
          </div>
        );
      })}

      <button
        onClick={() =>
          dispatch({ type: "REMOVE_NODE", payload: { id: node.id } })
        }
        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-error/40 text-error text-xs font-medium hover:bg-error/10 transition-colors mt-4"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Remove
      </button>
    </div>
  );
}

// ─── Main BuilderTab ──────────────────────────────────────────────────────────

const CATEGORIES = ["layout", "display", "form", "feedback"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  layout: "Layout",
  display: "Display",
  form: "Form",
  feedback: "Feedback",
};

export function BuilderTab() {
  const [state, dispatch] = useReducer(
    // Extend reducer to handle UPDATE_TEXT
    (s: BuilderState, a: any) => {
      if (a.type === "UPDATE_TEXT") {
        function updateText(
          nodes: (BuilderNode | string)[],
          id: string,
          text: string,
        ): (BuilderNode | string)[] {
          return nodes.map((n) => {
            if (typeof n === "string") return n;
            if (n.id === id)
              return {
                ...n,
                children: n.children.map((c) =>
                  typeof c === "string" ? text : c,
                ),
              };
            return { ...n, children: updateText(n.children, id, text) };
          });
        }
        return {
          ...s,
          tree: updateText(
            s.tree as any,
            a.payload.id,
            a.payload.text,
          ) as BuilderNode[],
        };
      }
      return builderReducer(s, a);
    },
    INITIAL_STATE,
  );

  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("layout");
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedNode = state.selectedId
    ? findNode(state.tree, state.selectedId)
    : null;

  const code = generateJSX(state.tree);

  const handlePaletteDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("componentType", type);
    dispatch({ type: "SET_DRAGGING", payload: { type } });
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("componentType");
    if (!type) return;
    const newNode = makeNode(type);
    dispatch({ type: "ADD_NODE", payload: { node: newNode, parentId: null } });
    dispatch({ type: "SET_DRAGGING", payload: { type: null } });
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const filteredComponents = COMPONENT_REGISTRY.filter(
    (c) => c.category === activeCategory,
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <Heading as="h2" size="xl">
            Visual Builder
          </Heading>
          <Text size="sm" variant="muted" className="mt-1">
            Drag components onto the canvas. The code updates live. Copy and
            paste into your project.
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* 3-panel layout */}
      <div
        className="grid grid-cols-[200px_1fr_280px] gap-3 min-h-[600px]"
        style={{ height: "70vh" }}
      >
        {/* ── LEFT: Component Palette ────────────────────────────────── */}
        <div className="glass-card rounded-xl flex flex-col overflow-hidden">
          <div className="px-3 pt-3 pb-2 border-b border-border/50">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Components
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex border-b border-border/50 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 text-[10px] font-medium py-1.5 transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Component list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredComponents.map((comp) => (
              <motion.div
                key={comp.type}
                draggable
                onDragStart={(e) => handlePaletteDragStart(e as any, comp.type)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing text-sm hover:bg-muted/50 transition-colors select-none border border-transparent hover:border-border/50"
              >
                <span className="text-base w-5 text-center flex-shrink-0 font-mono leading-none">
                  {comp.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">
                    {comp.label}
                  </p>
                </div>
                <GripVertical className="h-3 w-3 text-muted-foreground ml-auto flex-shrink-0 opacity-50" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CENTRE: Canvas + Code ───────────────────────────────────── */}
        <div className="glass-card rounded-xl flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 shrink-0">
            <div className="flex rounded-lg overflow-hidden border border-border/50">
              <button
                onClick={() => setView("preview")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
                  view === "preview"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="h-3 w-3" /> Preview
              </button>
              <button
                onClick={() => setView("code")}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
                  view === "code"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code2 className="h-3 w-3" /> Code
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {state.tree.length} component
                {state.tree.length !== 1 ? "s" : ""}
              </span>
              {view === "code" && (
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Canvas */}
          <AnimatePresence mode="wait">
            {view === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                ref={canvasRef}
                onDrop={handleCanvasDrop}
                onDragOver={handleCanvasDragOver}
                onClick={() =>
                  dispatch({ type: "SELECT", payload: { id: null } })
                }
                className="flex-1 overflow-y-auto p-6 space-y-4"
              >
                {state.tree.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 text-muted-foreground">
                    <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-3xl">
                      +
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Canvas is empty
                      </p>
                      <p className="text-sm mt-1">
                        Drag components from the left panel to get started
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-2 max-w-xs">
                      {["Button", "Card", "Stack", "Heading"].map((type) => (
                        <button
                          key={type}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({
                              type: "ADD_NODE",
                              payload: { node: makeNode(type), parentId: null },
                            });
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border/50 hover:border-primary hover:text-primary transition-colors"
                        >
                          <Plus className="h-3 w-3" /> {type}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  state.tree.map((node) => (
                    <NodeRenderer
                      key={node.id}
                      node={node}
                      selectedId={state.selectedId}
                      onSelect={(id) =>
                        dispatch({ type: "SELECT", payload: { id } })
                      }
                      dispatch={dispatch}
                    />
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 overflow-auto"
              >
                <pre className="p-4 text-xs font-mono text-foreground leading-relaxed h-full">
                  <code>{code}</code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: Properties Panel ─────────────────────────────────── */}
        <div className="glass-card rounded-xl flex flex-col overflow-hidden">
          <div className="px-3 pt-3 pb-2 border-b border-border/50 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {selectedNode ? "Properties" : "Nothing selected"}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {selectedNode ? (
              <PropertyPanel node={selectedNode} dispatch={dispatch} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground gap-3 py-8">
                <div className="text-3xl opacity-30">⚙️</div>
                <div>
                  <p className="text-xs font-medium">Click a component</p>
                  <p className="text-xs mt-0.5 opacity-70">
                    to edit its properties
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick add panel at the bottom */}
          {!selectedNode && state.tree.length > 0 && (
            <div className="p-3 border-t border-border/50 space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Quick add
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Button", "Text", "Badge", "Separator"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      dispatch({
                        type: "ADD_NODE",
                        payload: { node: makeNode(type), parentId: null },
                      })
                    }
                    className="text-xs px-2 py-1 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                  >
                    + {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer hint */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>💡</span>
        <span>
          Tip: Drop components <em>onto</em> containers (Stack, Grid, Card) to
          nest them. Click any component to edit its props. Switch to Code view
          to copy the generated JSX.
        </span>
      </div>
    </div>
  );
}

// ─── Utility: find a node by ID in the tree ───────────────────────────────────

function findNode(nodes: BuilderNode[], id: string): BuilderNode | null {
  for (const n of nodes) {
    if (n.id === id) return n;
    for (const child of n.children) {
      if (typeof child !== "string") {
        const found = findNode([child], id);
        if (found) return found;
      }
    }
  }
  return null;
}

export default BuilderTab;
