import DropdownBtn from "./DropdownBtn";
import {numberWithCommas} from "../features/utils/utils";
import {useAppSelector} from "../app/hooks";
import React from "react";


const TableFooter = () => {
    const {countries, overallPopulation} = useAppSelector(state => state);
    const overallPopulationStr = numberWithCommas(overallPopulation);

    return (
        <tfoot>
        <tr>
            <th scope="row">{countries.length}</th>
            <td className="text-center"><DropdownBtn/></td>
            <td colSpan={2} className="table-active"><b>Overall population:</b></td>
            <td><b>{overallPopulationStr}</b></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        </tfoot>
    );
};

export default TableFooter;