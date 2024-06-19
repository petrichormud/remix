import React, { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";

import { cn } from "~/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { LoginForm } from "~/components/login";
import { RegisterForm } from "~/components/register";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

type NavigationProps = {
  pid?: number;
};

export function Navigation({ pid }: NavigationProps) {
  const playerAuthenticated = Boolean(pid && pid > 0);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-[0.5]">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <ClientOnly
          fallback={
            playerAuthenticated ? null : (
              <button
                id="fallback-login-button"
                type="button"
                className={navigationMenuTriggerStyle()}
              >
                Log In
              </button>
            )
          }
        >
          {() => <LoginDialog pid={pid} />}
        </ClientOnly>
        <ClientOnly
          fallback={
            playerAuthenticated ? null : (
              <button
                id="fallback-register-button"
                type="button"
                className={navigationMenuTriggerStyle()}
              >
                Create Account
              </button>
            )
          }
        >
          {() => <RegisterDialog pid={pid} />}
        </ClientOnly>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function loginFormDisabled(username: string, password: string): boolean {
  if (username.length == 0) return true;
  if (password.length == 0) return true;
  return false;
}

type LoginDialogProps = {
  pid?: number;
};

function LoginDialog({ pid }: LoginDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authenticated = Boolean(pid && pid > 0);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {authenticated ? null : (
        <DialogTrigger className={navigationMenuTriggerStyle()}>
          Log In
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Log In</DialogTitle>
          <DialogDescription>
            Please enter your username and password to log in
          </DialogDescription>
        </DialogHeader>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            form="login"
            type="submit"
            disabled={loginFormDisabled(username, password)}
          >
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function registerFormDisabled(
  username: string,
  password: string,
  confirmPassword: string
): boolean {
  if (
    username.length == 0 ||
    password.length == 0 ||
    confirmPassword.length == 0
  )
    return true;
  if (password != confirmPassword) return true;
  return false;
}

function RegisterDialog({ pid }: LoginDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const authenticated = Boolean(pid && pid > 0);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {authenticated ? null : (
        <DialogTrigger className={navigationMenuTriggerStyle()}>
          Create Account
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Please enter a username and password to create an account
          </DialogDescription>
        </DialogHeader>
        <RegisterForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            form="register"
            type="submit"
            disabled={registerFormDisabled(username, password, confirmPassword)}
          >
            Let&apos;s Go!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <span
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </span>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
