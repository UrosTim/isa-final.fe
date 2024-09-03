import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import UpdateRecipeDialog from "@/elements/Recipe/Dialogs/UpdateRecipeDialog";
import DeleteRecipeDialog from "@/elements/Recipe/Dialogs/DeleteRecipeDialog";

const AllRecipeDialogs = ({}) => {
    const {state} = useListActions();
    return (
        <>
            <UpdateRecipeDialog isOpen={state.type === listAction.UPDATE} />
            <DeleteRecipeDialog isOpen={state.type === listAction.DELETE} />
        </>
    );
}
export default AllRecipeDialogs;