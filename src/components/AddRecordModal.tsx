import React, { useState, useEffect } from 'react';
import { VisitorRecord, ChannelType } from '../types';
import { X, Plus, Check } from 'lucide-react';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: VisitorRecord) => void;
  initialRecord?: VisitorRecord | null;
  availableBranches: string[];
}

const COMMON_CHANNELS: ChannelType[] = [
  'Walk in',
  'Facebook / IG',
  'Designer',
  'Appointment',
  'Google',
  'Phone / Line'
];

const POPULAR_PRODUCTS = [
  'Coffee Tables',
  'DINING CHAIRS',
  'Outlet',
  'Cafe Tables',
  'Dining Tables',
  'Decor Accessories',
  'Pendant Lamps',
  'Bar Chair',
  'I-Shape Sofas',
  'Lounge Chair',
  'Rugs',
  'Bed',
  'Benches',
  'Cabinets',
  'Night Tables',
  'Outdoor Seats',
  'Outdoor Tables',
  'Stools',
  'chandelier',
  'Console Tables'
];

export const AddRecordModal: React.FC<AddRecordModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRecord,
  availableBranches
}) => {
  const [date, setDate] = useState('2026-07-27');
  const [branch, setBranch] = useState('RM9');
  const [channel, setChannel] = useState<ChannelType>('Walk in');
  const [salesperson, setSalesperson] = useState('Pui');
  const [productsInput, setProductsInput] = useState('');
  const [selectedProductTags, setSelectedProductTags] = useState<string[]>([]);
  const [orderClosed, setOrderClosed] = useState(false);
  const [orderAmount, setOrderAmount] = useState<string>('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialRecord) {
      setDate(initialRecord.date || '2026-07-27');
      setBranch(initialRecord.branch || 'RM9');
      setChannel(initialRecord.channel || 'Walk in');
      setSalesperson(initialRecord.salesperson || '');
      setSelectedProductTags(initialRecord.productInterests || []);
      setProductsInput('');
      setOrderClosed(initialRecord.orderClosed || false);
      setOrderAmount(initialRecord.orderAmount ? String(initialRecord.orderAmount) : '');
      setNotes(initialRecord.notes || initialRecord.closedDetails || '');
    } else {
      setDate(new Date().toISOString().split('T')[0] || '2026-07-27');
      setBranch(availableBranches[0] || 'RM9');
      setChannel('Walk in');
      setSalesperson('Pui');
      setSelectedProductTags(['Coffee Tables']);
      setProductsInput('');
      setOrderClosed(false);
      setOrderAmount('');
      setNotes('');
    }
  }, [initialRecord, isOpen, availableBranches]);

  if (!isOpen) return null;

  const toggleProductTag = (prod: string) => {
    if (selectedProductTags.includes(prod)) {
      setSelectedProductTags(selectedProductTags.filter(p => p !== prod));
    } else {
      setSelectedProductTags([...selectedProductTags, prod]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse additional custom products
    const customList = productsInput
      .split(/[,;]+/)
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const allProducts = Array.from(new Set([...selectedProductTags, ...customList]));

    const newRecord: VisitorRecord = {
      id: initialRecord ? initialRecord.id : `rec-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date,
      branch: branch.toUpperCase(),
      channel,
      salesperson: salesperson.trim() || 'Staff',
      productInterests: allProducts.length > 0 ? allProducts : ['General Furniture'],
      orderClosed,
      orderAmount: orderClosed && orderAmount ? parseFloat(orderAmount) : undefined,
      notes: notes.trim() || undefined
    };

    onSave(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-900">
            {initialRecord ? 'Edit Visitor Log' : 'Add New Visitor Log'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date & Branch */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Date (YYYY-MM-DD)
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Branch / Showroom
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold"
              >
                {availableBranches.filter(b => b !== 'ALL' && b !== 'All Branches').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
                {!availableBranches.includes('RM9') && <option value="RM9">RM9</option>}
                {!availableBranches.includes('SKV') && <option value="SKV">SKV</option>}
              </select>
            </div>
          </div>

          {/* Channel & Salesperson */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Visitor Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {COMMON_CHANNELS.map(ch => (
                  <option key={ch} value={ch}>{ch}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Salesperson
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Pui, Tim, Kate..."
                value={salesperson}
                onChange={(e) => setSalesperson(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Product Category Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Product Categories of Interest
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
              {POPULAR_PRODUCTS.map(prod => {
                const isSelected = selectedProductTags.includes(prod);
                return (
                  <button
                    type="button"
                    key={prod}
                    onClick={() => toggleProductTag(prod)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {prod}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="Or type other items (comma separated)..."
              value={productsInput}
              onChange={(e) => setProductsInput(e.target.value)}
              className="w-full mt-2 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Deal Closed & Amount */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input
                type="checkbox"
                checked={orderClosed}
                onChange={(e) => setOrderClosed(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
              />
              <span>Deal Closed / Order Placed</span>
            </label>

            {orderClosed && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Order Value (THB)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 48500"
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Customer Remarks / Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Walk-in customer looking for dining set"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors"
            >
              {initialRecord ? 'Save Changes' : 'Add Visitor Record'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
