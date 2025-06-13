
import React from 'react';
import { AppTripChecklist } from '../types';

interface ChecklistDisplayProps {
  checklist: AppTripChecklist;
  onTogglePacked: (categoryName: string, itemId: string) => void;
}

const ChecklistDisplay: React.FC<ChecklistDisplayProps> = ({ checklist, onTogglePacked }) => {
  if (!checklist || checklist.length === 0) {
    return <p className="text-center text-slate-400 text-lg">No checklist items to display.</p>;
  }

  return (
    <div className="space-y-8">
      {checklist.map((category) => (
        <div key={category.name} className="bg-slate-800 shadow-xl rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-fuchsia-500 mb-5 border-b-2 border-slate-700 pb-2">
            {category.name}
          </h3>
          {category.items.length > 0 ? (
            <ul className="space-y-3">
              {category.items.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center p-3 rounded-md transition-all duration-200 ease-in-out ${
                    item.packed ? 'bg-fuchsia-800/50 line-through text-slate-500' : 'bg-slate-700/70 hover:bg-slate-600/70'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={item.packed}
                    onChange={() => onTogglePacked(category.name, item.id)}
                    className="h-5 w-5 rounded border-slate-500 text-fuchsia-500 focus:ring-fuchsia-400 focus:ring-offset-slate-800 mr-4 accent-fuchsia-500 cursor-pointer"
                  />
                  <label htmlFor={`item-${item.id}`} className="flex-grow cursor-pointer">
                    <span className={`font-medium ${item.packed ? '' : 'text-slate-100'}`}>{item.itemName}</span>
                    {item.quantitySuggestion && (
                      <span className={`block text-xs ${item.packed ? 'text-slate-600' : 'text-slate-400'}`}>
                        {item.quantitySuggestion}
                      </span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No items in this category.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChecklistDisplay;
