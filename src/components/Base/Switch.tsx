import cn from 'classnames';
import React, { useState } from 'react';

interface P {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Switch(props: P) {
  const { checked, onChange } = props;
  const [_checked, setChecked] = useState<boolean>(checked || true);
  const onClick = () => {
    setChecked(!_checked);
    onChange?.(!_checked);
  };
  return (
    <div
      className={cn(
        'flex items-center relative rounded-xl h-6 w-12 p-1 border-1 border-gray-300',
        'overflow-hidden transition-all ease-out cursor-pointer',
        _checked ? 'bg-blue-600' : 'bg-gray-200/40',
      )}
      onClick={onClick}
    >
      <div className={cn(
        'absolute bg-white rounded-full shadow-md transition-all ease-out',
        _checked ? 'left-24px w-4 h-4 shadow-white-400' : 'left-1 w-2 h-2 shadow-gray-400',
      )}
      />
    </div>
  );
}

Switch.defaultProps = {
  checked: false,
  onChange: () => {},
};

export default Switch;
