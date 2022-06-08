import { Down } from '@icon-park/react';
import { useClickAway } from 'ahooks';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';

interface P {
  options: string[];
  onChange?: (option: string) => void;
}

function Select(props: P) {
  const { options, onChange } = props;
  const [selected, setSelected] = useState('1 天');
  const [showOptions, setShowOptions] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickAway(() => {
    setShowOptions(false);
  }, containerRef);

  const selectOption = (option: string) => {
    onChange?.(option);
    setSelected(option);
    setShowOptions(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center cursor-pointer" onClick={() => { setShowOptions(!showOptions); }}>
        <span>{selected}</span>
        <Down className={`transition-transform ${showOptions ? 'transform rotate-180' : ''}`} size="20" fill="#333" strokeWidth={3} />
      </div>
      {showOptions && (
        <div
          className={classNames(
            'absolute top-[calc(100% + 8px)] right-0 bg-white py-2 px-0 rounded-8px z-100 shadow-lg shadow-gray-300/50',
            'animate-dropdown origin-top-left',
          )}
        >
          {options && options.map((item) => (
            <div
              key={item}
              className="px-4 whitespace-nowrap cursor-pointer h-8 leading-8 hover:bg-light-600"
              onClick={() => { selectOption(item); }}
            >{item}
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
