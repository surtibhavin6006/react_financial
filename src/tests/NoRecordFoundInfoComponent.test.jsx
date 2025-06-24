import NoRecordFoundInfoComponent from "../components/NoRecordFoundInfoComponent.jsx";
import {render,screen} from "@testing-library/react";


describe('NoRecordFoundInfoComponent', () => {
    it('renders without crashing', () => {
        render(<NoRecordFoundInfoComponent />);
        expect(screen.getByText('No record found')).toBeInTheDocument();
    })
})