import { 
    useState,
    useEffect,
    useRef,
    useLayoutEffect
} from 'react';
import FeatherIcon from 'feather-icons-react';
import '../styles/context.css';

const CustomContext = ({ targetId, options, classes }) => {
    const contextRef= useRef(null);
    const targetNode = useRef(null);
    const [contextData, setContextData]= useState({ 
        visible:false, 
        posX: 0, 
        posY: 0
    });

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
            setContextData({ 
                ...contextData, 
                visible: false 
            });

            
            targetNode.current = null;
        }
    }

    const offClickHandler= (event) => {
        if (contextRef.current && !contextRef.current.contains(event.target)) {
                setContextData({ 
                    ...contextData, 
                    visible: false 
                });

                
                targetNode.current = null;
            }
        }

        document.addEventListener('contextmenu', contextMenuEventHandler);
        document.addEventListener('click', offClickHandler);

        return () => {
            document.removeEventListener('contextmenu', contextMenuEventHandler);
            document.removeEventListener('click', offClickHandler);
        }
    }, [contextData, targetId]);

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

    const onclickCallback = (e, option) => {
        if (typeof option.click === 'function') {
            option.click(e, targetNode?.current);
        }
    }

    return (
        <div ref={contextRef} className='menu' style={{ display:`${contextData.visible ? 'block' : 'none'}`, left: contextData.posX, top: contextData.posY }}>
            <ul className={`menu-list ${classes?.listWrapper}`}>
                {options.map((option, index) => (
                    <>
                        <li 
                            onClick={(e) => onclickCallback(e, option) } 
                            key={`menu-${option.name}-${index}`} 
                            className={`menu-item ${classes?.listItem} ${option.className}`}
                        >
                            <span>
                                {option.icon ? <FeatherIcon icon={option.icon} />  : null} 
                                {option.name} 
                                {option.subList ? <FeatherIcon icon='chevron-right' /> : null}
                            </span>
                            {
                                option.subList 
                                ?  <ul className="menu-sub-list">
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