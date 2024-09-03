'use client'

import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React, {useEffect} from "react";
import {toast} from "react-toastify";

export default function UserCreate() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit"
    });
    const router = useRouter();

    useEffect(() => {
        setValue("role", "USER");
    }, []);

    return (
        <>
            <div style={{padding: '2%', textAlign: 'center', margin: 'auto'}}>
                <h1>Create new user</h1>
                <Link href="/user/list" className="text-decoration-none">
                    <Button
                        className="d-flex justify-content-end"
                        type="button">
                        Go back
                    </Button>
                </Link>
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
                <Row style={{display:"none"}}>
                    <Col>
                        <input
                            type="text"
                            className="form-control"
                            {...register("role")}
                        />
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col className="d-flex justify-content-end">
                        <Button
                            className="btn btn-success"
                            type="button"
                            onClick={() => {
                                handleSubmit(async (data) => {
                                    let result = await post("/user/create", data);
                                    if (result && result.status === 200) {
                                        toast.success("Created successfully.");
                                    }
                                })();
                                router.push('/user/list');
                            }}>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}