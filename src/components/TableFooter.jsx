import {useContext} from 'react';
import DropdownBtn from "./DropdownBtn";
import {Context} from "../utils/contexts";
import {TableContext} from "../utils/contexts";
import {numberWithCommas} from "../utils/utils";


const TableFooter = () => {
    const overallPopulation = useContext(TableContext);
    const {countries} = useContext(Context);
    const overallPopulationStr = numberWithCommas(overallPopulation);

    return (
        <tfoot>
        <tr>
            <th scope="row">{countries.length}</th>
            <td className="text-center"><DropdownBtn/></td>
            <td colSpan="2" className="table-active"><b>Overall population:</b></td>
            <td><b>{overallPopulationStr}</b></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        </tfoot>
    );
};

export default TableFooter;