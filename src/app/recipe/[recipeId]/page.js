'use client'

import {useListData} from "@/hooks/useListData";
import React, {useEffect} from "react";
import {Button, Card, CardBody, CardHeader, CardText, CardTitle} from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import listAction from "@/core/listAction";

export default function ViewRecipe({ params }) {

    const {getData, loading, data} = useListData(`recipe/${params.recipeId}`);

    useEffect(() => {
        getData(`recipe/${params.recipeId}`);
    }, []);

    return (
        <>
            <Button
                className="btn btn-success"
                type="button"
                onClick={() => {
                    router.push("/recipe/list");
                }}>
                Go back
            </Button>
            <Card style={{padding: '.5rem', textAlign: 'center', marginBottom: '1.5rem', marginTop: '1.5rem'}}>
                <CardHeader style={{position: 'relative', width: '100%', height: '500px'}}>
                    <Image
                        alt="Sample"
                        src={data.imagePath}
                        fill
                        sizes="300px"
                        style={{objectFit: 'contain'}}
                    />
                </CardHeader>
                <CardBody>
                    <CardTitle
                        tag="h5">
                        {data.title}
                    </CardTitle>
                    <CardText>
                        {data.description}
                    </CardText>
                    <div>
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
        </>
    )
}