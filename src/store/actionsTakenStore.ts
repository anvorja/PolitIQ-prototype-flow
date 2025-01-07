// src/store/actionsTakenStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActionTask } from '@/types/alertEvents';
import { Alert } from '@/types/alerts';
import { mockActions } from '@/data/ActionsMockData';
import { alertGroups } from '@/data/AlertsMockData';

interface ActionStore {
    // Estado
    actions: ActionTask[];
    alerts: Record<string, Alert>;
    useMockData: boolean;

    // Getters
    getCurrentActions: () => ActionTask[];
    getCurrentAlerts: () => Record<string, Alert>;
    getActionsByAlert: (alertId: string) => ActionTask[];

    // Acciones para datos reales
    addAction: (action: ActionTask) => void;
    updateAction: (id: string, action: Partial<ActionTask>) => void;
    deleteAction: (id: string) => void;
    setAlertInfo: (alertId: string, alert: Alert) => void;

    // Control de datos mock
    toggleDataSource: () => void;
    initializeStore: () => void;
    clearRealData: () => void;
}

// Función auxiliar para crear el mapa de alertas
const createAlertsMapFromGroups = () => {
    const alertsMap: Record<string, Alert> = {};
    alertGroups.forEach(group => {
        group.alerts.forEach(alert => {
            alertsMap[alert.id] = alert;
        });
    });
    return alertsMap;
};

export const useActionStore = create<ActionStore>()(
    persist(
        (set, get) => ({
            // Estado inicial
            actions: [],
            alerts: {},
            useMockData: true,

            // Getters
            getCurrentActions: () => {
                return get().useMockData ? mockActions : get().actions;
            },

            getCurrentAlerts: () => {
                return get().useMockData ? createAlertsMapFromGroups() : get().alerts;
            },

            getActionsByAlert: (alertId: string) => {
                const currentActions = get().getCurrentActions();
                return currentActions.filter(action => action.alertId === alertId);
            },

            // Acciones para datos reales
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

            deleteAction: (id) =>
                set((state) => ({
                    actions: state.actions.filter(action => action.id !== id)
                })),

            setAlertInfo: (alertId, alert) =>
                set((state) => ({
                    alerts: {
                        ...state.alerts,
                        [alertId]: alert
                    }
                })),

            // Control de datos mock
            toggleDataSource: () =>
                set((state) => ({
                    useMockData: !state.useMockData
                })),

            initializeStore: () => {
                const state = get();
                if (state.useMockData && state.actions.length === 0) {
                    set({
                        actions: mockActions,
                        alerts: createAlertsMapFromGroups()
                    });
                }
            },

            clearRealData: () =>
                set(() => ({
                    actions: [],
                    alerts: {}
                }))
        }),
        {
            name: 'actions-storage',
            partialize: (state) => ({
                actions: state.actions,
                alerts: state.alerts,
                useMockData: state.useMockData
            })
        }
    )
);