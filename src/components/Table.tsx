import {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import Country from "./Country";
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-dt/js/dataTables.dataTables';
import {columns} from "../features/utils/constants";
import TableFooter from "./TableFooter";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setRenderTable} from "../slices/renderSlice";
import {setOverallPopulation} from "../slices/populationSlice";


const Table = () => {
    const {countries} = useAppSelector(state => state);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const table = new DataTable('#myTable', {
            searching: false
        });
        dispatch(setRenderTable(true));

        return () => {
            table.destroy();
            dispatch(setRenderTable(false));
        };
    }, [dispatch]);

    // This useEffect to prevent updating state during the rendering phase
    //  of another component ('Loading')
    useEffect(() => {
        const overallPopulation = Object.values(countries).reduce(
            (accum, country) => accum + country[1].population,
            0
        );
        dispatch(setOverallPopulation(overallPopulation));
    }, [countries, dispatch]);

    return (

        <div className="table-responsive px-3">
            <table id="myTable"
                   className="table table-bordered table-hover align-middle table-bordered">
                <thead className="table-light">
                <tr>
                    {columns.map((column, index) => <th scope="col" key={index}>{column}</th>)}
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {Object.values(countries).map((country, index) => <Country country={country[1]} key={index} index={index + 1}/>)}
                </tbody>

                <TableFooter/>
            </table>
        </div>
    );
};

export default Table;