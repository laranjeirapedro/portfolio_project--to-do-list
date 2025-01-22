import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "My To-Do-List",
  description: "To-Do-List By Pedro Laranjeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
