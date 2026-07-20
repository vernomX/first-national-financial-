import { TRANSFER_OUTCOME } from './transferConfig';

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

const KEY_PENDING = 'fnf_pending_payments';
const KEY_FAILED = 'fnf_failed_payments';

export function getPendingPayments(): PendingPayment[] {
    // If outcome is set to 'success', clear any previously cached failed payments
    if (TRANSFER_OUTCOME === 'success') {
        try {
            localStorage.removeItem(KEY_FAILED);
            const legacyLocal = localStorage.getItem('fnf_pending_payments');
            if (legacyLocal) {
                const parsed = JSON.parse(legacyLocal);
                if (Array.isArray(parsed)) {
                    const onlyPending = parsed.filter((p: PendingPayment) => p.status === 'Pending');
                    if (onlyPending.length === 0) {
                        localStorage.removeItem('fnf_pending_payments');
                    }
                }
            }
        } catch { /* ignore */ }
    }

    const results: PendingPayment[] = [];

    // 1. Get Pending payments from sessionStorage
    try {
        const rawSession = sessionStorage.getItem(KEY_PENDING);
        if (rawSession) {
            const parsed = JSON.parse(rawSession);
            if (Array.isArray(parsed)) {
                results.push(...parsed.filter((p: PendingPayment) => p.status === 'Pending'));
            }
        }
    } catch { /* ignore */ }

    // 2. Get Failed payments from localStorage if in 'failed' mode
    if (TRANSFER_OUTCOME === 'failed') {
        try {
            const rawLocal = localStorage.getItem(KEY_FAILED);
            if (rawLocal) {
                const parsed = JSON.parse(rawLocal);
                if (Array.isArray(parsed)) {
                    results.push(...parsed.filter((p: PendingPayment) => p.status === 'Failed'));
                }
            }
        } catch { /* ignore */ }

        // Fallback: check legacy KEY for any Failed items
        try {
            const legacyLocal = localStorage.getItem('fnf_pending_payments');
            if (legacyLocal) {
                const parsed = JSON.parse(legacyLocal);
                if (Array.isArray(parsed)) {
                    const failedLegacy = parsed.filter((p: PendingPayment) => p.status === 'Failed');
                    for (const item of failedLegacy) {
                        if (!results.some(r => r.transactionId === item.transactionId)) {
                            results.push(item);
                        }
                    }
                }
            }
        } catch { /* ignore */ }
    }

    return results;
}

export function addPendingPayment(payment: PendingPayment): void {
    try {
        if (payment.status === 'Failed') {
            // Hard-cache in localStorage
            const existingRaw = localStorage.getItem(KEY_FAILED);
            const existing: PendingPayment[] = existingRaw ? JSON.parse(existingRaw) : [];
            if (!existing.some(p => p.transactionId === payment.transactionId)) {
                localStorage.setItem(KEY_FAILED, JSON.stringify([payment, ...existing]));
            }
        } else {
            // Store in sessionStorage (resets on tab close / logout)
            const existingRaw = sessionStorage.getItem(KEY_PENDING);
            const existing: PendingPayment[] = existingRaw ? JSON.parse(existingRaw) : [];
            if (!existing.some(p => p.transactionId === payment.transactionId)) {
                sessionStorage.setItem(KEY_PENDING, JSON.stringify([payment, ...existing]));
            }
        }
    } catch {
        // ignore write failures
    }
}

export function clearPendingPayments(): void {
    try {
        // Clear Pending payments on logout
        sessionStorage.removeItem(KEY_PENDING);

        if (TRANSFER_OUTCOME === 'success') {
            localStorage.removeItem(KEY_FAILED);
            localStorage.removeItem('fnf_pending_payments');
        } else {
            // Migrate any legacy failed payments to KEY_FAILED before clearing legacy KEY
            const legacyLocal = localStorage.getItem('fnf_pending_payments');
            if (legacyLocal) {
                const parsed = JSON.parse(legacyLocal);
                if (Array.isArray(parsed)) {
                    const failedLegacy = parsed.filter((p: PendingPayment) => p.status === 'Failed');
                    if (failedLegacy.length > 0) {
                        const existingFailedRaw = localStorage.getItem(KEY_FAILED);
                        const existingFailed: PendingPayment[] = existingFailedRaw ? JSON.parse(existingFailedRaw) : [];
                        for (const item of failedLegacy) {
                            if (!existingFailed.some(p => p.transactionId === item.transactionId)) {
                                existingFailed.unshift(item);
                            }
                        }
                        localStorage.setItem(KEY_FAILED, JSON.stringify(existingFailed));
                    }
                }
                localStorage.removeItem('fnf_pending_payments');
            }
        }
    } catch {
        // ignore
    }
}
