// data/TeamMockData.ts

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    department: string;
}

export const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Carolina Rodríguez",
        role: "Director de Comunicaciones",
        email: "carolina.rodriguez@ejemplo.com",
        department: "communications"
    },
    {
        id: "2",
        name: "Andrés Martínez",
        role: "Coordinador de Redes Sociales",
        email: "andres.martinez@ejemplo.com",
        department: "social-media"
    },
    {
        id: "3",
        name: "María Fernanda López",
        role: "Estratega Político",
        email: "mf.lopez@ejemplo.com",
        department: "strategy"
    },
    {
        id: "4",
        name: "Juan Carlos Gómez",
        role: "Asesor Legal",
        email: "jc.gomez@ejemplo.com",
        department: "legal"
    },
    {
        id: "5",
        name: "Patricia Valencia",
        role: "Coordinadora Regional",
        email: "p.valencia@ejemplo.com",
        department: "regional"
    },
    {
        id: "6",
        name: "Ricardo Torres",
        role: "Analista de Datos",
        email: "r.torres@ejemplo.com",
        department: "analytics"
    }
];