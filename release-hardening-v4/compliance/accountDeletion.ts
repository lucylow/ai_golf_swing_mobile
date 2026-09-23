export type AccountDeletionResult = {
  accepted: boolean;
  scheduledAt?: string;
  serverReference?: string;
};

export type AccountDeletionDependencies = {
  deleteAccount: () => Promise<AccountDeletionResult>;
  revokeAppleToken?: () => Promise<void>;
  clearLocalData: () => Promise<void>;
  onSignedOut: () => void;
};

export async function requestAccountDeletion(deps: AccountDeletionDependencies): Promise<AccountDeletionResult> {
  const result = await deps.deleteAccount();
  if (result.accepted) {
    if (deps.revokeAppleToken) await deps.revokeAppleToken();
    await deps.clearLocalData();
    deps.onSignedOut();
  }
  return result;
}
