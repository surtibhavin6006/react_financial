import {formatCurrency} from "../helpers/common.js";

const PriceFormatComponent = ({ amount }) => {
    return <span>{formatCurrency(amount)}</span>;
};

export default PriceFormatComponent;