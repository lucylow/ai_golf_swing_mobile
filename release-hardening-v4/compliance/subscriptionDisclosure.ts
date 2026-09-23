export type SubscriptionDisclosure = {
  title: string;
  priceText: string;
  renewalText: string;
  cancellationText: string;
  restoreLabel: string;
};

export function buildSubscriptionDisclosure(input: {
  localizedPrice: string;
  billingPeriod: 'week' | 'month' | 'year';
}): SubscriptionDisclosure {
  const unit = input.billingPeriod === 'week' ? 'week' : input.billingPeriod === 'month' ? 'month' : 'year';
  return {
    title: 'Golf Swing Coach Premium',
    priceText: input.localizedPrice,
    renewalText: `Automatically renews every ${unit} unless canceled.`,
    cancellationText: 'Manage or cancel subscriptions in your Apple Account settings.',
    restoreLabel: 'Restore purchases',
  };
}
