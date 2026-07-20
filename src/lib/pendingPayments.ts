// Shared store for "pending" payments so they persist across refresh.
// Used by the transfer flow (write) and the Dashboard (read).
// localStorage works when running locally (npm run dev / local network),
// which is how the app is filmed.

export interface PendingPayment {
    id: string;
    date: string;        // e.g. "Jul 16, 2026"
    description: string; // e.g. "Transfer to Chase"
    category: string;    // e.g. "Transfer"
    amount: string;      // e.g. "-$500.00"
    type: 'debit' | 'credit';
    status: 'Pending' | 'Failed';
    transactionId: string;
}

const KEY = 'fnf_pending_payments';

export function getPendingPayments(): PendingPayment[] {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function addPendingPayment(payment: PendingPayment): void {
    try {
        const existing = getPendingPayments();
        // avoid duplicates if the scheduled page re-renders
        if (existing.some(p => p.transactionId === payment.transactionId)) return;
        localStorage.setItem(KEY, JSON.stringify([payment, ...existing]));
    } catch {
        // ignore write failures — non-critical
    }
}

export function clearPendingPayments(): void {
    try {
        localStorage.removeItem(KEY);
    } catch {
        // ignore
    }
}
