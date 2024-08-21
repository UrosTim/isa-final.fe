import UpdateUserDialog from "@/elements/User/Dialogs/UpdateUserDialog";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";

const AllUserDialogs = ({isOpen}) => {
    const {state} = useListActions();
    return (
        <>
            <UpdateUserDialog isOpen={state.type === listAction.UPDATE} />
        </>
    );
}

export default AllUserDialogs;