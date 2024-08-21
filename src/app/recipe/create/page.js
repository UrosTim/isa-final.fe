'use client'

import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useRouter} from "next/navigation";

export default function RecipeCreate() {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const router = useRouter();

    return (
        <>
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
            <Row className="my-5">
                <Col className="d-flex justify-content-end">
                    <Button
                        className="btn btn-success"
                        type="button"
                        onClick={() => {
                            handleSubmit(async (data) => {
                                let result = await post("/recipe/create", data);
                            })();
                            router.push('/recipe/list');
                        }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    )
}