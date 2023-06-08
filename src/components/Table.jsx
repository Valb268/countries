import {useContext, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import {Context} from "../utils/contexts";
import {TableContext} from "../utils/contexts";
import Country from "./Country";
import DataTable from 'datatables.net-bs5';
import 'datatables.net-buttons-bs5';
import 'datatables.net-responsive-bs5';
import 'datatables.net-dt/js/dataTables.dataTables';
import {columns} from "./constants";
import TableFooter from "./TableFooter";


const Table = () => {
    const {countries, setTableUnmount} = useContext(Context);


    useEffect(() => {
        const table = new DataTable('#myTable', {
            searching: false
        });
        setTableUnmount(false);

        return () => {
            table.destroy();
            setTableUnmount(true);
        };
    }, []);

    const overallPopulation = countries.reduce((accum, country) => (accum + country[1].population), 0);

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
                {countries.map((country, index) => <Country country={country[1]} key={index} index={index + 1}/>)}
                </tbody>

                <TableContext.Provider value={overallPopulation}>
                    <TableFooter/>
                </TableContext.Provider>
            </table>
        </div>
    );
};

export default Table;