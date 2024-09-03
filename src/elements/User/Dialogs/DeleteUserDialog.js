import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {remove} from "@/core/httpClient";
import {toast} from "react-toastify";

const DeleteUserDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
            type: listAction.RESET
        });

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Are you sure you want to remove this user?
            </ModalHeader>
            <ModalBody>
                <p>Id: {state.row.id}</p>
                <p>Email: {state.row.email}</p>
                <p>First name: {state.row.firstName}</p>
                <p>Last name: {state.row.lastName}</p>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="btn btn-success"
                    type="button"
                    onClick={async () => {
                        let result = await remove(`/user/delete?id=${state.row.id}`);
                        if (result && result.status === 200) {
                            toast.success("Deleted successfully");
                        }
                            dispatch({
                                type: listAction.RELOAD
                            })
                        }}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default DeleteUserDialog;