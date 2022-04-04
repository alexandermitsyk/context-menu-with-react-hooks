import CustomContext from './components/CustomContext';

const menuOptions = [
    { 
        name: 'Share',
        icon: 'corner-up-right',
        className: '',
        click: (e, target) => {
            return console.log('You clicked to share', e.target, target);
        }
    },
    { 
        name: 'Rename', 
        icon: 'edit-2', 
        divider: true, 
        className: '' 
    },
    { 
        name: 'No status', 
        icon: 'circle', 
        className: '', 
        subList: [
            { 
                name: 'Needs review', 
                icon: 'square', 
                className: '', 
                color: 'menu-button--orange',
                click: (e, target) => {
                    return console.log('You clicked to Needs review', e.target, target);
                }
            },
            { 
                name: 'In progress', 
                icon: 'octagon', 
                className: '', 
                color: 'menu-button--purple' 
            },
            { 
                name: 'Approved', 
                icon: 'triangle', 
                className: '', 
                color: 'menu-button--green' 
            },
            { 
                name: 'No status', 
                icon: 'circle', 
                className: 'menu-button--checked', 
                color: 'menu-button--black' 
            }
        ] 
    }, 
    { 
        name: 'Copy Link Address', 
        icon: 'link', 
        className: '' 
    },
    { 
        name: 'Move to', 
        icon: 'folder-plus', 
        className: '' 
    },
    { 
        name: 'Copy to', 
        icon: 'copy', 
        className: '' 
    },
    { 
        name: 'Make Private', 
        icon: 'lock', 
        className: '' 
    }, 
    { 
        name: 'Download', 
        icon: 'download', 
        className: '',
        divider: true, 
    },
    { 
        name: 'Delete', 
        icon: 'trash-2', 
        className: 'menu-button--delete' 
    },
];

const App= () => {
    return (
        <div className='wrapper'>
            <div id='container' className='container' >
                <CustomContext
                    targetId='container'
                    options={menuOptions}
                    classes={{
                        listWrapper: 'customContextmenuArea1ListWrapper',
                        listItem: 'customContextmenuArea1ListItem'
                    }}
                />
            </div>
        </div>
    );
}

export default App;