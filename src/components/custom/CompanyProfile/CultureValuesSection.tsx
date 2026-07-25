import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

interface CultureValuesSectionProps {
  values: string[];
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  isPublicView?: boolean;
}

const CultureValuesSection: React.FC<CultureValuesSectionProps> = ({
  values,
  onEdit,
  onDelete,
  onAdd,
  isPublicView = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 font-semibold text-foreground">Culture & Values</h3>
        {!isPublicView && (
          <div className="flex items-center gap-2">
            {onAdd && (
              <button
                onClick={onAdd}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {values && values.length > 0 ? (
          values.map((value, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-purple-50 text-[#553be6] text-sm rounded-full border border-purple-200"
            >
              {value}
            </span>
          ))
        ) : (
          <p className="text-body-md text-gray-400 leading-relaxed italic">
            Add culture and values to showcase what makes your company unique.
          </p>
        )}
      </div>
    </div>
  );
};

export default CultureValuesSection;