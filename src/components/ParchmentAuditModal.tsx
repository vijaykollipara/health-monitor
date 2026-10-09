import React from 'react';
import { WEEKLY_LOGS } from '../data/initialData';

interface ParchmentAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParchmentAuditModal: React.FC<ParchmentAuditModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a18]/70 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-[#fff8f6] rounded-2xl shadow-2xl p-6 border-4 border-[#c59b27] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Archival Stamped Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#d1c5af]">
          <div>
            <span className="font-label-sm text-[10px] text-[#775a00] uppercase tracking-widest font-bold">
              Official Medical Archival Folio • Vol. IV
            </span>
            <h2 className="font-headline text-[22px] font-bold text-[#211a18]">
              Clinical Nutrition Ledger Audit
            </h2>
            <span className="font-body text-[13px] text-[#4e4635] italic">
              Subject: Clara Vance • Certification № 884-SAL
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#4e4635] hover:text-[#211a18] p-1.5 rounded-md cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Parchment Body */}
        <div className="p-4 bg-[#fff1ed] rounded-xl border border-[#ede0dc] space-y-3 font-body text-[#211a18] text-[15px] leading-relaxed relative">
          {/* Watermark */}
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[100px] text-[#775a00]">
              verified
            </span>
          </div>

          <p>
            <strong>Diagnostic Observation:</strong> During the observational cycle of October 21 – October 27, 2024, patient maintained a high caloric compliance threshold of{' '}
            <strong className="text-[#006d37]">92%</strong> against the recommended 2,100 kcal target.
          </p>

          {/* Ledger Table */}
          <table className="w-full text-left font-label-sm text-[11px] border border-[#d1c5af] my-2 bg-white rounded overflow-hidden">
            <thead className="bg-[#ede0dc] text-[#211a18]">
              <tr>
                <th className="p-2 border-b border-[#d1c5af]">Day</th>
                <th className="p-2 border-b border-[#d1c5af]">Caloric Heat</th>
                <th className="p-2 border-b border-[#d1c5af]">Target</th>
                <th className="p-2 border-b border-[#d1c5af]">Variance</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_LOGS.map((item) => {
                const diff = item.calories - item.target;
                return (
                  <tr key={item.day} className="border-b border-[#ede0dc]/80">
                    <td className="p-2 font-bold">{item.day}</td>
                    <td className="p-2">{item.calories} kcal</td>
                    <td className="p-2">2,100 kcal</td>
                    <td className={`p-2 font-bold ${diff > 0 ? 'text-[#c59b27]' : 'text-[#006d37]'}`}>
                      {diff > 0 ? `+${diff}` : `${diff}`} kcal
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between pt-2 border-t border-[#d1c5af]/60">
            <div>
              <span className="font-label-sm text-[10px] text-[#4e4635] uppercase block font-bold">
                Hydration Equilibrium
              </span>
              <span className="font-headline text-[16px] font-bold text-[#006497]">
                2,420 ml / day average
              </span>
            </div>

            <div className="text-right">
              <span className="font-label-sm text-[10px] text-[#4e4635] uppercase block font-bold">
                Net Deficit Quota
              </span>
              <span className="font-headline text-[16px] font-bold text-[#006d37]">
                -185 kcal / day
              </span>
            </div>
          </div>
        </div>

        {/* Physical Stamped Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c59b27] to-[#775a00] flex items-center justify-center text-white shadow">
              <span className="material-symbols-outlined text-[20px]">seal</span>
            </div>
            <div className="flex flex-col font-label-sm text-[9px] text-[#807663] uppercase">
              <span>Apothecary Bureau of Standards</span>
              <span>Stamped October 24, 2024</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#775a00] to-[#c59b27] text-white font-label-md text-[12px] font-bold shadow-md hover:brightness-105 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
