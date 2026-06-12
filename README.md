# DiaOps Website

Marketing website for **DiaOps** — a software company (10+ years of expertise) building
**cloud platforms** and **automation** solutions, including the products **Vision** and **CoreOps**.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, what we do, products, why DiaOps, CTA |
| `products.html` | Vision + CoreOps in detail, roadmap |
| `services.html` | Cloud, automation, DevOps, consulting + delivery process |
| `about.html` | Company story, mission, team, values |
| `careers.html` | **Sales Analyst** & **Business Analyst** openings + application form |
| `contact.html` | Contact info + demo request form |

## Tech
- Plain **HTML** (no build step)
- **Tailwind CSS** via CDN (config inline in each page `<head>`)
- Custom styles: `assets/css/styles.css`
- Vanilla JS: `assets/js/main.js` (nav, mobile menu, scroll reveals, count-up, accordions, mock forms)
- Brand assets: `assets/img/logo-icon.svg`, `assets/img/favicon.svg`

## Run locally
Just open `index.html` in a browser. Or serve the folder:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## Forms — where the data goes
Both forms submit via **FormSubmit.co** (no backend, no signup). Submissions are emailed to:
- **Careers application** (`careers.html`) → `salesperfumeoutlet@gmail.com`
- **Demo / Contact** (`contact.html`) → `salesperfumeoutlet@gmail.com`

Each email arrives as a formatted table; the subject line says which form it came from.

### Activation (one-time, required)
FormSubmit only delivers mail after the destination address is confirmed:
1. Deploy the site (or run the local server below) and submit either form **once**.
2. FormSubmit sends a confirmation email to `salesperfumeoutlet@gmail.com` — click the
   activation link inside it.
3. After that, all submissions arrive in the inbox automatically.

### To change the destination email
Edit the `action="https://formsubmit.co/ajax/EMAIL"` on the `<form>` tag in
`careers.html` and `contact.html`. Tip: to hide the address from page source, replace it
with the random string FormSubmit gives you after activation.

> Note: FormSubmit requires the page to be served over http(s). It may not send from a
> `file://` page — use the local server below or a real host. Until a valid email is set,
> the forms just show the success message without sending.

## Notes
- Brand colors: navy `#14305f`, brand blue `#2f6fb0`, sky `#4aa3df`.
- Mobile navigation is a slide-in **sidebar** (right side) with overlay; closes on
  link click, the ✕ button, clicking the overlay, or pressing `Esc`.
