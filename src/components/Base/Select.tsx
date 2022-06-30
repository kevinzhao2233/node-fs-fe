import { Down } from '@icon-park/react';
import { useClickAway } from 'ahooks';
import cn from 'classnames';
import React, { useRef, useState } from 'react';

interface OptionItem {
  label: string;
  value: string;
}

interface P {
  options: OptionItem[];
  value: string;
  onChange?: (option: string) => void;
}

function Select(props: P) {
  const {
    options, value, onChange,
  } = props;
  const [showOptions, setShowOptions] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setShowOptions(false);
  }, containerRef);

  const selectOption = (option: OptionItem) => {
    onChange?.(option.value);
    setShowOptions(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center cursor-pointer" onClick={() => { setShowOptions(!showOptions); }}>
        <span>{options.find((item) => item.value === value)?.label}</span>
        <Down className={`transition-transform ${showOptions ? 'transform rotate-180' : ''}`} size="20" strokeWidth={3} />
      </div>
      {showOptions && (
        <div
          className={cn(
            'absolute top-[calc(100% + 8px)] right-0 bg-white py-2 px-0 rounded-8px z-100 shadow-lg shadow-gray-300/50',
            'animate-dropdown origin-top dark:(bg-blue-gray-800 shadow-gray-700/50)',
          )}
        >
          {options && options.map((item) => (
            <div
              key={item.value}
              className="px-4 whitespace-nowrap cursor-pointer h-8 leading-8 hover:bg-light-600 dark:hover:bg-blue-gray-700"
              onClick={() => { selectOption(item); }}
            >{item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Select.defaultProps = {
  onChange: () => {},
};

export default Select;
