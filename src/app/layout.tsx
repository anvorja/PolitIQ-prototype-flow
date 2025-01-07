// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import React from "react";
// import { Sidebar } from "@/components/shared/Sidebar";
// import { Header } from "@/components/shared/Header";
// import { Toaster } from "@/components/ui/toaster";
//
// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });
//
// export const metadata: Metadata = {
//     title: "PolitIQ",
//     description: "Inteligencia política",
//     icons: {
//         icon: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png"
//     }
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="es">
//         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <div className="flex h-screen">
//             <Sidebar />
//             <div className="flex-1 flex flex-col bg-purple-50/50">
//                 <Header />
//                 <main className="flex-1 p-6 overflow-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//         <Toaster/>
//         </body>
//         </html>
//     );
// }

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import React from "react";
// import { Sidebar } from "@/components/shared/Sidebar";
// import { Header } from "@/components/shared/Header";
// import { Toaster } from "@/components/ui/toaster";
// import { ThemeFavicon } from "@/components/ThemeFavicon";
//
// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });
//
// export const metadata: Metadata = {
//     title: "PolitIQ",
//     description: "Inteligencia política",
//     icons: {
//         icon: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png"
//     }
// };
//
// export default function RootLayout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="es">
//         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <ThemeFavicon /> {/* Añade el componente aquí */}
//         <div className="flex h-screen">
//             <Sidebar />
//             <div className="flex-1 flex flex-col bg-purple-50/50">
//                 <Header />
//                 <main className="flex-1 p-6 overflow-auto">
//                     {children}
//                 </main>
//             </div>
//         </div>
//         <Toaster/>
//         </body>
//         </html>
//     );
// }

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeFavicon } from "@/components/ThemeFavicon";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "PolitIQ",
    description: "Inteligencia política",
    icons: {
        icon: "https://res.cloudinary.com/dv2xu8dwr/image/upload/v1736252278/analitica-de-datos-black_osqvyo.png"
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ThemeFavicon />
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col bg-purple-50/50 dark:bg-neutral-900/95">
                    <Header />
                    <main className="flex-1 p-6 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}

// sugerencias modo oscuro
// dark:bg-neutral-900/95
// dark:bg-gray-900/90
// dark:bg-slate-900/95
// dark:bg-zinc-900/95
