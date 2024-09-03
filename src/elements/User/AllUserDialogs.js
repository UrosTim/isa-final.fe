import UpdateUserDialog from "@/elements/User/Dialogs/UpdateUserDialog";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import DeleteUserDialog from "@/elements/User/Dialogs/DeleteUserDialog";

const AllUserDialogs = ({}) => {
    const {state} = useListActions();
    return (
        <>
            <UpdateUserDialog isOpen={state.type === listAction.UPDATE} />
            <DeleteUserDialog isOpen={state.type === listAction.DELETE} />
        </>
    );
}

export default AllUserDialogs;