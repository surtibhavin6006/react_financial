import {useState} from "react";

export default function useToggleComponent(defaultKey, options = []) {
    const [activeKey, setActiveKey] = useState(defaultKey);
    const toggle = (toggleValue) => {
        if(options.includes(toggleValue)) {
            setActiveKey(toggleValue);
        }
    }

    return {
        activeKey,
        toggle,
        isActive: (key) => activeKey === key
    }
}