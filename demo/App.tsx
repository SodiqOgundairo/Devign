import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  StatusBadge,
  Breadcrumbs,
  Button,
  IconButton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  StatCard,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmptyState,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  SkeletonCard,
  SkeletonText,
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
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
  // New v1.2.0
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
} from "@yems-ui/core";
import { ThemeBuilder } from "./ThemeBuilder";
import {
  Bell,
  Calendar,
  Check,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Mail,
  MessageSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
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

  // Load theme from localStorage and system preference on mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    let initialTheme: "light" | "dark";
    if (savedTheme) {
      initialTheme = savedTheme;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      initialTheme = prefersDark ? "dark" : "light";
    }
    setTheme(initialTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Apply theme changes to html element
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

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
                  YemsUI
                </h1>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  v1.2.0
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
                Modern React component library with glassmorphism effects and
                premium interactions
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme((t) => (t === "dark" ? "light" : "dark"))
                    }
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
                onClick={() =>
                  window.open(
                    "https://github.com/SodiqOgundairo/YemsUI",
                    "_blank",
                  )
                }
                className="gap-2 transition-all duration-200"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">GitHub</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://www.npmjs.com/package/yems-ui", "_blank")
                }
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
              <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 sticky top-22 z-40 bg-background/95 backdrop-blur-lg pb-4 border-b border-border/50">
                <TabsList className="w-full md:w-auto justify-start gap-1 p-1 h-auto bg-background/50 border border-border/50 rounded-lg">
                  <TabsTrigger
                    value="general"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger
                    value="forms"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    Forms
                  </TabsTrigger>
                  <TabsTrigger
                    value="feedback"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    Feedback
                  </TabsTrigger>
                  <TabsTrigger
                    value="navigation"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    Navigation
                  </TabsTrigger>
                  <TabsTrigger
                    value="overlays"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    Overlays
                  </TabsTrigger>
                  <TabsTrigger
                    value="data"
                    className="px-3 md:px-4 py-2 text-sm md:text-base"
                  >
                    Data
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="px-3 md:px-4 py-2 text-sm md:text-base relative"
                  >
                    ThemeBuilder ✨
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* ── GENERAL ─────────────────────────────────────────────── */}
              <TabsContent value="general" className="space-y-8">
                <Section
                  title="Buttons"
                  description="Primary action elements with various styles."
                >
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
                      <Button variant="outline-secondary">
                        Outline Secondary
                      </Button>
                      <Button variant="outline-accent">Outline Accent</Button>
                      <Button variant="outline-destructive">
                        Outline Destructive
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Button variant="primary" size="sm">
                        Small
                      </Button>
                      <Button variant="primary" size="default">
                        Default
                      </Button>
                      <Button variant="primary" size="lg">
                        Large
                      </Button>
                      <Button variant="primary" size="xl">
                        Extra Large
                      </Button>
                      <Button variant="primary" isLoading>
                        Loading
                      </Button>
                      <Button
                        variant="primary"
                        leftIcon={<Plus className="h-4 w-4" />}
                      >
                        With Icon
                      </Button>
                    </div>
                  </div>
                </Section>

                <Section
                  title="Badges"
                  description="Status indicators and labels."
                >
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
                      <Badge variant="soft-success" dot>
                        Active
                      </Badge>
                      <Badge variant="soft-warning" dot>
                        Pending
                      </Badge>
                      <Badge variant="soft-error" dot>
                        Failed
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <StatusBadge status="active" />
                      <StatusBadge status="pending" />
                      <StatusBadge status="inactive" />
                      <StatusBadge status="error" />
                    </div>
                  </div>
                </Section>

                <Section
                  title="Cards"
                  description="Content containers with glass effect."
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>Glass Card</CardTitle>
                        <CardDescription>Basic glass card.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Content with glassmorphism blur effect.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline-primary" className="w-full">
                          Action
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card hover className="w-full">
                      <CardHeader>
                        <CardTitle>Hover Effect</CardTitle>
                        <CardDescription>Hover over this card.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          This card lifts on hover.
                        </p>
                      </CardContent>
                    </Card>

                    <StatCard
                      title="Total Revenue"
                      value="$45,231.89"
                      trend={{ value: 20.1, isPositive: true }}
                      icon={<CreditCard className="h-4 w-4" />}
                      description="vs last month"
                    />
                  </div>
                </Section>

                <Section
                  title="Avatars"
                  description="User profile images with fallbacks."
                >
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

                <Section
                  title="Skeletons"
                  description="Loading placeholder states."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-50" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <SkeletonText lines={4} />
                    <SkeletonCard />
                  </div>
                </Section>
              </TabsContent>

              {/* ── FORMS ────────────────────────────────────────────────── */}
              <TabsContent value="forms" className="space-y-8">
                <Section
                  title="Inputs"
                  description="Data entry fields with variants."
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                    <Input
                      placeholder="Default Input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Input placeholder="Filled Variant" variant="filled" />
                    <Input placeholder="Ghost Variant" variant="ghost" />
                    <Input
                      placeholder="With Icon"
                      leftIcon={<Search className="h-4 w-4" />}
                    />
                    <Input placeholder="With Addon" leftAddon="https://" />
                    <Input
                      placeholder="Error State"
                      state="error"
                      error="This field is required"
                    />
                    <Input
                      placeholder="Success State"
                      state="success"
                      hint="Great job!"
                    />
                    <Input placeholder="Large" inputSize="lg" />
                  </div>
                </Section>

                <Section title="Textarea" description="Multi-line text input.">
                  <div className="w-full max-w-md space-y-4">
                    <FormField
                      label="Message"
                      htmlFor="msg"
                      required
                      hint="Max 500 characters"
                    >
                      <Textarea
                        id="msg"
                        placeholder="Write your message..."
                        rows={4}
                      />
                    </FormField>
                  </div>
                </Section>

                <Section
                  title="Selection Controls"
                  description="Checkboxes, radios, and switches."
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={checkboxChecked}
                        onCheckedChange={(c) =>
                          setCheckboxChecked(c as boolean)
                        }
                      />
                      <label htmlFor="terms" className="text-sm font-medium">
                        Accept terms and conditions
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="airplane-mode"
                        checked={switchChecked}
                        onCheckedChange={setSwitchChecked}
                      />
                      <label
                        htmlFor="airplane-mode"
                        className="text-sm font-medium"
                      >
                        Airplane Mode — {switchChecked ? "On" : "Off"}
                      </label>
                    </div>
                    <RadioGroup
                      value={radioValue}
                      onValueChange={setRadioValue}
                    >
                      {["option1", "option2", "option3"].map((val, i) => (
                        <div key={val} className="flex items-center space-x-2">
                          <RadioGroupItem value={val} id={`r${i}`} />
                          <label htmlFor={`r${i}`} className="text-sm">
                            {["Default", "Comfortable", "Compact"][i]}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </Section>

                <Section title="Select" description="Dropdown selection.">
                  <Select value={selectValue} onValueChange={setSelectValue}>
                    <SelectTrigger className="w-45">
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
              </TabsContent>

              {/* ── FEEDBACK ─────────────────────────────────────────────── */}
              <TabsContent value="feedback" className="space-y-8">
                <Section
                  title="Alerts"
                  description="Important messages and notifications."
                >
                  <div className="flex flex-col gap-4 w-full max-w-2xl">
                    <Alert variant="info">
                      <Zap className="h-4 w-4" />
                      <AlertTitle>Heads up!</AlertTitle>
                      <AlertDescription>
                        You can add components to your app using the cli.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        This action cannot be undone.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="error">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Your session has expired.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="success">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Your changes have been saved.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="info" dismissible>
                      <AlertTitle>Dismissible Alert</AlertTitle>
                      <AlertDescription>
                        Click × to dismiss this alert.
                      </AlertDescription>
                    </Alert>
                  </div>
                </Section>

                <Section title="Progress" description="Progress indicators.">
                  <div className="w-full max-w-md space-y-4">
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Loading... {progress}%
                    </p>
                    <Progress value={40} className="w-full h-2" />
                    <Progress value={80} className="w-full h-3" />
                  </div>
                </Section>

                <Section title="Toast" description="Temporary notifications.">
                  <div className="flex flex-wrap gap-4">
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        toast({
                          title: "Saved!",
                          description: "Your changes have been saved.",
                        })
                      }
                    >
                      Default Toast
                    </Button>
                    <Button
                      variant="outline-destructive"
                      onClick={() =>
                        toast({
                          variant: "destructive",
                          title: "Error!",
                          description: "Something went wrong.",
                        })
                      }
                    >
                      Error Toast
                    </Button>
                    <Button
                      variant="outline-accent"
                      onClick={() =>
                        toast({
                          title: "New message",
                          description: "You have a new message from Alice.",
                        })
                      }
                    >
                      Info Toast
                    </Button>
                  </div>
                </Section>

                <Section
                  title="Empty State"
                  description="Placeholder for empty content."
                >
                  <EmptyState
                    title="No Messages"
                    description="You haven't received any messages yet. Send one to get started."
                    icon={<MessageSquare className="h-12 w-12" />}
                    action={{
                      label: "New Message",
                      onClick: () => toast({ title: "New Message" }),
                    }}
                  />
                </Section>
              </TabsContent>

              {/* ── NAVIGATION ───────────────────────────────────────────── */}
              <TabsContent value="navigation" className="space-y-8">
                <Section title="Breadcrumbs" description="Page hierarchy path.">
                  <Breadcrumbs
                    items={[
                      { label: "Home", href: "#" },
                      { label: "Components", href: "#" },
                      { label: "Breadcrumbs" },
                    ]}
                  />
                </Section>

                <Section title="Pagination" description="Page navigation.">
                  <Pagination
                    currentPage={1}
                    totalPages={10}
                    onPageChange={() => {}}
                  />
                </Section>

                <Section
                  title="Accordion"
                  description="Collapsible content sections."
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-md"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Is it accessible?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Is it styled?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It comes with default styles that match the library
                        aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Is it animated?</AccordionTrigger>
                      <AccordionContent>
                        Yes. It uses smooth spring animations powered by Motion.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Section>
              </TabsContent>

              {/* ── OVERLAYS ─────────────────────────────────────────────── */}
              <TabsContent value="overlays" className="space-y-8">
                <Section title="Dialog" description="Modal window.">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="primary">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <FormField label="Name" htmlFor="dialog-name">
                          <Input id="dialog-name" defaultValue="Pedro Duarte" />
                        </FormField>
                        <FormField label="Email" htmlFor="dialog-email">
                          <Input
                            id="dialog-email"
                            type="email"
                            defaultValue="pedro@example.com"
                          />
                        </FormField>
                      </div>
                      <DialogFooter>
                        <Button type="submit" variant="primary">
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </Section>

                <Section title="Popover" description="Contextual popup.">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-3">
                        <h4 className="font-medium">Dimensions</h4>
                        <p className="text-sm text-muted-foreground">
                          Set the dimensions for the layer.
                        </p>
                        <Input placeholder="Width" inputSize="sm" />
                        <Input placeholder="Height" inputSize="sm" />
                      </div>
                    </PopoverContent>
                  </Popover>
                </Section>

                <Section
                  title="Dropdown Menu"
                  description="Context menu actions."
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
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
                <Section
                  title="Table"
                  description="Data rows with status badges."
                >
                  <div className="border border-border rounded-xl overflow-hidden w-full">
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-25">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>
                            <Badge variant="soft-success">Paid</Badge>
                          </TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV002</TableCell>
                          <TableCell>
                            <Badge variant="soft-warning">Pending</Badge>
                          </TableCell>
                          <TableCell>PayPal</TableCell>
                          <TableCell className="text-right">$150.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV003</TableCell>
                          <TableCell>
                            <Badge variant="soft-error">Unpaid</Badge>
                          </TableCell>
                          <TableCell>Bank Transfer</TableCell>
                          <TableCell className="text-right">$350.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">INV004</TableCell>
                          <TableCell>
                            <Badge variant="soft-primary">Processing</Badge>
                          </TableCell>
                          <TableCell>Wire Transfer</TableCell>
                          <TableCell className="text-right">$890.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </Section>
              </TabsContent>

              {/* ── NEW v1.2.0 ───────────────────────────────────────────── */}
              <TabsContent value="new" className="space-y-8">
                {/* Typography */}
                <Section
                  title="Typography"
                  description="Heading, Text, Code, Lead, and Blockquote components."
                >
                  <div className="flex flex-col gap-6 w-full">
                    <div className="space-y-3">
                      <Heading as="h1" size="4xl">
                        Heading 4XL
                      </Heading>
                      <Heading as="h2" size="3xl">
                        Heading 3XL
                      </Heading>
                      <Heading as="h3" size="2xl">
                        Heading 2XL
                      </Heading>
                      <Heading as="h4" size="xl">
                        Heading XL
                      </Heading>
                      <Heading as="h5" size="lg">
                        Heading LG
                      </Heading>
                    </div>
                    <Divider />
                    <div className="space-y-2">
                      <Heading size="xl" gradient="primary">
                        Gradient Primary
                      </Heading>
                      <Heading size="xl" gradient="accent">
                        Gradient Accent
                      </Heading>
                      <Heading size="xl" gradient="cool">
                        Gradient Cool
                      </Heading>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                      <Lead>
                        This is a Lead paragraph — large intro text used at the
                        top of sections to draw the reader in.
                      </Lead>
                      <Text size="md">
                        Default body text at medium size, normal weight, default
                        foreground color.
                      </Text>
                      <Text size="sm" variant="muted">
                        Muted small text — great for secondary information and
                        captions.
                      </Text>
                      <Text size="sm" variant="primary" weight="semibold">
                        Primary colored semibold text.
                      </Text>
                      <Text size="sm" variant="success">
                        Success colored text.
                      </Text>
                      <Text size="sm" variant="error">
                        Error colored text.
                      </Text>
                    </div>
                    <Divider />
                    <div className="space-y-3">
                      <Text>
                        Inline code: <Code>npm install yems-ui</Code> — use
                        inside prose.
                      </Text>
                      <Code block>{`import { Button } from "yems-ui";

function App() {
  return <Button variant="primary">Hello</Button>;
}`}</Code>
                    </div>
                    <Divider />
                    <Blockquote>
                      Design is not just what it looks like and feels like.
                      Design is how it works. — Steve Jobs
                    </Blockquote>
                  </div>
                </Section>

                {/* Spinner */}
                <Section
                  title="Spinner"
                  description="Loading spinners and overlay."
                >
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <Spinner size="xs" />
                        <Text size="xs" variant="muted">
                          xs
                        </Text>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Spinner size="sm" />
                        <Text size="xs" variant="muted">
                          sm
                        </Text>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Spinner size="md" />
                        <Text size="xs" variant="muted">
                          md
                        </Text>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Spinner size="lg" />
                        <Text size="xs" variant="muted">
                          lg
                        </Text>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <Spinner size="xl" />
                        <Text size="xs" variant="muted">
                          xl
                        </Text>
                      </div>
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
                      <LoadingOverlay
                        loading={overlayLoading}
                        label="Fetching data..."
                      >
                        <Card>
                          <CardContent className="p-6 space-y-3">
                            <Text weight="semibold">Dashboard Widget</Text>
                            <Text size="sm" variant="muted">
                              Click the button to see the loading overlay in
                              action.
                            </Text>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={simulateLoading}
                              isLoading={overlayLoading}
                            >
                              {overlayLoading ? "Loading..." : "Simulate Load"}
                            </Button>
                          </CardContent>
                        </Card>
                      </LoadingOverlay>
                    </div>
                  </div>
                </Section>

                {/* Kbd */}
                <Section
                  title="Keyboard Keys"
                  description="Keyboard shortcut display components."
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Kbd>⌘</Kbd>
                      <Kbd>Ctrl</Kbd>
                      <Kbd>Shift</Kbd>
                      <Kbd>Alt</Kbd>
                      <Kbd>Enter</Kbd>
                      <Kbd>Esc</Kbd>
                      <Kbd>Tab</Kbd>
                      <Kbd>⌫</Kbd>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">
                          Save
                        </Text>
                        <Shortcut keys={["⌘", "S"]} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">
                          Command palette
                        </Text>
                        <Shortcut keys={["⌘", "K"]} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">
                          Find
                        </Text>
                        <Shortcut keys={["Ctrl", "F"]} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" variant="muted">
                          Close
                        </Text>
                        <Shortcut keys={["Ctrl", "Shift", "W"]} size="sm" />
                      </div>
                    </div>
                  </div>
                </Section>

                {/* Avatar Group */}
                <Section
                  title="Avatar Group"
                  description="Overlapping avatar stack with overflow count."
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                      <Text size="sm" variant="muted">
                        Small — tight spacing
                      </Text>
                      <AvatarGroup
                        size="sm"
                        spacing="tight"
                        avatars={[
                          { fallback: "AL" },
                          { fallback: "BO" },
                          { fallback: "CW" },
                          { fallback: "DM" },
                          { fallback: "EK" },
                          { fallback: "FP" },
                        ]}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Text size="sm" variant="muted">
                        Medium — normal spacing (with overflow)
                      </Text>
                      <AvatarGroup
                        size="md"
                        avatars={[
                          {
                            src: "https://github.com/shadcn.png",
                            fallback: "CN",
                            alt: "shadcn",
                          },
                          { fallback: "JD" },
                          { fallback: "SO" },
                          { fallback: "MK" },
                          { fallback: "AL" },
                          { fallback: "BO" },
                          { fallback: "CW" },
                        ]}
                        max={4}
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <Text size="sm" variant="muted">
                        Large — loose spacing
                      </Text>
                      <AvatarGroup
                        size="lg"
                        spacing="loose"
                        avatars={[
                          { fallback: "AL" },
                          { fallback: "BO" },
                          { fallback: "CW" },
                          { fallback: "DM" },
                        ]}
                      />
                    </div>
                  </div>
                </Section>

                {/* Number Input */}
                <Section
                  title="Number Input"
                  description="Increment / decrement input with constraints."
                >
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">
                        Quantity (1–99)
                      </Text>
                      <NumberInput
                        value={qty}
                        onChange={setQty}
                        min={1}
                        max={99}
                      />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">
                        Step by 5
                      </Text>
                      <NumberInput min={0} max={100} step={5} size="sm" />
                    </div>
                    <div className="space-y-2">
                      <Text size="sm" variant="muted">
                        Large with error
                      </Text>
                      <NumberInput
                        min={1}
                        size="lg"
                        error="Value must be at least 1"
                      />
                    </div>
                  </div>
                </Section>

                {/* Layout */}
                <Section
                  title="Layout Primitives"
                  description="Container, Stack, Grid, and Divider."
                >
                  <div className="flex flex-col gap-8 w-full">
                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">
                        Stack — column (gap 4)
                      </Text>
                      <Stack
                        direction="col"
                        gap={4}
                        className="w-full max-w-xs"
                      >
                        {["First", "Second", "Third"].map((l) => (
                          <div
                            key={l}
                            className="glass-card rounded-lg p-3 text-sm text-center"
                          >
                            {l}
                          </div>
                        ))}
                      </Stack>
                    </div>

                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">
                        Stack — row with justify between
                      </Text>
                      <Stack
                        direction="row"
                        gap={4}
                        justify="between"
                        align="center"
                        className="w-full glass-card rounded-xl p-4"
                      >
                        <Text size="sm" weight="semibold">
                          Label
                        </Text>
                        <Badge variant="soft-primary">Value</Badge>
                      </Stack>
                    </div>

                    <div className="space-y-2">
                      <Text size="sm" variant="muted" weight="semibold">
                        Grid — 1 → 2 → 3 cols responsive
                      </Text>
                      <Grid
                        cols={1}
                        mdCols={2}
                        lgCols={3}
                        gap={4}
                        className="w-full"
                      >
                        {[
                          "Alpha",
                          "Beta",
                          "Gamma",
                          "Delta",
                          "Epsilon",
                          "Zeta",
                        ].map((l) => (
                          <div
                            key={l}
                            className="glass-card rounded-lg p-4 text-sm text-center font-medium"
                          >
                            {l}
                          </div>
                        ))}
                      </Grid>
                    </div>

                    <div className="space-y-3 w-full max-w-md">
                      <Text size="sm" variant="muted" weight="semibold">
                        Dividers
                      </Text>
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
            </Tabs>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/95 mt-12 md:mt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 text-center space-y-4">
            <p className="text-muted-foreground text-sm">
              YemsUI v1.2.0 © 2026 • Built with React & Tailwind CSS v4
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/SodiqOgundairo/YemsUI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/yems-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                NPM
              </a>
              <a
                href="https://github.com/SodiqOgundairo/YemsUI#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Documentation
              </a>
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
        <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="p-6 md:p-8 rounded-xl md:rounded-2xl border border-border/40 bg-muted/30 backdrop-blur-sm space-y-6 flex flex-col items-start">
        {children}
      </div>
    </div>
  );
}

export default App;
