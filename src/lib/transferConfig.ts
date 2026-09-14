// ============================================================
//  TRANSFER OUTCOME SWITCH
// ============================================================
//  Change the value below, save, and push to git.
//
//    'success'  ->  transfer ends on the PAYMENT SCHEDULED page
//                   and appears in Recent Activity as "Pending"
//
//    'failed'   ->  transfer ends on the TRANSFER FAILED page
//                   and appears in Recent Activity as "Failed"
//
//  Nothing else needs to change. The processing animation runs
//  the same either way.
// ============================================================

export type TransferOutcome = 'success' | 'failed';

export const TRANSFER_OUTCOME: TransferOutcome = 'failed';
