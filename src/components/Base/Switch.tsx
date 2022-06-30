import cn from 'classnames';
import React from 'react';

interface P {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Switch(props: P) {
  const { checked, onChange } = props;
  const onClick = () => {
    onChange?.(!checked);
  };
  return (
    <div
      className={cn(
        'flex items-center relative rounded-xl h-6 w-12 p-1 border-1 border-gray-400/50 dark:border-gray-700',
        'overflow-hidden transition-all ease-out cursor-pointer',
        checked ? 'bg-indigo-600' : 'bg-blue-gray-200/50 dark:bg-blue-gray-700/50',
      )}
      onClick={onClick}
    >
      <div className={cn(
        'absolute bg-white rounded-full shadow-md transition-all ease-out',
        checked ? 'left-24px w-4 h-4 shadow-white-400' : 'left-1 w-2 h-2 shadow-gray-400',
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
