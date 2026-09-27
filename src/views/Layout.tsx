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

      <link rel="stylesheet" href="/css/app.css" />
      <script src="/js/datepicker.js"></script>
    </head>

    <body class="min-h-screen bg-ink font-serif text-paper antialiased">
      {children}
    </body>
  </html>
);
