import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class Headers {
    rfcode: string
    charge_to: string
    fastway_api_key: string
    auspost_account_number?: string
    dispatch_id?: string
    username?: string
    password?: string
    api_key?: string
    is_sandbox?: boolean
}

export const HeaderParams = createParamDecorator(
    (data: unknown, context: ExecutionContext): Headers => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        let hdr = req.headers
        return {
            rfcode: hdr['x-rfcode'],
            fastway_api_key: hdr['x-fastway-api-key'],
            charge_to: hdr['x-charge-to'],
            auspost_account_number: hdr['x-auspost-account-number'],
            dispatch_id: hdr['x-dispatch-id'],
            username: hdr['x-username'],
            password: hdr['x-password'],
            api_key: hdr['x-api-key'],
            is_sandbox: hdr['x-is-sandbox']
        }
    },
);
