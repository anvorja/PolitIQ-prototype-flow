// src/app/actions/page.tsx

"use client"

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {useActionStore} from "@/store/actionsTakenStore";

export default function ActionsPage() {
    const actions = useActionStore(state => state.actions);

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-6">Seguimiento de Acciones</h1>

            <div className="grid gap-4">
                {actions.map(action => (
                    <div
                        key={action.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{action.title}</h3>
                            <span className={`px-2 py-1 rounded text-sm ${
                                action.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                            }`}>
                                {action.priority === 'high' ? 'Alta' :
                                    action.priority === 'medium' ? 'Media' : 'Baja'}
                            </span>
                        </div>

                        <p className="text-gray-600 mb-2">{action.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                            <div>Fecha límite: {format(new Date(action.deadline), 'PPP', { locale: es })}</div>
                            <div>Estado: {action.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}