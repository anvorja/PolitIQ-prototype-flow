// src/store/actionTakenStore.ts
import { create } from 'zustand';
import { ActionTask } from '@/types/alertEvents';

interface ActionStore {
    actions: ActionTask[];
    addAction: (action: ActionTask) => void;
    updateAction: (id: string, action: Partial<ActionTask>) => void;
    getActionsByAlert: (alertId: string) => ActionTask[];
}

export const useActionStore = create<ActionStore>((set, get) => ({
    actions: [],
    addAction: (action) =>
        set((state) => ({
            actions: [...state.actions, action]
        })),
    updateAction: (id, updatedAction) =>
        set((state) => ({
            actions: state.actions.map(action =>
                action.id === id ? { ...action, ...updatedAction } : action
            )
        })),
    getActionsByAlert: (alertId) =>
        get().actions.filter(action => action.alertId === alertId)
}));