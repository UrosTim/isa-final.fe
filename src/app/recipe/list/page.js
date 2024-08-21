'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row} from "reactstrap";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useListActions} from "@/contexts/listActionContext";
import {useListData} from "@/hooks/useListData";
import listAction from "@/core/listAction";
import AllRecipeDialogs from "@/elements/Recipe/AllRecipeDialogs";
import Link from "next/link";

export default function RecipeList() {
    const router = useRouter();

    const {state, dispatch} = useListActions();

    const {getData, loading, data} = useListData(`recipe/list`);

    useEffect(() => {
        getData(`recipe/list`);
    }, []);

    useEffect(() => {
        if (state.reload) {
            getData(`recipe/list`)
        }
    }, [state]);

    return (
        <>
            <div style={{padding: '2%', textAlign: 'center', margin: 'auto'}}>
                <div>
                    <h1>List of Recipes</h1>
                    <Button
                        className="btn btn-success d-flex justify-content-end"
                        type="button"
                        onClick={() => {
                            router.push("/recipe/create");
                        }}>
                        Create New Recipe
                    </Button>
                </div>
                <div>
                    <div>
                        <Row>
                            {data.map((recipe) => (
                                <Col key={recipe.id} xs="12" sm="12" md="6" lg="6" xl="4"
                                     style={{padding: "10px"}}>
                                    <Card style={{padding: '.5rem', textAlign: 'center'}}>
                                        <CardHeader style={{position: 'relative', width: '100%', height: '300px'}}>
                                            <Image
                                                alt="Sample"
                                                src={recipe.imagePath}
                                                fill
                                                sizes="300px"
                                                style={{objectFit: 'contain'}}
                                            />
                                        </CardHeader>
                                        <CardBody>
                                            <CardTitle
                                                tag="h5"
                                                style={{
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                {recipe.title}
                                            </CardTitle>
                                            <CardText style={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {recipe.description}
                                            </CardText>
                                            <div>
                                                <Link href={`/recipe/${recipe.id}`}>
                                                    <Button color="primary">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="mx-2"
                                                    onClick={() => {
                                                        dispatch({
                                                            type: listAction.UPDATE,
                                                            payload: recipe
                                                        })
                                                    }}>
                                                    Edit
                                                </Button>
                                                <Button color='danger'>
                                                    Remove
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
            <AllRecipeDialogs/>
        </>
    )
}