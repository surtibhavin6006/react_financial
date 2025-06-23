import ModalPopup from "../ModalPopup.jsx";
import BudgetFormComponent from "./BudgetFormComponent.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {resetBudgetForm} from "../../stores/budgetSlice.js";

const BudgetModelPopup = ({ isModalOpen = false, onClose }) => {

    const dispatch = useDispatch();
    const { item } = useSelector((state) => state.budget);

    const [isOpen, setIsOpen] = useState(isModalOpen);

    useEffect(() => {
        if(item){
            setIsOpen(true);
        }else{
            setIsOpen(isModalOpen);
        }
    }, [item,isModalOpen]);

    const handleClose = () => {
        dispatch(resetBudgetForm());
        setIsOpen(false);
        onClose && onClose();
    }

    return (
        <>
            <ModalPopup
                isOpen={isOpen}
                onClose={handleClose} title="Budget"
                footer="Budget Footer"
            >
                <BudgetFormComponent  />
            </ModalPopup>
        </>
    )
}

export default BudgetModelPopup;