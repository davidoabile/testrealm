import { Field, ObjectType } from "@nestjs/graphql";

export interface IAjaxResponseErrors {
    code: string;
    message: string;
}


export interface IAjaxResponse<T> {
    /* Returns true or false on success */
    success: boolean;
    /* We don't return normal http error but we use this
      to pass custom status codes */
    status: string;
    /** Http error code */
    code: number;
    /**
     * This holds data from the server
     * Sometimes we return status codes e.g. 200 without
     * body or if there is an error message
     */
    data?: T;
    /** A list of error messages */
    errors?: IAjaxResponseErrors[];
}


@ObjectType()
export class ErrorModel implements IAjaxResponseErrors {
    @Field()
    code: string;
    @Field()
    message: string;
}


@ObjectType()
export class NoDataAjaxResponse implements IAjaxResponse<string> {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: [ErrorModel];

    ok?() {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        return this
    }
}

@ObjectType()
export class StringAjaxResponse implements IAjaxResponse<string> {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: [ErrorModel];
    @Field({ nullable: true })
    data?: string;
    ok?(str?: string) {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        this.data = str
        return this
    }
}


@ObjectType()
export class CreateLabelResponse implements IAjaxResponse<string> {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: [ErrorModel];
    @Field({ nullable: true })
    data?: string
    ok?() {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        return this
    }
}