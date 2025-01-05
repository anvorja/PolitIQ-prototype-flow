import {
    LayoutDashboard,
    TrendingUp,
    Bell,
    FileText,
    Settings,
    Users,
    MapPin,
    MessageSquare,
    Hash
} from 'lucide-react';
import {NavigationSection} from "@/types/navigation";


export const navigationData: NavigationSection[] = [
    {
        section: "Principal",
        items: [
            {
                title: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard
            },
            {
                title: "Análisis",
                href: "/analytics",
                icon: TrendingUp
            },
            {
                title: "Alertas",
                href: "/alerts",
                icon: Bell
            },
            {
                title: "Reportes",
                href: "/reports",
                icon: FileText
            }
        ]
    },
    {
        section: "Análisis",
        items: [
            {
                title: "Sentimiento",
                href: "/sentiment",
                icon: MessageSquare
            },
            {
                title: "Geografía",
                href: "/geography",
                icon: MapPin
            },
            {
                title: "Influenciadores",
                href: "/influencers",
                icon: Users
            },
            {
                title: "Hashtags",
                href: "/hashtags",
                icon: Hash
            }
        ]
    },
    {
        section: "Sistema",
        items: [
            {
                title: "Configuración",
                href: "/settings",
                icon: Settings
            }
        ]
    }
];