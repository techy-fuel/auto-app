import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/core/Button';
import { Input } from '../components/forms/Input';
import { StatCard } from '../components/data/StatCard';
import { AiInsight } from '../components/data/AiInsight';
import { Tabs } from '../components/navigation/Tabs';

const emptyForm = { vin: '', make: '', model: '', year: new Date().getFullYear(), color: '', mileage: '', price: '', status: 'Available', fuel_type: '', transmission: '' };

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] || ''; });
    return {
      make: obj.make || '',
      model: obj.model || '',
      year: parseInt(obj.year) || new Date().getFullYear(),
      color: obj.color || '',
      mileage: parseInt(obj.mileage) || 0,
      price: parseFloat(obj.price) || 0,
      vin: obj.vin || '',
      fuel_type: obj.fuel_type || obj.fuel || '',
      transmission: obj.transmission || '',
      status: obj.status || 'Available',
    };
  }).filter(v => v.make && v.model);
}

export function Inventory() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState(''); // 'uploading' | 'done' | 'error'
  const fileRef = useRef();

  useEffect(() => { fetchVehicles(); }, []);

  async function fetchVehicles() {
    setLoading(true);
    const { data, error } = await supabase.from('inventory').select('*').order('created_at', { ascending: false });
    if (!error) setVehicles(data || []);
    setLoading(false);
  }

  async function addVehicle() {
    if (!form.make.trim() || !form.model.trim()) { setError('Make and Model are required'); return; }
    setSaving(true); setError('');
    const { error } = await supabase.from('inventory').insert([{
      ...form,
      year: parseInt(form.year) || new Date().getFullYear(),
      mileage: parseInt(form.mileage) || 0,
      price: parseFloat(form.price) || 0,
    }]);
    setSaving(false);
    if (error) { setError(error.message); return; }
    setShowForm(false); setForm(emptyForm); fetchVehicles();
  }

  async function duplicateVehicle(v) {
    const { id, created_at, ...rest } = v;
    await supabase.from('inventory').insert([{ ...rest, status: 'Available', vin: '' }]);
    fetchVehicles();
  }

  async function deleteVehicle(id) {
    await supabase.from('inventory').delete().eq('id', id);
    fetchVehicles();
  }

  async function updateStatus(id, status) {
    await supabase.from('inventory').update({ status }).eq('id', id);
    fetchVehicles();
  }

  async function handleCSVUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus('uploading');
    const text = await file.text();
    const rows = parseCSV(text);
    if (rows.length === 0) { setUploadStatus('error'); return; }
    const { error } = await supabase.from('inventory').insert(rows);
    if (error) { setUploadStatus('error'); return; }
    setUploadStatus('done');
    fetchVehicles();
    setTimeout(() => setUploadStatus(''), 3000);
    e.target.value = '';
  }

  const tabs = [
    { value: 'all', label: 'All Vehicles', count: vehicles.length },
    { value: 'Available', label: 'Available', count: vehicles.filter(v => v.status === 'Available').length },
    { value: 'Reserved', label: 'Reserved', count: vehicles.filter(v => v.status === 'Reserved').length },
    { value: 'Sold', label: 'Sold', count: vehicles.filter(v => v.status === 'Sold').length },
  ];

  const filtered = vehicles.filter(v => {
    if (activeTab !== 'all' && v.status !== activeTab) return false;
    if (search && ![v.make, v.model, v.vin, v.color].some(f => f?.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const totalValue = vehicles.filter(v => v.status === 'Available').reduce((s, v) => s + (v.price || 0), 0);
  const availableCount = vehicles.filter(v => v.status === 'Available').length;
  const soldCount = vehicles.filter(v => v.status === 'Sold').length;

  return (
    <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
        <StatCard label="Total Vehicles" value={vehicles.length} accent="navy"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-3"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>} />
        <StatCard label="Available" value={availableCount} accent="emerald"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
        <StatCard label="Stock Value (AED)" value={`${(totalValue/1000000).toFixed(1)}M`} accent="blue"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
        <StatCard label="Sold" value={soldCount} accent="amber"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>} />
      </div>

      <AiInsight title="Inventory AI" tone={availableCount < 10 ? 'alert' : 'opportunity'}>
        {availableCount < 10
          ? `Only ${availableCount} vehicles available. Low inventory affects lead conversion rates.`
          : `${availableCount} vehicles in stock. Toyota and Nissan models have highest inquiry-to-sale ratio this month.`}
      </AiInsight>

      {/* Add Vehicle Form */}
      {showForm && (
        <div style={{ background: 'var(--white)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-card)' }}>
          <h3 style={{ font: 'var(--weight-bold) 15px/1 var(--font-display)', color: 'var(--text-strong)', marginBottom: 'var(--space-5)' }}>Add Vehicle</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
            {[
              { label: 'Make *', key: 'make', placeholder: 'Toyota' },
              { label: 'Model *', key: 'model', placeholder: 'Land Cruiser' },
              { label: 'Year', key: 'year', placeholder: '2024' },
              { label: 'Color', key: 'color', placeholder: 'Pearl White' },
              { label: 'Mileage (km)', key: 'mileage', placeholder: '0' },
              { label: 'Price (AED)', key: 'price', placeholder: '285000' },
              { label: 'VIN', key: 'vin', placeholder: 'JT3HN86R020012345' },
              { label: 'Fuel Type', key: 'fuel_type', placeholder: 'Petrol / Diesel / Hybrid' },
              { label: 'Transmission', key: 'transmission', placeholder: 'Automatic / Manual' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ font: 'var(--weight-semibold) 12px/1 var(--font-display)', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Status</label>
              <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-soft)', font: '13px/1 var(--font-body)', color: 'var(--text-strong)', outline: 'none', background: 'var(--white)' }}>
                {['Available', 'Reserved', 'In Service', 'Sold'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {error && <p style={{ color: 'var(--red-500)', font: '12px/1 var(--font-body)', marginTop: 12 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 10, marginTop: 'var(--space-5)' }}>
            <Button size="sm" variant="accent" onClick={addVehicle} disabled={saving}>{saving ? 'Saving...' : 'Save Vehicle'}</Button>
            <Button size="sm" variant="secondary" onClick={() => { setShowForm(false); setForm(emptyForm); setError(''); }}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--border-soft)', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center' }}>
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} size="sm" style={{ width: 180 }}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>} />

            {/* CSV Upload */}
            <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleCSVUpload} />
            <button onClick={() => fileRef.current.click()} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '0 12px', height: 34, borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-soft)', background: 'var(--white)',
              font: 'var(--weight-semibold) 12px/1 var(--font-display)',
              color: uploadStatus === 'done' ? 'var(--emerald-600)' : uploadStatus === 'error' ? 'var(--red-500)' : 'var(--text-body)',
              cursor: 'pointer',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              {uploadStatus === 'uploading' ? 'Uploading...' : uploadStatus === 'done' ? 'Uploaded ✓' : uploadStatus === 'error' ? 'Error — check CSV' : 'Bulk Upload CSV'}
            </button>

            <Button size="sm" variant="accent" onClick={() => setShowForm(true)}
              iconLeft={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>}>
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* CSV format hint */}
        <div style={{ padding: '8px 24px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-soft)', font: '11px/1.4 var(--font-body)', color: 'var(--text-muted)' }}>
          CSV format: <code style={{ background: 'var(--slate-100)', padding: '1px 5px', borderRadius: 4 }}>make, model, year, color, mileage, price, vin, fuel_type, transmission, status</code>
        </div>

        {loading ? (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>Loading inventory...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)' }}>
                {['Vehicle', 'Year', 'Color', 'Mileage', 'Price (AED)', 'Fuel', 'Status', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', borderBottom: '1px solid var(--border-soft)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.id} style={{ borderBottom: '1px solid var(--divider)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🚗</div>
                      <div>
                        <div style={{ font: 'var(--weight-semibold) 13px/1 var(--font-body)', color: 'var(--text-strong)' }}>{v.make} {v.model}</div>
                        <div style={{ font: '11px/1 var(--font-body)', color: 'var(--text-muted)', marginTop: 3 }}>{v.vin || '—'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>{v.year}</td>
                  <td style={{ padding: '14px 16px', font: '13px/1 var(--font-body)', color: 'var(--text-body)' }}>{v.color || '—'}</td>
                  <td style={{ padding: '14px 16px', font: '13px/1 var(--font-body)', color: 'var(--text-muted)' }}>{v.mileage ? `${Number(v.mileage).toLocaleString()} km` : '—'}</td>
                  <td style={{ padding: '14px 16px', font: 'var(--weight-bold) 13px/1 var(--font-display)', color: 'var(--text-strong)' }}>
                    {v.price ? `AED ${Number(v.price).toLocaleString()}` : '—'}
                  </td>
                  <td style={{ padding: '14px 16px', font: '12px/1 var(--font-body)', color: 'var(--text-muted)' }}>{v.fuel_type || '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <select value={v.status} onChange={e => updateStatus(v.id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', background: 'var(--white)', cursor: 'pointer', color: 'var(--text-body)' }}>
                      {['Available', 'Reserved', 'In Service', 'Sold'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => duplicateVehicle(v)} title="Duplicate" style={{ padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--text-body)', cursor: 'pointer' }}>
                        Copy
                      </button>
                      <button onClick={() => deleteVehicle(v.id)} style={{ padding: '5px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-soft)', background: 'var(--white)', font: 'var(--weight-semibold) 11px/1 var(--font-display)', color: 'var(--red-500)', cursor: 'pointer' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--text-muted)' }}>
            {vehicles.length === 0 ? 'No vehicles yet. Add one or upload a CSV file.' : 'No vehicles match your filters.'}
          </div>
        )}
      </div>
    </div>
  );
}
