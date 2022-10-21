import * as React from 'react';
import { ReactElement, useState } from 'react';

interface DropDownProps {

    // The callback function that is called when a new list item is clicked.
    // Inputs the string of the item from props.items that was picked.
    // A common usecase would be to pass a state setter for this prop (see pages/Login)
    onSelectionChanged: (selection: string) => void,
    
    // The list of items that will be displayed as selection options
    items: string[],
    
    // The currently selected item for the dropdown (renders when the dropdown list isnt visible)
    // A good place to pass the state that's updated by onSelectionChanged
    selectedItem: string
}

// This component renders a dropdown menu for the UI.
// Includes functionality for changing selection and updating states.
function DropDown(props: DropDownProps) {

    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    const renderListItems = () => {
        if (!menuVisible) {
            return(<></>);
        }
        const listItems: string[] = props.items;
        const listElements: ReactElement[] = [];
        listItems.forEach((item: string, index: number) => {
            listElements.push(
                <a href="#" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 block px-4 py-2 text-sm" role="menuitem" 
                tabIndex={-1} id="menu-item-0" key={index}
                onClick={() => { 
                    props.onSelectionChanged(item);
                    setMenuVisible(false);
                }}>
                    {item}
                </a>
            );
        });
        return(
            <div className="absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 
            focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                    {listElements}
                </div>
            </div>
        );
    }

    return(
        <div className="relative inline-block text-left">
            <div>
                <button type="button" className="inline-flex w-full justify-center rounded-md border 
                border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50" 
                id="menu-button" aria-expanded="true" aria-haspopup="true"
                onClick={() => { setMenuVisible(!menuVisible) }}>
                    {props.selectedItem}
                    {/* Import - Heroicon name: mini/chevron-down */}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
                    fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 
                        0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
                {renderListItems()}
            </div>
        </div>
    );
}

export default DropDown;