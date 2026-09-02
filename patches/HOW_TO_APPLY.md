# Applying the officebudgetcalculator.com updates

This bundle contains 7 commits on top of the current `origin/main`
(`6d112d8` "Externalize homepage stylesheet"). Apply it from a machine/terminal
that already has push access to `EasySpaces/officebudgetcalculator.com`.

## Option A — you already have a local clone of the repo

```bash
cd /path/to/your/local/officebudgetcalculator.com
git checkout main
git pull                     # make sure you're up to date with origin/main first
git pull /path/to/officebudgetcalculator-updates.bundle main
git push origin main
```

## Option B — you don't have a local clone yet

```bash
git clone https://github.com/EasySpaces/officebudgetcalculator.com.git
cd officebudgetcalculator.com
git pull /path/to/officebudgetcalculator-updates.bundle main
git push origin main
```

`git pull` on a bundle file works exactly like pulling from a remote — it
fetches the 7 commits and merges (in this case fast-forwards) your local
`main` onto them. If it complains about the ref not being found, use this
instead:

```bash
git fetch /path/to/officebudgetcalculator-updates.bundle main:incoming
git merge incoming
git push origin main
```

## What's in it (7 commits)

1. Fix office furniture calculator math to match verified interioravenue.net formula
2. Reconcile marketing copy with the corrected furniture calculator formula
3. Fix arithmetic error in the Phoenix case study ($47,000 -> $28,400)
4. Swap mailto forms for Calendly, fix canonical hostname, de-bloat inline images
5. Add favicon PNG and Apple touch icon assets
6. Add Privacy Policy and Terms & Disclaimer pages
7. Redirect broken indexed URLs instead of 404ing

Once pushed, GitHub Pages will redeploy automatically (same as any other
push to `main`).
