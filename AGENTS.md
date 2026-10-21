<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the external booking destination in a shared browser-safe module so every appointment and demo link stays consistent.
- Keep additional website copy localized for all supported languages in a shared copy module.
- Use a root-level pathname effect for page-top navigation so all content pages share the same behavior.

- Compose the home search and supporting sections from dedicated components; local directory search covers identity, specialty, and hospital while live appointment availability belongs to the external booking portal.
- Keep /book as a public portal handoff page so old internal links continue to work without creating appointments locally.
- Retain TanStack Start and prerender an explicit list of public content pages; explicit npm builds always flatten browser output into dist and copy the generated homepage to project-root index.html for inspection, even with inherited sandbox flags. Managed non-npm Lovable builds retain server/client output so hosted contact submissions and publishing continue to work. The root HTML is not a Vite SPA bootstrap or the upload destination.
