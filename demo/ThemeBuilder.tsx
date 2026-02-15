import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Paintbrush,
  X,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Default token values ────────────────────────────────────────────────────

const DEFAULTS = {
  "--brand-500": "#5000ab",
  "--brand-900": "#1c0636",
  "--accent-500": "#e3b23c",
  "--accent-700": "#bb4d00",
  "--radius": "12px",
  "--glass-blur": "16px",
  "--transition-normal": "250ms",
};

type TokenKey = keyof typeof DEFAULTS;

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: {
  name: string;
  emoji: string;
  tokens: Partial<typeof DEFAULTS>;
}[] = [
  {
    name: "Default",
    emoji: "💜",
    tokens: { ...DEFAULTS },
  },
  {
    name: "Ocean",
    emoji: "🌊",
    tokens: {
      "--brand-500": "#0284c7",
      "--brand-900": "#0c4a6e",
      "--accent-500": "#06b6d4",
      "--accent-700": "#0891b2",
    },
  },
  {
    name: "Forest",
    emoji: "🌿",
    tokens: {
      "--brand-500": "#16a34a",
      "--brand-900": "#14532d",
      "--accent-500": "#ca8a04",
      "--accent-700": "#a16207",
    },
  },
  {
    name: "Rose",
    emoji: "🌹",
    tokens: {
      "--brand-500": "#e11d48",
      "--brand-900": "#4c0519",
      "--accent-500": "#f97316",
      "--accent-700": "#c2410c",
    },
  },
  {
    name: "Slate",
    emoji: "🩶",
    tokens: {
      "--brand-500": "#475569",
      "--brand-900": "#0f172a",
      "--accent-500": "#94a3b8",
      "--accent-700": "#64748b",
    },
  },
  {
    name: "Sharp",
    emoji: "⬛",
    tokens: {
      "--radius": "4px",
      "--glass-blur": "8px",
    },
  },
  {
    name: "Pill",
    emoji: "💊",
    tokens: {
      "--radius": "999px",
    },
  },
  {
    name: "Snappy",
    emoji: "⚡",
    tokens: {
      "--transition-normal": "100ms",
    },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyTokens(tokens: Partial<typeof DEFAULTS>) {
  const root = document.documentElement;
  Object.entries(tokens).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  // Cascade --radius into the Tailwind v4 radius scale so rounded-* utilities respond
  if ("--radius" in tokens) {
    const base = parseFloat(
      tokens["--radius" as keyof typeof DEFAULTS] as string,
    );
    if (!isNaN(base)) {
      root.style.setProperty("--radius-sm", `${(base * 0.5).toFixed(1)}px`);
      root.style.setProperty("--radius-md", `${(base * 0.75).toFixed(1)}px`);
      root.style.setProperty("--radius-lg", `${base}px`);
      root.style.setProperty("--radius-xl", `${(base * 1.5).toFixed(1)}px`);
      root.style.setProperty("--radius-2xl", `${(base * 2).toFixed(1)}px`);
      root.style.setProperty("--radius-3xl", `${(base * 2.5).toFixed(1)}px`);
    }
  }
}

function resetTokens() {
  const root = document.documentElement;
  Object.keys(DEFAULTS).forEach((key) => root.style.removeProperty(key));
  // Also clear derived radius tokens so they revert to stylesheet values
  [
    "--radius-sm",
    "--radius-md",
    "--radius-lg",
    "--radius-xl",
    "--radius-2xl",
    "--radius-3xl",
  ].forEach((k) => root.style.removeProperty(k));
}

function generateCSS(tokens: Partial<typeof DEFAULTS>) {
  const changed = Object.entries(tokens).filter(
    ([k, v]) => v !== DEFAULTS[k as TokenKey],
  );
  if (changed.length === 0) return "/* Using default theme */";
  return `:root {\n${changed.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`;
}

// ─── Section ──────────────────────────────────────────────────────────────────

const Section: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-2.5 px-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
      >
        {title}
        {open ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Color Row ────────────────────────────────────────────────────────────────

const ColorRow: React.FC<{
  label: string;
  token: TokenKey;
  tokens: Partial<typeof DEFAULTS>;
  onChange: (token: TokenKey, value: string) => void;
}> = ({ label, token, tokens, onChange }) => {
  const value = (tokens[token] ?? DEFAULTS[token]) as string;
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-muted-foreground flex-1 min-w-0 truncate">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(token, e.target.value)}
          className="w-20 text-xs bg-transparent border border-border/50 rounded px-1.5 py-1 text-foreground focus:outline-none focus:border-primary"
        />
        <div className="relative h-7 w-7 rounded overflow-hidden border border-border/50 cursor-pointer shrink-0">
          <input
            type="color"
            value={value.startsWith("#") ? value : "#5000ab"}
            onChange={(e) => onChange(token, e.target.value)}
            className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
          />
          <div className="h-full w-full" style={{ backgroundColor: value }} />
        </div>
      </div>
    </div>
  );
};

// ─── Slider Row ───────────────────────────────────────────────────────────────

const SliderRow: React.FC<{
  label: string;
  token: TokenKey;
  tokens: Partial<typeof DEFAULTS>;
  onChange: (token: TokenKey, value: string) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
}> = ({ label, token, tokens, onChange, min, max, step, unit }) => {
  const raw = (tokens[token] ?? DEFAULTS[token]) as string;
  const numeric = parseFloat(raw);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-xs font-mono text-foreground">{raw}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={isNaN(numeric) ? min : numeric}
        onChange={(e) => onChange(token, `${e.target.value}${unit}`)}
        className="w-full h-1.5 rounded-full accent-primary cursor-pointer"
      />
    </div>
  );
};

// ─── Main ThemeBuilder ────────────────────────────────────────────────────────

export const ThemeBuilder: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tokens, setTokens] = useState<Partial<typeof DEFAULTS>>({});
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState("Default");

  const updateToken = useCallback((token: TokenKey, value: string) => {
    setTokens((prev) => {
      const next = { ...prev, [token]: value };
      applyTokens({ [token]: value });
      setActivePreset("");
      return next;
    });
  }, []);

  const applyPreset = (preset: (typeof PRESETS)[0]) => {
    const merged = { ...tokens, ...preset.tokens };
    setTokens(merged);
    applyTokens(preset.tokens);
    setActivePreset(preset.name);
  };

  const reset = () => {
    setTokens({});
    resetTokens();
    setActivePreset("Default");
  };

  const copy = () => {
    const css = generateCSS(tokens);
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const get = (token: TokenKey) => (tokens[token] ?? DEFAULTS[token]) as string;

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 text-sm font-medium"
      >
        <Paintbrush className="h-4 w-4" />
        Customize
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col glass-strong border-l border-border/50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Paintbrush className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">Theme Builder</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={reset}
                    className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                    title="Reset to defaults"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto">
                {/* Presets */}
                <Section title="Presets">
                  <div className="flex flex-wrap gap-1.5">
                    {PRESETS.map((preset) => (
                      <motion.button
                        key={preset.name}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => applyPreset(preset)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          activePreset === preset.name
                            ? "bg-primary/10 border-primary text-primary"
                            : "border-border/50 text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                      >
                        <span>{preset.emoji}</span>
                        {preset.name}
                      </motion.button>
                    ))}
                  </div>
                </Section>

                {/* Colors */}
                <Section title="Colors">
                  <ColorRow
                    label="Primary"
                    token="--brand-500"
                    tokens={tokens}
                    onChange={updateToken}
                  />
                  <ColorRow
                    label="Secondary (dark)"
                    token="--brand-900"
                    tokens={tokens}
                    onChange={updateToken}
                  />
                  <ColorRow
                    label="Accent"
                    token="--accent-500"
                    tokens={tokens}
                    onChange={updateToken}
                  />
                  <ColorRow
                    label="Ember"
                    token="--accent-700"
                    tokens={tokens}
                    onChange={updateToken}
                  />
                </Section>

                {/* Shape */}
                <Section title="Shape">
                  <SliderRow
                    label="Border Radius"
                    token="--radius"
                    tokens={tokens}
                    onChange={updateToken}
                    min={0}
                    max={32}
                    step={1}
                    unit="px"
                  />
                </Section>

                {/* Glass */}
                <Section title="Glass Effect">
                  <SliderRow
                    label="Blur Amount"
                    token="--glass-blur"
                    tokens={tokens}
                    onChange={updateToken}
                    min={0}
                    max={40}
                    step={2}
                    unit="px"
                  />
                </Section>

                {/* Motion */}
                <Section title="Motion">
                  <SliderRow
                    label="Animation Speed"
                    token="--transition-normal"
                    tokens={tokens}
                    onChange={updateToken}
                    min={0}
                    max={600}
                    step={25}
                    unit="ms"
                  />
                </Section>
              </div>

              {/* Footer — Export CSS */}
              <div className="p-3 border-t border-border/50 space-y-2">
                <p className="text-[10px] text-muted-foreground">
                  Copy the CSS and paste it into your app's stylesheet.
                </p>
                <button
                  onClick={copy}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium transition-all hover:bg-primary/90 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy CSS
                    </>
                  )}
                </button>
                <details className="text-xs">
                  <summary className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                    Preview CSS
                  </summary>
                  <pre className="mt-2 p-2 rounded bg-muted/50 text-[10px] font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
                    {generateCSS(tokens)}
                  </pre>
                </details>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeBuilder;
