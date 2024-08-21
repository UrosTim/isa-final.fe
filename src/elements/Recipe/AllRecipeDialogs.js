import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdateRecipeDialog from "@/elements/Recipe/Dialogs/UpdateRecipeDialog";

const AllRecipeDialogs = ({isOpen}) => {
    const {state} = useListActions();
    return (
        <>
            <UpdateRecipeDialog isOpen={state.type === listAction.UPDATE} />
        </>
    );
}
export default AllRecipeDialogs;