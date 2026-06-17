import React, { useState } from 'react';
import { Badge } from '../components/core/Badge';
import { Button } from '../components/core/Button';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { StatCard } from '../components/data/StatCard';
import { AiInsight } from '../components/data/AiInsight';
import { Tabs } from '../components/navigation/Tabs';

const products = [
  { id: 1, sku: 'CRM-ENT-001', name: 'Enterprise CRM License', category: 'Software', stock: 120, sold: 48, price: 1200, status: 'Active', revenue: 57600 },
  { id: 2, sku: 'CRM-PRO-002', name: 'Professional Suite', category: 'Software', stock: 85, sold: 92, price: 499, status: 'Active', revenue: 45908 },
  { id: 3, sku: 'SVC-IMP-003', name: 'Implementation Service', category: 'Service', stock: 30, sold: 24, price: 2500, status: 'Active', revenue: 60000 },
  { id: 4, sku: 'TRN-GRP-004', name: 'Group Training Package', category: 'Training', stock: 15, sold: 18, price: 800, status: 'Low Stock', revenue: 14400 },
  { id: 5, sku: 'SVC-SUP-005', name: 'Priority Support (Annual)', category: 'Service', stock: 50, sold: 31, price: 350, status: 'Active', revenue: 10850 },
  { id: 6, sku: 'CRM-STR-006', name: 'Starter Pack', category: 'Software', stock: 0, sold: 205, price: 199, status: 'Out of Stock', revenue: 40795 },
  { id: 7, sku: 'INT-API-007', name: 'API Integration Module', category: 'Add-on', stock: 200, sold: 67, price: 299, status: 'Active', revenue: 20033 },
  { id: 8, sku: 'TRN-1ON-008', name: '1-on-1 Coaching (10h)', category: 'Training', stock: 8, sold: 12, price: 1500, status: 'Low Stock', revenue: 18000 },
];

const statusTone = { Active: 'emerald', 'Low Stock': 'amber', 'Out of Stock': 'red' };
const tabs = [
  { value: 'all', label: 'All Products', count: products.length },
  { value: 'Software', label: 'Software', count: products.filter(p => p.category === 'Software').length },
  { value: 'Service', label: 'Services', count: products.filter(p => p.category === 'Service').length },
  { value: 'Training', label: 'Training', count: products.filter(p => p.category === 'Training').length },
];

export function Inventory() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    if (activeTab !== 'all' && p.category !== activeTab) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalRevenue = products.reduce((s, p) => s + p.revenue, 0);
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').length;

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <StatCard label="Total Products" value={products.length} accent="navy" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>} />
        <StatCard label="Total Revenue" value={`$${(totalRevenue/1000).toFixed(0)}K`} delta="18.2%" trend="up" accent="emerald" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <StatCard label="Units in Stock" value={totalStock} delta="12 added" trend="up" accent="blue" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>} />
        <StatCard label="Alerts" value={lowStock} trend="down" accent="amber" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} />
      </div>

      <AiInsight title="Inventory AI" tone="alert">
        Group Training Package and 1-on-1 Coaching are running low. Based on current demand, you'll sell out in 4-6 days. Restock now to avoid losing $18K+ in potential revenue.
      </AiInsight>

      {/* Table */}
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--border-soft)',
          gap: 'var(--space-4)',
        }}>
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              size="sm"
              style={{ width: 200 }}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
            />
            <Button size="sm" variant="accent" iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>Add Product</Button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--slate-50)' }}>
              {['SKU', 'Product Name', 'Category', 'Stock', 'Sold', 'Price', 'Revenue', 'Status', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid var(--border-soft)',
                  whiteSpace: 'nowrap',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id}
                style={{ borderBottom: '1px solid var(--divider)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px', font: 'var(--type-mono)', color: 'var(--text-muted)', fontSize: 12 }}>{p.sku}</td>
                <td style={{ padding: '14px 16px', font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{p.name}</td>
                <td style={{ padding: '14px 16px' }}><Badge tone="slate">{p.category}</Badge></td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{
                    font: 'var(--weight-bold) 13px/1 var(--font-display)',
                    color: p.stock === 0 ? 'var(--red-600)' : p.stock < 15 ? 'var(--amber-600)' : 'var(--text-strong)',
                  }}>{p.stock}</span>
                </td>
                <td style={{ padding: '14px 16px', font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>{p.sold}</td>
                <td style={{ padding: '14px 16px', font: 'var(--weight-semibold) 13px/1 var(--font-display)', color: 'var(--text-body)' }}>${p.price.toLocaleString()}</td>
                <td style={{ padding: '14px 16px', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>${p.revenue.toLocaleString()}</td>
                <td style={{ padding: '14px 16px' }}><Badge tone={statusTone[p.status] || 'slate'} dot>{p.status}</Badge></td>
                <td style={{ padding: '14px 16px' }}>
                  <button style={{
                    padding: '5px 10px', borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-soft)', background: 'var(--white)',
                    font: 'var(--weight-semibold) 11px/1 var(--font-display)',
                    color: 'var(--text-body)', cursor: 'pointer',
                  }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
