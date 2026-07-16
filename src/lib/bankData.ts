export interface Bank {
  name: string;
  routingNumber: string;
  logoUrl?: string;
}

export const banks: Bank[] = [
  // Major US Banks
  { name: 'Chase Bank', routingNumber: '021000021', logoUrl: 'https://www.google.com/s2/favicons?domain=chase.com&sz=32' },
  { name: 'Bank of America', routingNumber: '026009593', logoUrl: 'https://www.google.com/s2/favicons?domain=bankofamerica.com&sz=32' },
  { name: 'Wells Fargo', routingNumber: '121000248', logoUrl: 'https://www.google.com/s2/favicons?domain=wellsfargo.com&sz=32' },
  { name: 'Citibank', routingNumber: '321171184', logoUrl: 'https://www.google.com/s2/favicons?domain=citi.com&sz=32' },
  { name: 'U.S. Bank', routingNumber: '123103729', logoUrl: 'https://www.google.com/s2/favicons?domain=usbank.com&sz=32' },
  { name: 'PNC Bank', routingNumber: '043000096', logoUrl: 'https://www.google.com/s2/favicons?domain=pnc.com&sz=32' },
  { name: 'Truist Bank', routingNumber: '061000104', logoUrl: 'https://www.google.com/s2/favicons?domain=truist.com&sz=32' },
  { name: 'TD Bank', routingNumber: '031101266', logoUrl: 'https://www.google.com/s2/favicons?domain=td.com&sz=32' },
  { name: 'Capital One', routingNumber: '056073502', logoUrl: 'https://www.google.com/s2/favicons?domain=capitalone.com&sz=32' },
  { name: 'HSBC Bank USA', routingNumber: '021001088', logoUrl: 'https://www.google.com/s2/favicons?domain=us.hsbc.com&sz=32' },

  // Popular Credit Unions
  { name: 'Navy Federal Credit Union', routingNumber: '256074974', logoUrl: 'https://www.google.com/s2/favicons?domain=navyfederal.org&sz=32' },
  { name: 'BECU', routingNumber: '325081403', logoUrl: 'https://www.google.com/s2/favicons?domain=becu.org&sz=32' },
  { name: 'Alliant Credit Union', routingNumber: '271081528', logoUrl: 'https://www.google.com/s2/favicons?domain=alliantcreditunion.org&sz=32' },
  { name: 'PenFed Credit Union', routingNumber: '256078446', logoUrl: 'https://www.google.com/s2/favicons?domain=penfed.org&sz=32' },
  { name: 'State Employees Credit Union', routingNumber: '253177049', logoUrl: 'https://www.google.com/s2/favicons?domain=ncsecu.org&sz=32' },
  { name: 'USAA', routingNumber: '314074269', logoUrl: 'https://www.google.com/s2/favicons?domain=usaa.com&sz=32' },

  // Digital Banks & Fintech
  { name: 'Chime', routingNumber: '031101279', logoUrl: 'https://www.google.com/s2/favicons?domain=chime.com&sz=32' },
  { name: 'Cash App', routingNumber: '084009519', logoUrl: 'https://www.google.com/s2/favicons?domain=cash.app&sz=32' },
  { name: 'Varo Bank', routingNumber: '124303120', logoUrl: 'https://www.google.com/s2/favicons?domain=varomoney.com&sz=32' },
  { name: 'Ally Bank', routingNumber: '124003116', logoUrl: 'https://www.google.com/s2/favicons?domain=ally.com&sz=32' },
  { name: 'Discover Bank', routingNumber: '031100649', logoUrl: 'https://www.google.com/s2/favicons?domain=discover.com&sz=32' },
  { name: 'Sofi Bank', routingNumber: '031101033', logoUrl: 'https://www.google.com/s2/favicons?domain=sofi.com&sz=32' },
  { name: 'Revolut', routingNumber: '044111191', logoUrl: 'https://www.google.com/s2/favicons?domain=revolut.com&sz=32' },
  { name: 'Wise', routingNumber: '084106768', logoUrl: 'https://www.google.com/s2/favicons?domain=wise.com&sz=32' },
  { name: 'PayPal', routingNumber: '114924742', logoUrl: 'https://www.google.com/s2/favicons?domain=paypal.com&sz=32' },
  { name: 'Venmo', routingNumber: '084009519', logoUrl: 'https://www.google.com/s2/favicons?domain=venmo.com&sz=32' },
  { name: 'Zelle', routingNumber: '084009520', logoUrl: 'https://www.google.com/s2/favicons?domain=zellepay.com&sz=32' },
  { name: 'Apple Pay', routingNumber: '084009521', logoUrl: 'https://www.google.com/s2/favicons?domain=apple.com&sz=32' },
  { name: 'Google Pay', routingNumber: '084009522', logoUrl: 'https://www.google.com/s2/favicons?domain=pay.google.com&sz=32' },
  { name: 'Robinhood', routingNumber: '084009523', logoUrl: 'https://www.google.com/s2/favicons?domain=robinhood.com&sz=32' },
  { name: 'Square', routingNumber: '084009524', logoUrl: 'https://www.google.com/s2/favicons?domain=squareup.com&sz=32' },
  { name: 'Stripe', routingNumber: '084009525', logoUrl: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=32' },
  { name: 'Amazon Pay', routingNumber: '084009526', logoUrl: 'https://www.google.com/s2/favicons?domain=pay.amazon.com&sz=32' },
  { name: 'Western Union', routingNumber: '084009527', logoUrl: 'https://www.google.com/s2/favicons?domain=westernunion.com&sz=32' },
  { name: 'MoneyGram', routingNumber: '084009528', logoUrl: 'https://www.google.com/s2/favicons?domain=moneygram.com&sz=32' }
];

export function findBanks(query: string): Bank[] {
  if (!query.trim()) return [];
  const searchTerm = query.toLowerCase();
  return banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm) ||
    bank.routingNumber.includes(searchTerm)
  );
}
