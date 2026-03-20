import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/src/components/header";
import { Footer } from "@/src/components/footer";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "STEM IME",
  description: "Iniciativa estudantil STEM do Instituto Militar de Engenharia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.className} min-h-screen bg-white text-black antialiased`}>
        <div className="flex min-h-screen flex-col">
          <TopBar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}