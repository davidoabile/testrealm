//import * as Joi from 'joi-oid';
const Joi = require('joi-oid').extend(require('@joi/date'));
export const slugSchema = Joi.object({
  slug: Joi.string().pattern(new RegExp('^[a-z0-9-]+$')).max(80).required(), // Joi.string().alphanum().max(80).required(),
})

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(80)
    .required()
    .label('Email'), // Joi.string().alphanum().max(80).required(),
  password: Joi.string().min(5).max(80).label('Password'),
  token: Joi.string().min(7).max(30).required(),
  remember_me: Joi.boolean().label('Remember me')
})

export const PasswordCodeSchema = Joi.object({
  code: Joi.string().min(7).max(8).required(),
  remember_me: Joi.boolean().label('Remember me')
})

export const VerifyCodeSchema = Joi.object({
  id: Joi.string().min(7).max(10).required(),
  remember_me: Joi.boolean().label('Remember me'),
  // token: Joi.string().min(7).max(30).required(),
})

export const ResetPasswordSchema = Joi.object({
  password: Joi.string().min(5).max(80).required().label('Password'),
  confirm: Joi.any().equal(Joi.ref('password'))
    .required().label("Confirm password"),
  // token: Joi.string().regex(
  //   /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  // ),
})


export const TokenSchema = Joi.object({
  token: Joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  ),
})

export const IDSchema = Joi.object({
  id: Joi.string().regex(
    /^[A-Z]+\-[0-9-]+\-[A-Z]*$/
  ),
})


export const RegistrationSchema = Joi.object().keys({
  firstname: Joi.string().required().max(40).label('First Name'),
  lastname: Joi.string().required().max(40).label('Last Name'),
  password: Joi.string().min(5).max(80).label('Password'),
  phone: Joi.string().min(8).max(14).label('Phone'),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .max(80)
    .label('Email'),
  dob: Joi.string().required().max(50), //.regex(/^(0?[1-9]|[12][0-9]|3[01])[\-](0?[1-9]|1[012])\-\d{4}$/).label('Date of birth'),
  gender: Joi.string().required().max(1).label('Gender'),
  source: Joi.string().required().max(12).label('Direct'),
  // token: Joi.string().required().max(50)
})

export const EmailSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2 })
    .max(80)
    .label('Email'),
})

export const NumberRequired = Joi.object({
  value: Joi.number().required(),
})


export const RequestSchema = Joi.object({
  _from: Joi.object().required().label("Requestor ID"),
  /// Resource requested for e.g. Group ID
  _to: Joi.object().required().label("Group ID"),
  /// Name of the requestor
  sender: Joi.string().required().max(40).label("Sender's full Name"),
  receiver_id: Joi.string().max(10).label("Receiver's ID"),
  to_name: Joi.string().required().max(40).label("Receiver's name"),
  to_email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(80)
    .required()
    .label('Email'),
  content: Joi.string().max(400).label("Message"),
  media: Joi.string().max(120).label("Avatar"),
  permission: Joi.string().max(15).label("Permissions"),
  media_type: Joi.string().max(10).label("Receiver's ID"),
  kind: Joi.string().max(20).label("Request type"),
  to_sms: Joi.string().max(16).label("Phone"),
  status: Joi.string().max(20).label("Status"),
  expires: Joi.number()
})

export const JoiBaseSchema = {
  _id: Joi.objectId().label("OID"),
  _key: Joi.string().max(30).label("_key"),
  isactive: Joi.bool().label("isactive")
}

export const JoiBaseModelWithDatesAndRatingOid = {
  ...JoiBaseSchema,
  age_bracket: Joi.number().required(),
  coarse_language: Joi.bool().required(),
  adult_content: Joi.bool().required(),
  created_at: Joi.date().format('YYYY-mm-ddTHH:MM:ss').utc(),
  modified_at: Joi.date().format('YYYY-mm-ddTHH:MM:ss').utc(),
  publish_start: Joi.date().format('YYYY-mm-ddTHH:MM:ss').utc(),
  publish_end: Joi.date().format('YYYY-mm-ddTHH:MM:ss').utc()
}

export const JoiCreateProductSchema = Joi.object({
  ...JoiBaseModelWithDatesAndRatingOid,
  available_in: Joi.array().items(Joi.objectId().required())

})

export const JoiUpdateProductSchema = Joi.object({
  ...JoiBaseModelWithDatesAndRatingOid,
  available_in: Joi.array().items(Joi.objectId())

})


export const TweetSchema = Joi.object({
  name: Joi.string().required().max(100).label("Full Name"),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .max(80)
    .required()
    .label('Email'),
  message: Joi.string().max(500).label("Message"),
  phone: Joi.string().max(16).label("Phone"),
  avatar: Joi.string().max(200).label("Avatar"),

})

export const BusinessRequestSchema = Joi.object({
  firstname: Joi.string().required().max(60).label("First Name"),
  lastname: Joi.string().required().max(60).label("Last Name"),
  // created_at: Joi.string().required().max(60).label("Created At"),
  age_bracket: Joi.number().required().label("Age Bracket"),
  scheduled_meeting: Joi.string().required().max(25).label("Scheduled Meeting"),
  phone: Joi.string().max(16).label("Phone"),
  website: Joi.string().max(200).label("website"),

})
