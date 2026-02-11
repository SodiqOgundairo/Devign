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

  // Apply theme to html element
  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen w-full bg-background text-foreground p-4 md:p-8 font-sans transition-colors duration-300`}
      >
        {/* Header */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
              YemsUI Design System
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Glassmorphism-based UI kit for modern applications. Featuring
              liquid glass effects, micro-interactions, and accessible
              primitives.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="primary"
              onClick={() =>
                window.open("https://github.com/yems-ui", "_blank")
              }
              leftIcon={<Globe className="h-4 w-4" />}
            >
              GitHub
            </Button>
          </div>
        </header>

        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="w-full justify-start overflow-x-auto p-1.5 h-auto gap-1 bg-glass border border-glass-border no-scrollbar">
            <TabsTrigger value="general" className="px-4 py-2">
              General
            </TabsTrigger>
            <TabsTrigger value="forms" className="px-4 py-2">
              Forms
            </TabsTrigger>
            <TabsTrigger value="feedback" className="px-4 py-2">
              Feedback
            </TabsTrigger>
            <TabsTrigger value="navigation" className="px-4 py-2">
              Navigation
            </TabsTrigger>
            <TabsTrigger value="overlays" className="px-4 py-2">
              Overlays
            </TabsTrigger>
            <TabsTrigger value="data" className="px-4 py-2">
              Data Display
            </TabsTrigger>
          </TabsList>

          {/* GENERAL TAB */}
          <TabsContent
            value="general"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Buttons */}
            <Section
              title="Buttons"
              description="Primary action elements with various styles and micro-interactions."
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
                <Separator />
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="outline-primary">Outline Primary</Button>
                  <Button variant="outline-secondary">Outline Secondary</Button>
                  <Button variant="outline-accent">Outline Accent</Button>
                  <Button variant="outline-ember">Outline Ember</Button>
                  <Button variant="ghost-primary">Ghost Primary</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<Mail className="h-4 w-4" />}
                  >
                    With Icon
                  </Button>
                </div>
              </div>
            </Section>

            {/* Badges */}
            <Section
              title="Badges"
              description="Status indicators and labels for metadata."
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
                <div className="flex flex-wrap gap-4">
                  <Badge variant="soft-primary">Soft Primary</Badge>
                  <Badge variant="soft-success">Soft Success</Badge>
                  <Badge variant="outline-accent">Outline Accent</Badge>
                  <Badge variant="primary" dot>
                    With Dot
                  </Badge>
                  <StatusBadge status="active" />
                  <StatusBadge status="pending" />
                  <StatusBadge status="error" />
                </div>
              </div>
            </Section>

            {/* Cards */}
            <Section
              title="Cards"
              description="Content containers with glass effect."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                    <CardDescription>
                      This is a basic glass card.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Content goes here. The background has a blur effect.</p>
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
                    <p>This card has a hover animation and lift effect.</p>
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

            {/* Avatars */}
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

            {/* Skeleton */}
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
            <Section title="Tabs" description="Tabbed content sections.">
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>
                        Make changes to your account here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-sm font-medium">
                          Name
                        </label>
                        <Input id="name" defaultValue="Pedro Duarte" />
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="username"
                          className="text-sm font-medium"
                        >
                          Username
                        </label>
                        <Input id="username" defaultValue="@peduarte" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="primary">Save changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <label
                          htmlFor="current"
                          className="text-sm font-medium"
                        >
                          Current password
                        </label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="new" className="text-sm font-medium">
                          New password
                        </label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="primary">Save password</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </Section>
          </TabsContent>

          {/* FORMS TAB */}
          <TabsContent
            value="forms"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
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
                  placeholder="With Addon"
                  leftAddon={
                    <span className="text-muted-foreground text-sm">
                      https://
                    </span>
                  }
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
                <Input placeholder="Small Input" inputSize="sm" />
                <Input placeholder="Large Input" inputSize="lg" />
                <Input
                  placeholder="Right Icon"
                  rightIcon={<Check className="h-4 w-4" />}
                />
                <Input
                  placeholder="Right Addon"
                  rightAddon={
                    <span className="text-muted-foreground text-sm">.com</span>
                  }
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
                    onCheckedChange={(c) => setCheckboxChecked(c as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
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
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Airplane Mode
                  </label>
                </div>

                <RadioGroup value={radioValue} onValueChange={setRadioValue}>
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

          {/* FEEDBACK TAB */}
          <TabsContent
            value="feedback"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
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
                  onClick={() => {
                    toast({
                      title: "Scheduled: Catch up",
                      description: "Friday, February 10, 2023 at 5:57 PM",
                    });
                  }}
                >
                  Show Toast
                </Button>
                <Button
                  variant="outline-destructive"
                  onClick={() => {
                    toast({
                      variant: "destructive",
                      title: "Uh oh! Something went wrong.",
                      description: "There was a problem with your request.",
                    });
                  }}
                >
                  Show Destructive Toast
                </Button>
              </div>
            </Section>

            <Section title="Tooltip" description="Hover information.">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to library</p>
                </TooltipContent>
              </Tooltip>
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

          {/* NAVIGATION TAB */}
          <TabsContent
            value="navigation"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
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
              <Accordion type="single" collapsible className="w-full max-w-md">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components' aesthetic.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Section>
          </TabsContent>

          {/* OVERLAYS TAB */}
          <TabsContent
            value="overlays"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <Section title="Dialog" description="Modal window.">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="primary">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
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
                      <h4 className="font-medium leading-none">Dimensions</h4>
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

          {/* DATA DISPLAY TAB */}
          <TabsContent
            value="data"
            className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <Section title="Table" description="Data rows.">
              <div className="border border-border rounded-xl overflow-hidden glass-card">
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
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

// Helper for sections
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
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-foreground/90">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="p-6 md:p-8 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-glass gap-6 flex flex-wrap items-start">
        {children}
      </div>
    </div>
  );
}

export default App;
