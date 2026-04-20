import { HSCode, Procedure, Circular } from './types';

export const mockHSCodes: HSCode[] = [
  { 
    code: '0101.21.00', 
    description: 'Pure-bred breeding animals (Horses)', 
    duty_rate: '0%', 
    sales_tax: 'Exempt',
    common_uses: ['Livestock breeding', 'Equestrian sports', 'Agricultural development'],
    regulations: ['Customs Act 1967 Section 10', 'Veterinary Inspection Certificate required', 'MAQIS Import Permit'],
    related_circulars: ['JKDM Circular 5/2023 - Import of Live Animals', 'Treasury Order 2024 - SST Exemptions']
  },
  { 
    code: '0201.10.00', 
    description: 'Carcasses and half-carcasses of bovine animals, fresh or chilled', 
    duty_rate: '0%', 
    sales_tax: 'Exempt',
    common_uses: ['Food processing', 'Retail butchery', 'Institutional catering'],
    regulations: ['Halal Certification by JAKIM', 'Health Certificate from country of origin', 'MAQIS Import Clearance'],
    related_circulars: ['Circular 12/2024 - Meat Importation Protocols', 'Circular 3/2022 - Halal Authentication at Borders']
  },
  { 
    code: '2203.00.10', 
    description: 'Beer made from malt', 
    duty_rate: 'RM 175.00/hl', 
    sales_tax: '10%',
    common_uses: ['Beverage industry', 'Hospitality', 'Retail'],
    regulations: ['Excise Act 1976', 'Liquor License required', 'Customs (Prohibition of Imports) Order 2023'],
    related_circulars: ['Excise Circular 1/2024 - Revised Alcohol Duties', 'JKDM Notice 44 - Physical Sealing requirements']
  },
  { 
    code: '8471.30.20', 
    description: 'Laptops, including notebooks and subnotebooks', 
    duty_rate: '0%', 
    sales_tax: '5%',
    common_uses: ['Personal computing', 'Business operations', 'Education'],
    regulations: ['SIRIM Type Approval (for Wi-Fi/Bluetooth)', 'MCMC Certification', 'Customs Act 1967 Schedule 1'],
    related_circulars: ['Circular 8/2023 - Electronic Gadget Valuation', 'Notice 15/2024 - SIRIM Exemption list update']
  },
  { 
    code: '8703.23.66', 
    description: 'Motor cars (including station wagons), engine capacity > 1,500 cc but <= 2,000 cc', 
    duty_rate: '75%', 
    sales_tax: '10%',
    common_uses: ['Private transportation', 'Commercial fleet', 'Vehicle assembly'],
    regulations: ['Approved Permit (AP) from Ministry of International Trade', 'Customs (Valuation) Rules 1999', 'Road Transport Act 1987'],
    related_circulars: ['Vehicle Valuation Circular 10/2024', 'SST Guide for Automotive Sector v3.0']
  },
];

export const mockProcedures: Procedure[] = [
  {
    id: 'imp-01',
    title: 'Standard Import Clearance',
    category: 'Import',
    steps: [
      'Submission of Customs Form No. 1 (K1)',
      'Verification of HS Code and Valuation',
      'Assessment of Customs Duty and Taxes',
      'Payment of Duty/Tax via e-Payment or Bank',
      'Release of Goods from Custom Control'
    ],
    documents: ['Bill of Lading / Airway Bill', 'Commercial Invoice', 'Packing List', 'Import License (if applicable)'],
    legal_reference: 'Customs Act 1967 Section 78',
    estimated_time: '2 - 4 hours'
  },
  {
    id: 'exp-01',
    title: 'Export Control Procedure',
    category: 'Export',
    steps: [
      'Submission of Customs Form No. 2 (K2)',
      'Checking of Export Permit for Restricted Goods',
      'Physical inspection by AKPS (if required)',
      'Sealing of Container by Customs',
      'Final Clearance and Export Approval'
    ],
    documents: ['Invoice', 'Packing List', 'Export Permit', 'K2 Declaration Form'],
    legal_reference: 'Customs Act 1967 Section 80',
    estimated_time: '1 - 2 hours'
  },
  {
    id: 'tr-01',
    title: 'Transit Movement Protocol',
    category: 'Transit',
    steps: [
      'Submission of K8 Form for Transhipment',
      'Affixing of Customs Seal on Vehicle/Container',
      'Issuance of Movement Permit (K8A)',
      'Arrival confirmation at Exit Point'
    ],
    documents: ['K8 Form', 'Transport Consignment Note', 'Transit Manifest'],
    legal_reference: 'Customs Act 1967 Section 22',
    estimated_time: '3 hours'
  },
  {
    id: 'wh-01',
    title: 'LMW Entrance Procedure',
    category: 'Warehouse',
    steps: [
      'Declaration of ZB1 form',
      'Verification of LMW License validity',
      'Physical examination of inventory by AKPS',
      'Digital ledger update by Customs'
    ],
    documents: ['ZB1 Form', 'LMW License Copy', 'Delivery Order'],
    legal_reference: 'Customs Act 1967 Section 65A',
    estimated_time: '4 hours'
  }
];

export const mockCirculars: Circular[] = [
  {
    id: 'circ-03',
    title: 'New Border Protocol: AKPS Physical Examination',
    date: '2026-04-15',
    tags: ['Operational', 'AKPS'],
    summary: 'Effective immediately, all physical border examinations and checking of cargo are now handled by the Malaysia Border Control and Protection Agency (AKPS). JKDM remains responsible for valuation, classification, and tax collection.'
  },
  {
    id: 'circ-01',
    title: 'Implementation of e-Customs v2.0',
    date: '2026-04-10',
    tags: ['Tech', 'System Update'],
    summary: 'Updates on the modularization of the e-Customs declaration system for faster processing.'
  },
  {
    id: 'circ-02',
    title: 'Revised Duty Rates for Luxury Electronic Goods',
    date: '2026-03-25',
    tags: ['Duty', 'Electronics'],
    summary: 'New duty structures for high-end consumer electronics effective immediately.'
  }
];
