import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useListActions} from "@/contexts/listActionContext";
import listAction from "@/core/listAction";
import {useForm} from "react-hook-form";
import {post} from "@/core/httpClient";
import {useEffect} from "react";

const UpdateUserDialog = ({isOpen}) => {
    const {state, dispatch} = useListActions();

    const toggle = () => dispatch({
            type: listAction.RESET
        });

    const {
        register,
        watch,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onSubmit",
        defaultValues: state.row
    });

    useEffect(() => {
        setValue("firstName", state.row.firstName);
        setValue("lastName", state.row.lastName);
        setValue("email", state.row.email);
        setValue("id", state.row.id);
    }, [state]);

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit user details</ModalHeader>
            <ModalBody>
                <Row className="justify-content-center align-items-center my-5">
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            {...register("firstName", {
                                required: "First Name is required.",
                                maxLength: 25,
                                minLength: 2
                            })} />
                        {errors && errors.firstName && (
                            <span className="text-danger">{errors.firstName.message}</span>
                        )}
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            {...register("lastName", {
                                required: "Last Name is required.",
                                maxLength: 25,
                                minLength: 2
                            })} />
                        {errors && errors.lastName && (
                            <span className="text-danger">{errors.lastName.message}</span>
                        )}
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center my-5">
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required.",
                                maxLength: 25,
                                minLength: 2
                            })} />
                        {errors && errors.email && (
                            <span className="text-danger">{errors.email.message}</span>
                        )}
                    </Col>
                    <Col md={6} sm={12} xs={12}>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required.",
                                maxLength: 50,
                                minLength: 7
                            })} />
                        {errors && errors.password && (
                            <span className="text-danger">{errors.password.message}</span>
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
                            let result = await post("/user/update", data);
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
export default UpdateUserDialog;