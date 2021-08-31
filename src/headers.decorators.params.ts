import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class Headers {
    rfcode: string
    charge_to: string
    fastway_api_key: string
    auspost_account_number: string
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
            auspost_account_number: hdr['x-auspost-account-number']
        }
    },
);
