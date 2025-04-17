// l. 427
import { filter } from 'lodash';
import { ChangeEvent, FC, MouseEvent, ReactElement, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

import Button from '../button/Button';
import useDetectOutsideClick from '../hooks/useDetectOutsideClick';
import TextInput from '../inputs/TextInput';
import { IDropdownProps } from '../shared.interface';

const Dropdown: FC<IDropdownProps> = ({
  text,
  maxHeight,
  mainClassNames,
  showSearchInput,
  dropdownClassNames,
  values,
  style,
  setValue,
  onClick
  // required
}): ReactElement => {
  const [dropdownItems, setDropdownItems] = useState<string[]>(values);
  const [inputText, setInputText] = useState<string>(text);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [toggleDropdown, setToggleDropdown] = useDetectOutsideClick(dropdownRef, false);

  const onHandleSelect = (event: MouseEvent): void => {
    const selectedItem: string = (event.target as HTMLLIElement).textContent as string;
    if (setValue) {
      setValue(selectedItem);
    }
    setInputText(selectedItem);
    setDropdownItems(values);
    setToggleDropdown(false);
    if (onClick) {
      onClick(selectedItem);
    }
  };

  return (
    <div className={`w-full divide-y divide-gray-100/0 rounded border ${mainClassNames}`} style={style}>
      {(!showSearchInput || showSearchInput) && !toggleDropdown && (
        <Button
          className="bg-slate-200 dark:bg-slate-800/20 flex w-full justify-between rounded px-3 py-2 text-white text-sm xl:text-bas"
          label={
            <>
              <span className="truncate font-semibold text-slate-800/80 text-sm xl:text-base">{text}</span>
              {!toggleDropdown ? (
                <FaChevronDown className="float-right mt-1 h-4 fill-current text-slate-800/80 hover:text-slate-800 text-base xl:text-lg" />
              ) : (
                <FaChevronUp className="float-right mt-1 h-4 fill-current text-slate-800/80 hover:text-slate-800 text-base xl:text-lg" />
              )}
            </>
          }
          onClick={() => setToggleDropdown(!toggleDropdown)}
        />
      )}

      {showSearchInput && toggleDropdown && (
        <div className="flex bg-slate-200/80 dark:bg-slate-800/80 text-blue-950 dark:text-blue-200">
          <TextInput
            type="text"
            name="search"
            value={inputText}
            className="h-10 w-full items-center rounded pl-3 text-sm font-semibold focus:outline-none xl:text-base bg-transparent"
            placeholder="Search..."
            onChange={(event: ChangeEvent) => {
              const inputValue: string = (event.target as HTMLInputElement).value;
              setInputText(inputValue);
              const filtered: string[] = filter(dropdownItems, (item: string) => item.toLowerCase().includes(inputValue.toLowerCase()));
              setDropdownItems(filtered);
              if (!inputValue) {
                setDropdownItems(values);
              }
            }}
            // required={true}
          />
          <div className="flex self-center" onClick={() => setToggleDropdown(!toggleDropdown)}>
            <FaTimes className="mx-3 h-4 fill-current text-blue-950/80 dark:text-blue-200/80 hover:text-blue-950 dark:hover:text-blue-200" />
          </div>
        </div>
      )}

      {toggleDropdown && (
        <ul
          className={`z-40 cursor-pointer overflow-y-scroll py-2 text-sm xl:text-base text-blue-950 dark:text-blue-200 bg-slate-200/80 dark:bg-slate-600/80 
              ${dropdownClassNames}`}
          style={{ maxHeight: `${maxHeight}px` }}
        >
          {dropdownItems.map((value: string) => (
            <li key={uuidv4()} onClick={onHandleSelect}>
              <div
                // className="block px-4 py-2 text-slate-900 dark:hover:bg-gray-200"
                className="block px-4 py-2 text-blue-950 dark:text-blue-100 bg-slate-200/90 dark:bg-slate-600/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm xl:text-base"
              >
                {value}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
