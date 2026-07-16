import * as React from 'react';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  className = '',
  ...props
}) => {
  return (
    <div className={`relative inline-block w-11 h-6 ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        {...props}
      />
      <div
        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-colors rounded-full ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      />
      <div
        className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform ${
          checked ? 'transform translate-x-5' : ''
        }`}
      />
    </div>
  );
};

export { Switch };
