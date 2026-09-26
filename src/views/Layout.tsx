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
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-100 text-gray-800">{children}</body>
  </html>
);
