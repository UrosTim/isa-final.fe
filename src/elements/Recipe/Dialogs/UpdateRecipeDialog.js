import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {post} from "@/core/httpClient";

const UpdateRecipeDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
        type: listAction.RESET
    });

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: "onSubmit",
        defaultValues: state.row
    });

    useEffect(() => {
        setValue("id", state.row.id);
        setValue("title", state.row.title);
        setValue("description", state.row.description);
        setValue("imagePath", state.row.imagePath)
    }, [state]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit recipe details</ModalHeader>
            <ModalBody>
                <Row className="justify-content-center align-items-center my-5">
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            {...register("title", {
                                required: "Title is required.",
                                maxLength: 50,
                                minLength: 2
                            })} />
                        {errors && errors.title && (
                            <span className="text-danger">{errors.title.message}</span>
                        )}
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Image Path"
                            {...register("imagePath", {
                                required: "Image Path is required.",
                                minLength: 6
                            })} />
                        {errors && errors.imagePath && (
                            <span className="text-danger">{errors.imagePath.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center my-5">
                    <Col md={12} sm={12} xs={12}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Description"
                            {...register("description", {
                                required: "Description is required.",
                                minLength: 2
                            })} />
                        {errors && errors.description && (
                            <span className="text-danger">{errors.description.message}</span>
                        )}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="btn btn-success"
                    type="button"
                    onClick={() => {
                        handleSubmit(async (data) => {
                            let result = await post("/recipe/update", data);
                            dispatch({
                                type: listAction.RELOAD
                            })
                        })();
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

export default UpdateRecipeDialog;