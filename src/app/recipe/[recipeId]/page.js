'use client'

import {useListData} from "@/hooks/useListData";
import React, {useCallback, useEffect} from "react";
import {Button, Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle} from "reactstrap";
import Image from "next/image";
import listAction from "@/core/listAction";
import Link from "next/link";
import AllRecipeDialogs from "@/elements/Recipe/AllRecipeDialogs";
import {useListActions} from "@/contexts/listActionContext";

export default function ViewRecipe({ params }) {

    const url = `recipe/${params.recipeId}`;
    const {getData, loading, data} = useListData(url);

    const {state, dispatch} = useListActions();

    useEffect(() => {
        getData(url);
    }, [])

    useEffect(() => {
        if (state.reload) {
            getData(url)
        }
    }, [state]);

    return (
        <>
            <Link href="/recipe/list">
                <Button
                    className="btn btn-success"
                    type="button">
                    Go back
                </Button>
            </Link>
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
                                    payload: data
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
            <AllRecipeDialogs />
        </>
    )
}