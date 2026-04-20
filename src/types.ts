export interface HSCode {
  code: string;
  description: string;
  duty_rate: string;
  sales_tax: string;
  common_uses?: string[];
  regulations?: string[];
  related_circulars?: string[];
}

export interface Procedure {
  id: string;
  title: string;
  category: 'Import' | 'Export' | 'Transit' | 'Warehouse' | 'General';
  steps: string[];
  documents: string[];
  legal_reference?: string;
  estimated_time?: string;
}

export interface Circular {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface TradeAgreement {
  id: string;
  name: string;
  acronym: string;
  type: 'Regional' | 'Bilateral';
  member_countries: string[];
  description: string;
  status: 'In Force' | 'Signed' | 'Under Negotiation';
  key_benefits: string[];
  pdf_url: string;
}
