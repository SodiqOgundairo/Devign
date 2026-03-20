import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AnimatedNumber,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  StatusBadge,
  Breadcrumbs,
  Button,
  IconButton,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatCard,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DatePicker,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
  Hoverable,
  Input,
  FormField,
  Textarea,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TimePicker,
  Toaster,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
  // Typography & layout
  Heading,
  Text,
  Code,
  Lead,
  Blockquote,
  Spinner,
  LoadingOverlay,
  Kbd,
  Shortcut,
  AvatarGroup,
  NumberInput,
  Container,
  Stack,
  Grid,
  Divider,
} from "@devign/core";
import { ThemeBuilder } from "./ThemeBuilder";
import { BuilderTab } from "./BuilderTab";
import {
  Bell,
  Bold,
  CalendarDays,
  Check,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Italic,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  Underline,
  User,
  Wifi,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  Cloud,
  Type,
  LayoutGrid,
  Keyboard,
  Users,
  Hash,
  Loader2,
  Sparkles,
  MousePointer2,
  Clock,
  SlidersHorizontal,
  PanelRightOpen,
  ChevronsUpDown,
  ToggleLeft,
} from "lucide-react";

function App() {
  const { toast } = useToast();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Form states
  const [inputValue, setInputValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");
  const [progress, setProgress] = useState(13);

  // New component states
  const [qty, setQty] = useState(1);
  const [overlayLoading, setOverlayLoading] = useState(false);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);
  const [pickerDate, setPickerDate] = useState<Date | null>(null);
  const [timeValue, setTimeValue] = useState<string>("");
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState<[number, number]>([20, 80]);
  const [animNum, setAnimNum] = useState(1234);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [persistentOpen, setPersistentOpen] = useState(false);

  // Load theme
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    let initialTheme: "light" | "dark";
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      initialTheme = prefersDark ? "dark" : "light";
    }
    setTheme(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  React.useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const simulateLoading = () => {
    setOverlayLoading(true);
    setTimeout(() => setOverlayLoading(false), 2500);
  };

  const year = new Date().getFullYear();
  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Devign
                </h1>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  v3.0.0
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                Modern React component library with optional glassmorphism, premium animations, and a fully themeable design system
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                    className="rounded-lg transition-all duration-200 hover:bg-primary/10"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5 transition-transform duration-300 rotate-0" />
                    ) : (
                      <Moon className="h-5 w-5 transition-transform duration-300 rotate-180" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
                </TooltipContent>
              </Tooltip>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://github.com/SodiqOgundairo/Devign", "_blank")}
                className="gap-2 transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("https://www.npmjs.com/package/devign", "_blank")}
                className="gap-2 transition-all duration-200"
              >
                <span className="font-bold">npm</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
            <Tabs defaultValue="general" className="w-full space-y-8">
              {/* Tab nav */}
              <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 sticky top-[88px] z-40 bg-background/95 backdrop-blur-lg pb-4 border-b border-border/50">
                <TabsList className="w-full md:w-auto justify-start gap-1 p-1 h-auto bg-background/50 border border-border/50 rounded-lg">
                  <TabsTrigger value="general" className="px-3 md:px-4 py-2 text-sm md:text-base">General</TabsTrigger>
                  <TabsTrigger value="forms" className="px-3 md:px-4 py-2 text-sm md:text-base">Forms</TabsTrigger>
                  <TabsTrigger value="feedback" className="px-3 md:px-4 py-2 text-sm md:text-base">Feedback</TabsTrigger>
                  <TabsTrigger value="navigation" className="px-3 md:px-4 py-2 text-sm md:text-base">Navigation</TabsTrigger>
                  <TabsTrigger value="overlays" className="px-3 md:px-4 py-2 text-sm md:text-base">Overlays</TabsTrigger>
                  <TabsTrigger value="data" className="px-3 md:px-4 py-2 text-sm md:text-base">Data</TabsTrigger>
                  <TabsTrigger value="new" className="px-3 md:px-4 py-2 text-sm md:text-base relative">New v3</TabsTrigger>
                  <TabsTrigger value="builder" className="px-3 md:px-4 py-2 text-sm md:text-base">Builder</TabsTrigger>
                </TabsList>
              </div>

              {/* ── GENERAL ─────────────────────────────────────────────── */}
              <TabsContent value="general" className="space-y-8">
                <Section title="Buttons" description="Primary action elements with animated prop support.">
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="accent">Accent</Button>
                      <Button variant="ember">Ember</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link Button</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="outline-primary">Outline Primary</Button>
                      <Button variant="outline-secondary">Outline Secondary</Button>
                      <Button variant="outline-accent">Outline Accent</Button>
                      <Button variant="outline-destructive">Outline Destructive</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="sm">Small</Button>
                      <Button variant="primary" size="default">Default</Button>
                      <Button variant="primary" size="lg">Large</Button>
                      <Button variant="primary" size="xl">Extra Large</Button>
                      <Button variant="primary" isLoading>Loading</Button>
                      <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>With Icon</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" animated={false}>No Animation</Button>
                      <Text size="sm" variant="muted">animated=false disables ripple & scale</Text>
                    </div>
                  </div>
                </Section>

                <Section title="Badges" description="Status indicators and labels.">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="accent">Accent</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="soft-primary">Soft Primary</Badge>
                      <Badge variant="soft-success" dot>Active</Badge>
                      <Badge variant="soft-warning" dot>Pending</Badge>
                      <Badge variant="soft-error" dot>Failed</Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <StatusBadge status="active" />
                      <StatusBadge status="pending" />
                      <StatusBadge status="inactive" />
                      <StatusBadge status="error" />
                    </div>
                  </div>
                </Section>

                <Section title="Card Variants" description="5 variants: glass, solid, flat, outline, ghost. Glass is opt-in with sm/md/lg intensity.">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <Card variant="solid">
                      <CardHeader>
                        <CardTitle>Solid Card</CardTitle>
                        <CardDescription>Default solid background.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">No glass — fully Tailwind-composable.</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline-primary" className="w-full">Action</Button>
                      </CardFooter>
                    </Card>

                    <Card variant="glass" glass="md" hover>
                      <CardHeader>
                        <CardTitle>Glass Card</CardTitle>
                        <CardDescription>Opt-in glassmorphism (md).</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Hover to see lift effect.</p>
                      </CardContent>
                    </Card>

                    <Card variant="outline">
                      <CardHeader>
                        <CardTitle>Outline Card</CardTitle>
                        <CardDescription>Transparent with border.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Clean, minimal style.</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <Card variant="flat">
                      <CardHeader>
                        <CardTitle>Flat Card</CardTitle>
                        <CardDescription>No border, no shadow.</CardDescription>
                      </CardHeader>
                      <CardContent padding="lg" direction="horizontal">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <Text weight="semibold">Horizontal Layout</Text>
                          <Text size="sm" variant="muted">CardContent direction=horizontal, padding=lg</Text>
                        </div>
                      </CardContent>
                    </Card>

                    <Card variant="ghost" animated={false}>
                      <CardHeader>
                        <CardTitle>Ghost Card (no animation)</CardTitle>
                        <CardDescription>animated=false renders plain div.</CardDescription>
                      </CardHeader>
                      <CardContent padding="sm">
                        <Text size="sm" variant="muted">Compact padding with padding=sm.</Text>
                      </CardContent>
                    </Card>
                  </div>
                </Section>

                <Section title="Stat Cards" description="Data display with trend indicators.">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <StatCard
                      title="Total Revenue"
                      value="$45,231.89"
                      trend={{ value: 20.1, isPositive: true }}
                      icon={<CreditCard className="h-4 w-4" />}
                      description="vs last month"
                    />
                    <StatCard
                      title="Active Users"
                      value="2,350"
                      trend={{ value: 5.4, isPositive: true }}
                      icon={<Users className="h-4 w-4" />}
                      description="vs last week"
                      variant="glass"
                      glass="sm"
                    />
                    <StatCard
                      title="Bounce Rate"
                      value="24.3%"
                      trend={{ value: -3.2, isPositive: false }}
                      icon={<AlertTriangle className="h-4 w-4" />}
                      description="vs last month"
                      animated={false}
                    />
                  </div>
                </Section>

                <Section title="Avatars" description="User profile images with fallbacks.">
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-4 items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback>SO</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </Section>

                <Section title="Skeletons" description="Loading placeholders with size presets.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-3">
                      <Text size="sm" variant="muted" weight="semibold">Size presets</Text>
                      <Skeleton size="text-xs" />
                      <Skeleton size="text-sm" />
                      <Skeleton size="text-base" />
                      <Skeleton size="text-lg" />
                      <Skeleton size="text-xl" />
                    </div>
                    <div className="space-y-3">
                      <Text size="sm" variant="muted" weight="semibold">Avatars & custom</Text>
                      <div className="flex gap-3 items-center">
                        <Skeleton size="avatar-sm" />
                        <Skeleton size="avatar" />
                        <Skeleton size="avatar-lg" />
                      </div>
                      <Skeleton width="75%" height={8} />
                      <Skeleton width="50%" height={8} />
                    </div>
                    <SkeletonText lines={4} />
                    <SkeletonCard />
                  </div>
                </Section>
              </TabsContent>

              {/* ── FORMS ────────────────────────────────────────────────── */}
              <TabsContent value="forms" className="space-y-8">
                <Section title="Inputs" description="4 variants: default, filled, ghost, plain. Glass is opt-in.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    <Input placeholder="Default Input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    <Input placeholder="Filled Variant" variant="filled" />
                    <Input placeholder="Ghost Variant" variant="ghost" />
                    <Input placeholder="Plain (no glass)" variant="plain" />
                    <Input placeholder="With Icon" leftIcon={<Search className="h-4 w-4" />} />
                    <Input placeholder="With Addon" leftAddon="https://" />
                    <Input placeholder="Error State" state="error" error="This field is required" />
                    <Input placeholder="Success State" state="success" hint="Great job!" />
                    <Input placeholder="Large" inputSize="lg" />
                    <Input placeholder="Glass disabled" glass={false} />
                  </div>
                </Section>

                <Section title="Date & Time Pickers" description="Calendar, DatePicker, and TimePicker components.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">DatePicker</Text>
                      <DatePicker
                        value={pickerDate}
                        onChange={setPickerDate}
                        placeholder="Pick a date"
                      />
                      {pickerDate && (
                        <Text size="xs" variant="muted">Selected: {pickerDate.toLocaleDateString()}</Text>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">TimePicker</Text>
                      <TimePicker
                        value={timeValue}
                        onChange={setTimeValue}
                        step={15}
                        placeholder="Pick a time"
                      />
                      {timeValue && (
                        <Text size="xs" variant="muted">Selected: {timeValue}</Text>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">DatePicker (dd/mm/yyyy, min=today)</Text>
                      <DatePicker format="dd/mm/yyyy" minDate={new Date()} />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">TimePicker (24h, step=30)</Text>
                      <TimePicker use24Hour step={30} />
                    </div>
                  </div>
                  <div className="w-full max-w-[280px] space-y-2">
                    <Text size="sm" variant="muted" weight="semibold">Standalone Calendar</Text>
                    <Calendar
                      value={calendarDate}
                      onChange={setCalendarDate}
                    />
                    {calendarDate && (
                      <Text size="xs" variant="muted">Selected: {calendarDate.toLocaleDateString()}</Text>
                    )}
                  </div>
                </Section>

                <Section title="Textarea" description="Multi-line text input.">
                  <div className="w-full max-w-md space-y-4">
                    <FormField label="Message" htmlFor="msg" required hint="Max 500 characters">
                      <Textarea id="msg" placeholder="Write your message..." rows={4} />
                    </FormField>
                    <FormField label="Plain textarea" htmlFor="msg-plain">
                      <Textarea id="msg-plain" placeholder="No glass..." variant="plain" />
                    </FormField>
                  </div>
                </Section>

                <Section title="Selection Controls" description="Checkboxes, radios, and switches.">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" checked={checkboxChecked} onCheckedChange={(c) => setCheckboxChecked(c as boolean)} />
                      <label htmlFor="terms" className="text-sm font-medium">Accept terms and conditions</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" checked={switchChecked} onCheckedChange={setSwitchChecked} />
                      <label htmlFor="airplane-mode" className="text-sm font-medium">Airplane Mode — {switchChecked ? "On" : "Off"}</label>
                    </div>
                    <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                      {["option1", "option2", "option3"].map((val, i) => (
                        <div key={val} className="flex items-center space-x-2">
                          <RadioGroupItem value={val} id={`r${i}`} />
                          <label htmlFor={`r${i}`} className="text-sm">{["Default", "Comfortable", "Compact"][i]}</label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </Section>

                <Section title="Select" description="Dropdown selection.">
                  <Select value={selectValue} onValueChange={setSelectValue}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                      <SelectItem value="grape">Grape</SelectItem>
                    </SelectContent>
                  </Select>
                </Section>

                <Section title="Slider" description="Range input with single and dual-thumb modes.">
                  <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">Single: {sliderValue}</Text>
                      <Slider value={sliderValue} onChange={(v) => setSliderValue(v as number)} showValue />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">Range: {rangeValue[0]} – {rangeValue[1]}</Text>
                      <Slider value={rangeValue} onChange={(v) => setRangeValue(v as [number, number])} showValue size="lg" />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">Step 10, small</Text>
                      <Slider value={50} step={10} size="sm" />
                    </div>
                  </div>
                </Section>
              </TabsContent>

              {/* ── FEEDBACK ─────────────────────────────────────────────── */}
              <TabsContent value="feedback" className="space-y-8">
                <Section title="Alerts" description="Important messages with animated prop support.">
                  <div className="flex flex-col gap-4 w-full max-w-2xl">
                    <Alert variant="info">
                      <Zap className="h-4 w-4" />
                      <AlertTitle>Heads up!</AlertTitle>
                      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>This action cannot be undone.</AlertDescription>
                    </Alert>
                    <Alert variant="error">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Your session has expired.</AlertDescription>
                    </Alert>
                    <Alert variant="success">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>Your changes have been saved.</AlertDescription>
                    </Alert>
                    <Alert variant="info" dismissible>
                      <AlertTitle>Dismissible Alert</AlertTitle>
                      <AlertDescription>Click x to dismiss this alert.</AlertDescription>
                    </Alert>
                    <Alert variant="info" animated={false}>
                      <AlertTitle>Static Alert</AlertTitle>
                      <AlertDescription>animated=false for no entrance animation.</AlertDescription>
                    </Alert>
                  </div>
                </Section>

                <Section title="Progress" description="Progress indicators.">
                  <div className="w-full max-w-md space-y-4">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">Loading... {progress}%</p>
                    <Progress value={40} className="w-full h-2" />
                    <Progress value={80} className="w-full h-3" />
                  </div>
                </Section>

                <Section title="Toast" description="Temporary notifications.">
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline-primary" onClick={() => toast({ title: "Saved!", description: "Your changes have been saved." })}>Default Toast</Button>
                    <Button variant="outline-destructive" onClick={() => toast({ variant: "destructive", title: "Error!", description: "Something went wrong." })}>Error Toast</Button>
                    <Button variant="outline-accent" onClick={() => toast({ title: "New message", description: "You have a new message from Alice." })}>Info Toast</Button>
                  </div>
                </Section>

                <Section title="Empty State" description="Placeholder for empty content. Glass is opt-in.">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <EmptyState
                      title="No Messages"
                      description="You haven't received any messages yet."
                      icon={<MessageSquare className="h-12 w-12" />}
                      action={{ label: "New Message", onClick: () => toast({ title: "New Message" }) }}
                    />
                    <EmptyState
                      title="Glass Empty State"
                      description="With glass=md for subtle blur."
                      icon={<Sparkles className="h-12 w-12" />}
                      glass="md"
                    />
                  </div>
                </Section>
              </TabsContent>

              {/* ── NAVIGATION ───────────────────────────────────────────── */}
              <TabsContent value="navigation" className="space-y-8">
                <Section title="Breadcrumbs" description="Page hierarchy path.">
                  <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Components", href: "#" }, { label: "Breadcrumbs" }]} />
                </Section>

                <Section title="Pagination" description="Page navigation.">
                  <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
                </Section>

                <Section title="Accordion" description="Collapsible content sections.">
                  <Accordion type="single" collapsible className="w-full max-w-md">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>Yes. It comes with default styles that match the library aesthetic.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>Yes. It uses smooth spring animations powered by Motion.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Section>
              </TabsContent>

              {/* ── OVERLAYS ─────────────────────────────────────────────── */}
              <TabsContent value="overlays" className="space-y-8">
                <Section title="Center Dialog" description="Traditional modal at the center. Closeable via X button, Esc key, or overlay click.">
                  <div className="flex gap-4 flex-wrap">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="primary">Center Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>Make changes to your profile here. Close with X, Esc, or click outside.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <FormField label="Name" htmlFor="dialog-name">
                            <Input id="dialog-name" defaultValue="Pedro Duarte" variant="plain" />
                          </FormField>
                          <FormField label="Email" htmlFor="dialog-email">
                            <Input id="dialog-email" type="email" defaultValue="pedro@example.com" variant="plain" />
                          </FormField>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="ghost">Cancel</Button>
                          </DialogClose>
                          <Button type="submit" variant="primary">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline-accent">Glass Dialog</Button>
                      </DialogTrigger>
                      <DialogContent glass="md">
                        <DialogHeader>
                          <DialogTitle>Glass Dialog</DialogTitle>
                          <DialogDescription>glass=md for glassmorphism blur.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Text>Glassmorphism blur behind the dialog panel.</Text>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Section>

                <Section title="Top & Bottom Modals" description="Modals that slide in from top or bottom edge.">
                  <div className="flex gap-4 flex-wrap">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline-primary">Top Modal</Button>
                      </DialogTrigger>
                      <DialogContent position="top">
                        <DialogHeader>
                          <DialogTitle>Top Modal</DialogTitle>
                          <DialogDescription>Slides in from the top of the screen.</DialogDescription>
                        </DialogHeader>
                        <div className="py-2">
                          <Text size="sm" variant="muted">Great for notifications, announcements, or quick actions.</Text>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Dismiss</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline-secondary">Bottom Modal</Button>
                      </DialogTrigger>
                      <DialogContent position="bottom">
                        <DialogHeader>
                          <DialogTitle>Bottom Modal</DialogTitle>
                          <DialogDescription>Slides in from the bottom — mobile-friendly action sheet.</DialogDescription>
                        </DialogHeader>
                        <div className="py-2 space-y-2">
                          <Button variant="outline" className="w-full justify-start">Share</Button>
                          <Button variant="outline" className="w-full justify-start">Copy link</Button>
                          <Button variant="outline" className="w-full justify-start">Edit</Button>
                          <Button variant="destructive" className="w-full justify-start">Delete</Button>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="ghost" className="w-full">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Section>

                <Section title="Persistent Dialog" description="Cannot be closed via Esc, overlay click, or X button. Must use explicit action.">
                  <div className="flex gap-4 flex-wrap">
                    <Dialog open={persistentOpen} onOpenChange={setPersistentOpen}>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Open Persistent Modal</Button>
                      </DialogTrigger>
                      <DialogContent persistent>
                        <DialogHeader>
                          <DialogTitle>Terms of Service</DialogTitle>
                          <DialogDescription>You must accept to continue. No X button, no Esc, no overlay click.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <Text size="sm">By clicking "I Accept" you agree to our terms of service and privacy policy. This modal cannot be dismissed any other way.</Text>
                        </div>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => setPersistentOpen(false)}>Decline</Button>
                          <Button variant="primary" onClick={() => { setPersistentOpen(false); toast({ title: "Accepted!" }); }}>I Accept</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Section>

                <Section title="Side Drawer" description="Slide-in panel from any edge with adjustable sizes. Closeable via X, Esc, or overlay.">
                  <div className="flex gap-4 flex-wrap">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline-primary">Right Drawer (md)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="right" size="md">
                        <DrawerHeader title="Settings" description="Manage your preferences." />
                        <DrawerBody>
                          <div className="space-y-4">
                            <FormField label="Display Name" htmlFor="drawer-name">
                              <Input id="drawer-name" variant="plain" placeholder="Your name" />
                            </FormField>
                            <FormField label="Email" htmlFor="drawer-email">
                              <Input id="drawer-email" variant="plain" type="email" placeholder="email@example.com" />
                            </FormField>
                            <div className="flex items-center justify-between">
                              <Text size="sm">Dark Mode</Text>
                              <Switch checked={theme === "dark"} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
                            </div>
                          </div>
                        </DrawerBody>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="ghost">Cancel</Button>
                          </DrawerClose>
                          <DrawerClose asChild>
                            <Button variant="primary" onClick={() => toast({ title: "Saved!" })}>Save</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline-secondary">Left Drawer (sm)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="left" size="sm">
                        <DrawerHeader title="Navigation" description="Quick links." />
                        <DrawerBody>
                          <div className="space-y-1">
                            {["Dashboard", "Users", "Settings", "Reports", "Billing"].map((item) => (
                              <DrawerClose key={item} asChild>
                                <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors">
                                  {item}
                                </button>
                              </DrawerClose>
                            ))}
                          </div>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline-secondary">Left Drawer (lg)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="left" size="lg">
                        <DrawerHeader title="Sidebar Panel" description="Large left-side panel for navigation or content." />
                        <DrawerBody>
                          <Text size="sm" variant="muted">This is a large (lg) left drawer — 672px max width. Good for sidebars, file trees, or navigation panels.</Text>
                        </DrawerBody>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="ghost">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline-accent">Right Drawer (lg)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="right" size="lg">
                        <DrawerHeader title="Detail View" description="Large drawer for complex content." />
                        <DrawerBody>
                          <Text size="sm" variant="muted">This is a large (lg) drawer — 672px max width. Good for detail panels, editors, or split views.</Text>
                        </DrawerBody>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="ghost">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>

                  </div>
                </Section>

                <Section title="Bottom & Top Drawers" description="Drawers from top/bottom edges with adjustable height.">
                  <div className="flex gap-4 flex-wrap">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline">Bottom Drawer (md)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="bottom" size="md">
                        <DrawerHeader title="Quick Actions" description="Swipe up for more." />
                        <DrawerBody>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">Share to...</Button>
                            <Button variant="outline" className="w-full justify-start">Copy link</Button>
                            <Button variant="outline" className="w-full justify-start">Download</Button>
                          </div>
                        </DrawerBody>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="ghost" className="w-full">Cancel</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>

                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button variant="outline">Top Drawer (sm)</Button>
                      </DrawerTrigger>
                      <DrawerContent position="top" size="sm">
                        <DrawerHeader title="Announcement" />
                        <DrawerBody>
                          <Text size="sm">System maintenance scheduled for tonight at 11 PM UTC.</Text>
                        </DrawerBody>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="ghost">Dismiss</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </Section>

                <Section title="Persistent Drawer" description="Cannot be closed via Esc or overlay click. Must use explicit button.">
                  <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                    <DrawerTrigger asChild>
                      <Button variant="destructive">Persistent Drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent position="right" size="md" persistent>
                      <DrawerHeader title="Confirm Action" description="This requires your attention." hideClose />
                      <DrawerBody>
                        <Text size="sm">This drawer is persistent — it can only be closed by the action buttons below, not by pressing Esc or clicking outside.</Text>
                      </DrawerBody>
                      <DrawerFooter>
                        <Button variant="ghost" onClick={() => setDrawerOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={() => { setDrawerOpen(false); toast({ title: "Confirmed!" }); }}>Confirm</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </Section>

                <Section title="Popover" description="Contextual popup.">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-medium">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
                        <Input placeholder="Width" inputSize="sm" variant="plain" />
                        <Input placeholder="Height" inputSize="sm" variant="plain" />
                      </div>
                    </PopoverContent>
                  </Popover>
                </Section>

                <Section title="Dropdown Menu" description="Context menu actions.">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem><User className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
                      <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" />Billing</DropdownMenuItem>
                      <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Section>

                <Section title="Tooltip" description="Contextual hover hints.">
                  <div className="flex gap-6 flex-wrap">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline-primary">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>This is a tooltip</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <IconButton aria-label="Settings" variant="ghost">
                          <Settings className="h-4 w-4" />
                        </IconButton>
                      </TooltipTrigger>
                      <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                  </div>
                </Section>
              </TabsContent>

              {/* ── DATA ─────────────────────────────────────────────────── */}
              <TabsContent value="data" className="space-y-8">
                <Section title="Table" description="Data rows with status badges.">
                  <div className="border border-border rounded-xl overflow-hidden w-full">
                    <Table>
                      <TableCaption>A list of your recent invoices.</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell><Badge variant="soft-success">Paid</Badge></TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV002</TableCell>
                          <TableCell><Badge variant="soft-warning">Pending</Badge></TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV003</TableCell>
                          <TableCell><Badge variant="soft-error">Unpaid</Badge></TableCell>
                          <TableCell>Bank Transfer</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV004</TableCell>
                          <TableCell><Badge variant="soft-primary">Processing</Badge></TableCell>
                          <TableCell>Wire Transfer</TableCell>
                          <TableCell className="text-right">$890.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Section>

                <Section title="Animated Number" description="Spring-animated counting display.">
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <div className="flex items-center gap-4">
                      <AnimatedNumber value={animNum} className="text-4xl font-bold text-primary" />
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setAnimNum((n) => n + 500)}>+500</Button>
                        <Button size="sm" variant="outline" onClick={() => setAnimNum((n) => Math.max(0, n - 500))}>-500</Button>
                      </div>
                    </div>
                    <AnimatedNumber
                      value={animNum}
                      format={(n) => `$${n.toLocaleString()}`}
                      className="text-2xl font-semibold"
                    />
                  </div>
                </Section>
              </TabsContent>

              {/* ── NEW v3.0.0 ───────────────────────────────────────────── */}
              <TabsContent value="new" className="space-y-8">
                {/* Hoverable */}
                <Section title="Hoverable" description="10 composable hover effects with intensity control.">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
                    {(["lift", "scale", "glow", "tilt", "spotlight", "magnetic", "shine", "pop", "press", "bounce"] as const).map((effect) => (
                      <Hoverable key={effect} effect={effect} intensity="md">
                        <Card variant="outline" className="p-4 text-center cursor-pointer">
                          <Text size="sm" weight="semibold" className="capitalize">{effect}</Text>
                        </Card>
                      </Hoverable>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Text size="sm" variant="muted" weight="semibold">Composable: tilt + glow + spotlight</Text>
                    <Hoverable effect={["tilt", "glow", "spotlight"]} intensity="lg">
                      <Card variant="solid" className="p-6 w-full max-w-sm cursor-pointer">
                        <Text weight="semibold">Multi-effect card</Text>
                        <Text size="sm" variant="muted">Hover to see combined effects.</Text>
                      </Card>
                    </Hoverable>
                  </div>
                </Section>

                {/* CSS Hover utilities */}
                <Section title="CSS Hover Utilities" description="16+ pure CSS hover classes from styles.css.">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {[
                      "hover-lift", "hover-lift-sm", "hover-scale", "hover-scale-sm",
                      "hover-glow", "hover-ring", "hover-shine", "hover-brighten",
                      "hover-dim", "hover-pop", "hover-press", "hover-tilt",
                    ].map((cls) => (
                      <div
                        key={cls}
                        className={`${cls} bg-card border border-border rounded-lg p-4 text-center cursor-pointer transition-all`}
                      >
                        <Text size="xs" className="font-mono">.{cls}</Text>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Collapsible */}
                <Section title="Collapsible" description="Single-item expand/collapse with animation.">
                  <div className="w-full max-w-md">
                    <Collapsible>
                      <CollapsibleTrigger showChevron={false} className="w-full justify-between rounded-lg border border-border px-4 py-2 hover:bg-muted/50">
                        <span>Click to expand</span>
                        <ChevronsUpDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2 rounded-lg border border-border p-4 space-y-2">
                          <Text size="sm">This content is collapsible.</Text>
                          <Text size="sm" variant="muted">Uses smooth spring animation by default. Pass animated=false to disable.</Text>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </Section>

                {/* Toggle */}
                <Section title="Toggle & ToggleGroup" description="Toggle buttons with variants and multi-select groups.">
                  <div className="flex flex-col gap-6">
                    <div className="flex gap-3 flex-wrap">
                      <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
                      <Toggle aria-label="Italic" variant="outline"><Italic className="h-4 w-4" /></Toggle>
                      <Toggle aria-label="Underline" variant="filled"><Underline className="h-4 w-4" /></Toggle>
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">ToggleGroup — multiple selection</Text>
                      <ToggleGroup value={[]} onValueChange={() => {}} multiple variant="outline">
                        <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  </div>
                </Section>

                {/* ScrollArea */}
                <Section title="ScrollArea" description="Styled scrollable container.">
                  <ScrollArea className="h-40 w-full max-w-sm rounded-lg border border-border p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 20 }, (_, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {i + 1}
                          </div>
                          <Text size="sm">Scrollable item #{i + 1}</Text>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Section>

                {/* Typography */}
                <Section title="Typography" description="Heading, Text, Code, Lead, and Blockquote.">
                  <div className="flex flex-col gap-6 w-full">
                    <div className="space-y-3">
                      <Heading as="h1" size="4xl">Heading 4XL</Heading>
                      <Heading as="h2" size="3xl">Heading 3XL</Heading>
                      <Heading as="h3" size="2xl">Heading 2XL</Heading>
                      <Heading as="h4" size="xl">Heading XL</Heading>
                    </div>
                    <Divider />
                    <div className="space-y-2">
                      <Heading size="xl" gradient="primary">Gradient Primary</Heading>
                      <Heading size="xl" gradient="accent">Gradient Accent</Heading>
                      <Heading size="xl" gradient="cool">Gradient Cool</Heading>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                      <Lead>This is a Lead paragraph — large intro text for sections.</Lead>
                      <Text size="md">Default body text at medium size.</Text>
                      <Text size="sm" variant="muted">Muted small text for secondary info.</Text>
                      <Text size="sm" variant="primary" weight="semibold">Primary semibold text.</Text>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                      <Text>Inline code: <Code>npm install devign</Code></Text>
                      <Code block>{`import { Button, Card } from "devign";

function App() {
  return (
    <Card variant="solid">
      <Button variant="primary">Hello</Button>
    </Card>
  );
}`}</Code>
                    </div>
                    <Blockquote>
                      Design is not just what it looks like. Design is how it works. — Steve Jobs
                    </Blockquote>
                  </div>
                </Section>

                {/* Spinner */}
                <Section title="Spinner" description="Loading spinners and overlay.">
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-wrap items-center gap-6">
                      {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                        <div key={s} className="flex flex-col items-center gap-2">
                          <Spinner size={s} />
                          <Text size="xs" variant="muted">{s}</Text>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Spinner variant="primary" />
                      <Spinner variant="secondary" />
                      <Spinner variant="accent" />
                      <Spinner variant="muted" />
                      <div className="bg-primary rounded-xl p-3">
                        <Spinner variant="white" />
                      </div>
                    </div>
                    <div className="w-full max-w-sm">
                      <LoadingOverlay loading={overlayLoading} label="Fetching data...">
                        <Card variant="solid">
                          <CardContent className="p-6 space-y-3">
                            <Text weight="semibold">Dashboard Widget</Text>
                            <Text size="sm" variant="muted">Click the button to see loading overlay.</Text>
                            <Button variant="primary" size="sm" onClick={simulateLoading} isLoading={overlayLoading}>
                              {overlayLoading ? "Loading..." : "Simulate Load"}
                            </Button>
                          </CardContent>
                        </Card>
                      </LoadingOverlay>
                    </div>
                  </div>
                </Section>

                {/* Kbd */}
                <Section title="Keyboard Keys" description="Keyboard shortcut display.">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Kbd>Ctrl</Kbd><Kbd>Shift</Kbd><Kbd>Alt</Kbd><Kbd>Enter</Kbd><Kbd>Esc</Kbd><Kbd>Tab</Kbd>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">Save</Text>
                        <Shortcut keys={["Ctrl", "S"]} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">Command palette</Text>
                        <Shortcut keys={["Ctrl", "K"]} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">Find</Text>
                        <Shortcut keys={["Ctrl", "F"]} />
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Avatar Group */}
                <Section title="Avatar Group" description="Overlapping avatar stack with overflow.">
                  <div className="flex flex-col gap-6">
                    <AvatarGroup
                      size="sm"
                      spacing="tight"
                      avatars={[
                        { fallback: "AL" }, { fallback: "BO" }, { fallback: "CW" },
                        { fallback: "DM" }, { fallback: "EK" }, { fallback: "FP" },
                      ]}
                    />
                    <AvatarGroup
                      size="md"
                      avatars={[
                        { src: "https://github.com/shadcn.png", fallback: "CN", alt: "shadcn" },
                        { fallback: "JD" }, { fallback: "SO" }, { fallback: "MK" },
                        { fallback: "AL" }, { fallback: "BO" }, { fallback: "CW" },
                      ]}
                      max={4}
                    />
                    <AvatarGroup
                      size="lg"
                      spacing="loose"
                      avatars={[
                        { fallback: "AL" }, { fallback: "BO" }, { fallback: "CW" }, { fallback: "DM" },
                      ]}
                    />
                  </div>
                </Section>

                {/* Number Input */}
                <Section title="Number Input" description="Increment / decrement input.">
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">Quantity (1-99)</Text>
                      <NumberInput value={qty} onChange={setQty} min={1} max={99} />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">Step by 5</Text>
                      <NumberInput min={0} max={100} step={5} size="sm" />
                    </div>
                  </div>
                </Section>

                {/* Layout */}
                <Section title="Layout Primitives" description="Container, Stack, Grid, and Divider.">
                  <div className="flex flex-col gap-8 w-full">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">Stack — column (gap 4)</Text>
                      <Stack direction="col" gap={4} className="w-full max-w-xs">
                        {["First", "Second", "Third"].map((l) => (
                          <div key={l} className="bg-muted rounded-lg p-3 text-sm text-center">{l}</div>
                        ))}
                      </Stack>
                    </div>

                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">Stack — row with justify between</Text>
                      <Stack direction="row" gap={4} justify="between" align="center" className="w-full bg-muted rounded-xl p-4">
                        <Text size="sm" weight="semibold">Label</Text>
                        <Badge variant="soft-primary">Value</Badge>
                      </Stack>
                    </div>

                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">Grid — 1 / 2 / 3 cols responsive</Text>
                      <Grid cols={1} mdCols={2} lgCols={3} gap={4} className="w-full">
                        {["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta"].map((l) => (
                          <div key={l} className="bg-muted rounded-lg p-4 text-sm text-center font-medium">{l}</div>
                        ))}
                      </Grid>
                    </div>

                    <div className="space-y-3 w-full max-w-md">
                      <Text size="sm" variant="muted" weight="semibold">Dividers</Text>
                      <Divider />
                      <Divider label="or" />
                      <Divider label="continue with email" />
                      <div className="flex items-center h-16 gap-4">
                        <Text size="sm">Left</Text>
                        <Divider orientation="vertical" />
                        <Text size="sm">Right</Text>
                      </div>
                    </div>
                  </div>
                </Section>
              </TabsContent>

              {/* ── BUILDER ─────────────────────────────────────────────── */}
              <TabsContent value="builder" className="space-y-0">
                <BuilderTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/95 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              Devign v3.0.0 &copy; {year} &bull; Built with React & Tailwind CSS v4
            </p>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/SodiqOgundairo/Devign" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">GitHub</a>
              <a href="https://www.npmjs.com/package/devign" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">NPM</a>
              <a href="https://github.com/SodiqOgundairo/Devign#readme" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Documentation</a>
            </div>
          </div>
        </footer>

        <Toaster />
        <ThemeBuilder />
      </div>
    </TooltipProvider>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="p-6 md:p-8 rounded-xl md:rounded-2xl border border-border/40 bg-muted/30 backdrop-blur-sm space-y-6 flex flex-col items-start">
        {children}
      </div>
    </div>
  );
}

export default App;
