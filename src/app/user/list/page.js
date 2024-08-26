'use client'

import {useListData} from "@/hooks/useListData";
import {useEffect, useState} from "react";
import DataTable from "react-data-table-component";
import {Button, Card, CardBody, CardHeader, Spinner} from "reactstrap";
import {MdDelete, MdEdit} from "react-icons/md";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import AllUserDialogs from "@/elements/User/AllUserDialogs";
import Link from "next/link";
import {useSession} from "next-auth/react";

export const tableColumns = [
    {
        name: 'First name',
        selector: (row) => `${row.firstName}`,
        sortable: true
    },
    {
        name: 'Last name',
        selector: (row) => `${row.lastName}`,
        sortable: true
    },
    {
        name: 'Email',
        selector: (row) => `${row.email}`,
        sortable: false
    },
    {
        name: 'Options',
        selector: (row) => `${row.email}`,
        cell: (row) => {
            const {dispatch} = useListActions();
            return (
                <>
                    <Button
                        color="secondary"
                        className="mx-2"
                        onClick={() => {
                            dispatch({
                                type: listAction.UPDATE,
                                payload: row
                            })
                        }}>
                        <MdEdit/>
                    </Button>
                    <Button
                        color="danger"
                        className="mx-2"
                        onClick={() => {
                            dispatch({
                                type: listAction.DELETE,
                                payload: row
                            })
                        }}>
                        <MdDelete/>
                    </Button>
                </>
            )
        },
        sortable: false
    }
]

export default function UserList() {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const {state} = useListActions();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {getData, loading, data} = useListData(`user/page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);

    useEffect(() => {
        getData(`user/page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`);
    }, [pageSize, pageNumber]);

    useEffect(() => {
        if (state.reload) {
            getData(`user/page-list?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`)
        }
    }, [state]);

    const handlePageChange = async (page) => {
        setPageNumber(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPageNumber(page);
        setPageSize(newPerPage);
    };

    const {data: session, status} = useSession();

    return (
        <>
            <div style={{padding: '2%', textAlign: 'center', margin: 'auto'}}>
                <h1 className="mb-5">List of users</h1>
                <Card>
                    <CardHeader className="d-flex justify-content-end">
                        <Link href="/user/create" className="text-decoration-none">
                            <Button className="btn btn-success d-flex justify-content-end"
                                    type="button"
                                    onClick={toggle}>
                                Add New User
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardBody>
                        {data != null && <DataTable data={data.users}
                                                    columns={tableColumns}
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination
                                                    paginationServer
                                                    progressPending={loading}
                                                    paginationTotalRows={data.totalElements}
                                                    onChangePage={handlePageChange}
                                                    onChangeRowsPerPage={handlePerRowsChange}
                                                    progressComponent={<Spinner color="danger">Loading...</Spinner>}
                                                    highlightOnHover
                        />}
                    </CardBody>
                </Card>
                <AllUserDialogs/>
            </div>
        </>
    );
}