VAGAutomatic.co.uk V4.1 navigation hotfix

What changed
- Replaced the plain text mobile Menu control with a compact professional hamburger button.
- Hamburger animates to an X when the menu is open.
- Tightened desktop navigation spacing and shortened the Mechatronic Repairs label to Mechatronics.
- Desktop dropdown navigation remains visible where there is enough room.
- Below 1120px the site switches cleanly to the hamburger menu instead of squeezing the desktop navigation.
- Added cache-busting to /assets/site.css?v=4.1 on every HTML page so browsers and Cloudflare fetch the new navigation CSS immediately.

How to deploy
1. Upload everything inside this folder to the ROOT of the existing GitHub repository.
2. Allow GitHub to replace files with matching paths.
3. Do not delete CNAME, robots.txt or sitemap.xml separately; this package includes the current versions.
4. Wait for GitHub Pages to finish deploying.
5. Refresh the live site. The CSS URL has changed to ?v=4.1 so a normal refresh should fetch the new styles; Ctrl+F5 is still useful if needed.
