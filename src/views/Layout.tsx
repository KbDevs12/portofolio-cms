import { Html } from "@elysiajs/html";

export const Layout = ({
  children,
  title,
}: {
  children: JSX.Element | JSX.Element[] | string;
  title: string;
}) => (
  <html lang="id">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} | CMS Portofolio</title>

      {/* <link rel="stylesheet" href="/css/app.css" />
      <script src="/js/datepicker.js"></script>
      <script src="/js/char-counter.js"></script> */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/KbDevs12/portofolio-cms@main/public/css/app.css"
      />

      <script src="https://cdn.jsdelivr.net/gh/KbDevs12/portofolio-cms@main/public/js/datepicker.js"></script>

      <script src="https://cdn.jsdelivr.net/gh/KbDevs12/portofolio-cms@main/public/js/char-counter.js"></script>
    </head>

    <body class="min-h-screen bg-ink font-serif text-paper antialiased">
      {children}
    </body>
    <script>
      {`
    document.addEventListener("click", (event) => {
    const details = event.target.closest("details");

    document.querySelectorAll("details[open]").forEach((item) => {
      if (item !== details) {
        item.removeAttribute("open");
      }
    });
  });`}
    </script>
  </html>
);
