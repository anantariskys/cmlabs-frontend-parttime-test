export function AppFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto flex w-full flex-col gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-medium text-foreground">CulinaryArchitect</p>
          <p className="mt-1 max-w-md leading-5">
            Explore ingredients, browse recipes, and inspect meal details with a
            curated interface.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Support</span>
        </div>
      </div>
    </footer>
  );
}
