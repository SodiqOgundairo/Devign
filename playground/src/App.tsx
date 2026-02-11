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
} from "@yems-ui/core";
import {
  Bell,
  Calendar,
  Check,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Layout,
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

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen w-full bg-background text-foreground transition-colors duration-300 flex flex-col`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  YemsUI
                </h1>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                  v1.1.1
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
              <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 sticky top-[88px] z-40 bg-background/95 backdrop-blur-lg pb-4 border-b border-border/50">
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
                </TabsList>
              </div>

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
                  </div>
                </Section>

                <Section
                  title="Badges"
                  description="Status indicators and labels."
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="accent">Accent</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
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
                        <p>Content goes here with blur effect.</p>
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
                        <p>This card has hover animation.</p>
                      </CardContent>
                    </Card>

                    <StatCard
                      title="Total Revenue"
                      value="$45,231.89"
                      trend={{ value: 20.1, isPositive: true }}
                      icon={<CreditCard className="h-4 w-4" />}
                    />
                  </div>
                </Section>

                <Section title="Avatars" description="User profile images.">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                </Section>

                <Section title="Skeletons" description="Loading states.">
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                    <SkeletonCard />
                  </div>
                </Section>
              </TabsContent>

              <TabsContent value="forms" className="space-y-8">
                <Section title="Inputs" description="Data entry fields.">
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
                  </div>
                </Section>

                <Section
                  title="Selection Controls"
                  description="Checkboxes, Radios, and Switches."
                >
                  <div className="flex flex-col gap-8">
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
                        Airplane Mode
                      </label>
                    </div>
                    <RadioGroup
                      value={radioValue}
                      onValueChange={setRadioValue}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="r1" />
                        <label htmlFor="r1">Default</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="r2" />
                        <label htmlFor="r2">Comfortable</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option3" id="r3" />
                        <label htmlFor="r3">Compact</label>
                      </div>
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
              </TabsContent>

              <TabsContent value="feedback" className="space-y-8">
                <Section title="Alerts" description="Important messages.">
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
                        Your session has expired. Please log in again.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="success">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Your changes have been saved successfully.
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
                  </div>
                </Section>

                <Section title="Toast" description="Temporary notifications.">
                  <div className="flex gap-4">
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        toast({
                          title: "Scheduled: Catch up",
                          description: "Friday, February 10, 2023 at 5:57 PM",
                        })
                      }
                    >
                      Show Toast
                    </Button>
                    <Button
                      variant="outline-destructive"
                      onClick={() =>
                        toast({
                          variant: "destructive",
                          title: "Uh oh! Something went wrong.",
                          description: "There was a problem with your request.",
                        })
                      }
                    >
                      Show Destructive Toast
                    </Button>
                  </div>
                </Section>

                <Section
                  title="Empty State"
                  description="Placeholder for empty content."
                >
                  <EmptyState
                    title="No Messages"
                    description="You haven't received any messages yet."
                    icon={<MessageSquare className="h-12 w-12" />}
                    action={{
                      label: "New Message",
                      onClick: () => toast({ title: "New Message Clicked" }),
                    }}
                  />
                </Section>
              </TabsContent>

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
                        Yes. It comes with default styles that match other
                        components' aesthetic.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Section>
              </TabsContent>

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
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label
                            htmlFor="name"
                            className="text-right text-sm font-medium"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
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
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">
                            Dimensions
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </Section>

                <Section title="Dropdown Menu" description="Menu actions.">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open Menu</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Section>
              </TabsContent>

              <TabsContent value="data" className="space-y-8">
                <Section title="Table" description="Data rows.">
                  <div className="border border-border rounded-xl overflow-hidden w-full">
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
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
                      </TableBody>
                    </Table>
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
              YemsUI © 2026 • Built with React & Tailwind CSS
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
