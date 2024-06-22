import { SiGithub, SiYoutube, SiDiscord } from "@icons-pack/react-simple-icons";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export function Footer() {
  const navigation = {
    solutions: [
      { name: "Connecting", href: "#" },
      { name: "Compendium", href: "#" },
      { name: "Help Files", href: "#" },
    ],
    support: [
      { name: "Report a Bug", href: "#" },
      { name: "Suggest a Feature", href: "#" },
      { name: "Report a Player", href: "#" },
      { name: "Status", href: "#" },
    ],
    company: [
      { name: "About", href: "#" },
      { name: "The Team", href: "#" },
      { name: "Announcements", href: "#" },
      { name: "Changelog", href: "#" },
    ],
    legal: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  };

  return (
    <footer
      className="bg-background border-t border-accent"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  Petrichor
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-sm leading-6 text-muted-foreground"
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  Support
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-sm leading-6 text-muted-foreground"
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  Development
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-sm leading-6 text-muted-foreground"
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  Legal
                </h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Button
                        type="button"
                        variant="link"
                        className="p-0 text-sm leading-6 text-muted-foreground"
                      >
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-primary">
              Subscribe for updates
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600"></p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <Button type="submit">Subscribe</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-accent pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            <SiDiscord className="h-6 w-6 text-muted-foreground hover:text-muted-foreground/90" />
            <SiGithub className="h-6 w-6 text-muted-foreground hover:text-muted-foreground/90" />
            <SiYoutube className="h-6 w-6 text-muted-foreground hover:text-muted-foreground/90" />
          </div>
          <p className="mt-8 text-xs leading-5 text-muted-foreground md:order-1 md:mt-0">
            &copy; 2023 Alec DuBois. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
