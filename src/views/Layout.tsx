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

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      ></link>

      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        {`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  ink: "#12151A",
                  panel: "#1A1E24",
                  paper: "#ECE7DC",
                  accent: "#C08A3E",
                },
                fontFamily: {
                  serif: ["Newsreader", "serif"],
                  mono: ["IBM Plex Mono", "monospace"],
                },
              },
            },
          };
        `}
      </script>
    </head>

    <body class="min-h-screen bg-ink font-serif text-paper antialiased">
      {children}
    </body>
  </html>
);
