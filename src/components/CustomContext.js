import { 
    useState,
    useEffect,
    useRef,
    useLayoutEffect,
    useCallback,
} from 'react';
import FeatherIcon from 'feather-icons-react';
import '../styles/context.css';

const CustomContext = ({ targetId, options, classes, closeOnMenuClick }) => {
    const contextRef= useRef(null);
    const targetNode = useRef(null);
    const [contextData, setContextData]= useState({ 
        visible:false, 
        posX: 0, 
        posY: 0
    });

    const closeContextMenu = useCallback(() => {
        setContextData({ 
            ...contextData, 
            visible: false 
        });

        targetNode.current = null;
    }, [contextData]);

    useEffect(() => {
        const contextMenuEventHandler= (event) => {
        const targetElement = document.getElementById(targetId);

        if (targetElement && targetElement.contains(event.target)) {
            event.preventDefault();
            setContextData({ 
                visible: true, 
                posX: event.clientX, 
                posY: event.clientY 
            });

            
            targetNode.current = event.target;
        } else if (contextRef.current && !contextRef.current.contains(event.target)) {
            closeContextMenu();
        }
    }

    const offClickHandler= (event) => {
        if (contextRef.current && !contextRef.current.contains(event.target)) {
                closeContextMenu();
            }
        }

        document.addEventListener('contextmenu', contextMenuEventHandler);
        document.addEventListener('click', offClickHandler);

        return () => {
            document.removeEventListener('contextmenu', contextMenuEventHandler);
            document.removeEventListener('click', offClickHandler);
        }
    }, [closeContextMenu, contextData, targetId]);

    useLayoutEffect(() => {
        if (contextData.posX + contextRef.current?.offsetWidth > window.innerWidth) {
            setContextData({ 
                ...contextData, 
                posX: contextData.posX - contextRef.current?.offsetWidth
            });
        }

        if (contextData.posY + contextRef.current?.offsetHeight > window.innerHeight) {
            setContextData({ 
                ...contextData, 
                posY: contextData.posY - contextRef.current?.offsetHeight
            });
        }
    }, [contextData]);

    const onclickCallback = useCallback((e, option) => {
        if (typeof option.click === 'function') {
            if (typeof closeOnMenuClick !== 'undefined' || closeOnMenuClick === true) {
                closeContextMenu();
            }

            option.click(e, targetNode?.current);
        }
    }, [closeContextMenu, closeOnMenuClick]);

    return (
        <div ref={contextRef} className='menu' style={{ display:`${contextData.visible ? 'block' : 'none'}`, left: contextData.posX, top: contextData.posY }}>
            <ul className={`menu-list ${classes?.listWrapper}`}>
                {options.map((option, index) => (
                    <>
                        <li 
                            onClick={(e) => onclickCallback(e, option) } 
                            key={`menu-item-${option.name}-${index}`} 
                            className={`menu-item ${classes?.listItem} ${option.className}`}
                        >
                            <span>
                                {option.icon ? <FeatherIcon icon={option.icon} />  : null} 
                                {option.name} 
                                {option.subList ? <FeatherIcon icon='chevron-right' /> : null}
                            </span>
                            {
                                option.subList 
                                ?  <ul key={`sub-menu-wrapper-${option.name}-${index}`} className="menu-sub-list">
                                        {option.subList.map((subUption, subIndex) => (
                                            <li
                                                key={`sub-menu-${subUption.name}-${subIndex}`} 
                                                onClick={(e) => onclickCallback(e, subUption) } 
                                                className={`menu-item ${option.className}`}
                                            >
                                                <span className={subUption.color}>
                                                    {subUption.icon ? <FeatherIcon icon={subUption.icon} />  : null} 
                                                    {subUption.name}
                                                </span>
                                            </li>
                                        )) }
                                    </ul> 
                                : null
                            }
                        </li>
                        {
                            option.divider ? <div key={`divider-${index}`} className='with-divider' /> : null
                        }
                    </>
                ))}
            </ul>
        </div>
    );
}

export default CustomContext;